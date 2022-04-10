import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { EditProject } from './EditProject.jsx';
import { Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { handleToggle } from '../services/utils/handlers';
import { getOneProject } from '../services/api/projects.js';

export const SingleProject = ({ navigation, route }) => {
  const allProjects = useSelector((state) => state.projects.allProjects);
  const reduxUser = useSelector((state) => state.ui.user);
  const [project, setProject] = useState({});
  const [edit, setEdit] = useState(false);
  const [loaded, setLoaded] = useState(false);
  console.log(project.owner)

  const showUser = (applicantID) => {
    navigation.navigate('UserProfile', {
      userID: applicantID
    })
  }
  useEffect(() => {
    const fetchProject = async () => {
      if (route.params) {
        const res = await getOneProject(route.params.projectID);
        setProject(res);
      } else {
        setProject(allProjects[0]);
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

  return (
    <View>
      {reduxUser._id === project.owner && <Button title="Edit Project Details" onPress={handleEditProjectMode} />}
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
  );
};

// export const ReactSingleProject = () => {
//   const currentUser = useSelector((state) => state.ui.user);
//   const { id } = useParams();
//   const [project, setProject] = useState({});
//   const [edit, setEdit] = useState(false);
//   const [loaded, setLoaded] = useState(false);

//   let hours;
//   const option = project.time_commitment;
//   switch (option) {
//     case "hobby":
//       hours = 10;
//       break;
//     case "part-time":
//       hours = 20;
//       break;
//     case "full-time":
//       hours = 30;
//       break;
//     default:
//       hours = "any";
//   }

//   useEffect(() => {
//     const fetchProject = async () => {
//       const currentProject = await getOneProject(id);
//       if (currentProject) {
//         setProject(currentProject);
//         setLoaded(true);
//       }
//     };
//     fetchProject();
//   }, [id, edit]);

//   if (loaded && !edit) {
//     return (
//       <div className="single-project-wrapper">
//         <h2 className="project-title">{project.title}</h2>
//         <h3>Project Description:</h3>
//         <p>{project.description}</p>
//         <p>Current team size: {project.team_members.length + 1}</p>
//         {project.tools.length > 0 ? <h3>Built with:</h3> : null}
//         <ul>
//           {project.tools?.map((tool) => (
//             <li key={tool._id}>{tool.name}</li>
//           ))}
//         </ul>
//         <p>{`Looking for collaborators who can commit ${hours} hours per week.`}</p>
//         {currentUser._id === project.owner ? (
//           <SingleActionButton
//             onClick={() => {
//               setEdit(true);
//             }}
//             text={"Edit Project Details"}
//           />
//         ) : null}
//       </div>
//     );
//   } else if (loaded && edit) {
//     return (
//       <div>
//         <EditProject project={project} setEdit={setEdit} />
//       </div>
//     );
//   } else {
//     return <div>loading ...</div>;
//   }
// };
