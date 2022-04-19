import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { getOneProject } from '../services/api/projects.js';

export const SingleProject = ({ navigation, route }) => {
  const allProjects = useSelector((state) => state.projects.allProjects);
  const reduxUser = useSelector((state) => state.ui.user);
  const [project, setProject] = useState({});
  const [edit, setEdit] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const showUser = (applicantID) => {
    navigation.navigate('UserProfile', {
      userID: applicantID,
    });
  };
  useEffect(() => {
    const fetchProject = async () => {
      if (route.params) {
        const res = await getOneProject(route.params.projectID);
        setProject(res);
      } else {
        setProject(allProjects[0]);
        //ultimately we shouldn't need this default, if the SingleProject view is only accessible via a link to a specific project from Dashboard or elsewhere
      }
    };
    fetchProject();
    setLoaded(true);
  }, [route]);

  let hours;
  const option = project.time_commitment;
  switch (option) {
    case 'hobby':
      hours = 10;
      break;
    case 'part-time':
      hours = 20;
      break;
    case 'full-time':
      hours = 30;
      break;
    default:
      hours = 'any';
  }

  const OwnerView = () => (
    <View>
      {project.interested_applicants?.length ? (
        <View>
          <Text>These users are interested in joining the project:</Text>
          {project.interested_applicants.map((applicant) => (
            <Pressable key={applicant._id} onPress={() => showUser(applicant._id)}>
              <Text>{`${applicant.first_name} ${applicant.last_name}, ${applicant.role}`}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );

  const handleEditProjectMode = () => {
    setEdit(true);
    navigation.navigate('EditProject', {
      projectID: project._id,
      project,
      createNewProject: false,
    });
  };

  return loaded ? (
    <View>
      {reduxUser._id === project.owner && (
        <Button title="Edit Project Details" onPress={handleEditProjectMode} />
      )}
      <Text>{project.title}</Text>
      <Text>{project.description}</Text>
      <Text>Current team size: {project.team_members?.length + 1}</Text>
      {project.tools?.length ? <Text>Built with:</Text> : null}
      <FlatList
        data={project.tools?.map((tool) => new Object({ key: tool.name }))}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
      <Text>{`Looking for collaborators who can commit ${hours} hours per week.`}</Text>
      {reduxUser._id === project.owner ? <OwnerView /> : null}
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};
