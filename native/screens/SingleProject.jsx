import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import store from '../services/redux/store.js'
// // import { EditProject } from "./EditProject/EditProject.jsx";
// // import { SingleActionButton } from "../components/Button/SingleActionButton.jsx";
import { getOneProject } from '../services/api/projects.js';
import { FlatList, StyleSheet, Text, View } from "react-native";

export const SingleProject = () => {
  const state = store.getState();
  const currentUser = state.ui.user;
  const id = "622e4d5777c3c6a575004564"
  
  const [project, setProject] = useState({})
  const [edit, setEdit] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const handlePress = () => console.log("pressed button")

  let hours;
  const option = project.time_commitment;
  switch (option) {
    case "hobby":
      hours = 10;
      break;
    case "part-time":
      hours = 20;
      break;
    case "full-time":
      hours = 30;
      break;
    default:
      hours = "any";
  }
  
  useEffect(() => {
    const fetchProject = async () => {
      const currentProject = await getOneProject(id);
      if (currentProject) {
        setProject(currentProject);
        setLoaded(true);
        }
      };
        fetchProject();
    }, [id])

  
    if (loaded && !edit) {
      return (
        <View>
          <Text>{project.title}</Text>
          <Text>{project.description}</Text>
          <Text>Current team size: {project.team_members?.length + 1}</Text>
          {project.tools?.length ? <Text>Built with:</Text> : null }
          <FlatList 
            data={project.tools?.map(tool => new Object({key: tool.name}))}
            renderItem={({item}) => <Text>{item.key}</Text>}
          />
          <Text>{`Looking for collaborators who can commit ${hours} hours per week.`}</Text>
          {currentUser._id === project.owner ? <Button title="Edit Project Details" onPress={handlePress}/> : null}
        </View>
      )
    } else if (loaded && edit) {
      return (
        <View>
          <Text>edit project</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
      ;

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
