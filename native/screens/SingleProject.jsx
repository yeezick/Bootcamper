import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { OwnerView } from '../components/OwnerView/OwnerView.jsx';
import { TeamView } from '../components/TeamView/TeamView.jsx';
import { getOneProject } from '../services/api/projects.js';

export const SingleProject = ({ navigation, route }) => {
  const allProjects = useSelector((state) => state.projects.allProjects);
  const reduxUser = useSelector((state) => state.ui.user);
  const [project, setProject] = useState({});
  const [edit, setEdit] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
  console.log(project);
  let rolesSought;
  if (project.designer_count && project.engineer_count) {
    rolesSought = 'UX Designer, Software Engineer';
  } else if (project.designer_count && !project.engineer_count) {
    rolesSought = 'UX Designer';
  } else if (!project.designer_count && project.engineer_count) {
    rolesSought = 'Software Engineer';
  } else {
    rolesSought = null;
  }

  // for time commitment section:
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
      {reduxUser._id === project.owner._id && (
        <Button title="Edit Project Details" onPress={handleEditProjectMode} />
      )}
      <Text>{project.title}</Text>
      {project.seeking ? (
        <View>
          <Text>Seeking</Text>
          <Text>{`${rolesSought}`}</Text>
        </View>
      ) : null}
      <Text>Description</Text>
      <Text>{project.description}</Text>
      {project.team_members?.some((member) => member._id === reduxUser._id) ||
      reduxUser._id === project.owner._id ? (
        <TeamView project={project} />
      ) : (
        <Text>Current team size: {project.team_members?.length + 1}</Text>
      )}
      {project.tools?.length ? <Text>Built with:</Text> : null}
      <FlatList
        data={project.tools?.map((tool) => new Object({ key: tool.name }))}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
      <Text>{`Looking for collaborators who can commit ${hours} hours per week.`}</Text>
      {reduxUser._id === project.owner._id ? <OwnerView project={project} /> : null}
    </View>
  ) : (
    <Text>Loading...</Text>
  );
};
