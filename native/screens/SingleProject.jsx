import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { EditProject } from "./EditProject.jsx";
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export const SingleProject = () => {
  const allProjects = useSelector(state => state.projects.allProjects);
  const currentUser = useSelector(state => state.ui.user);
  const id = "6216b8b881d905a909aa239d"
  const [project, setProject] = useState({})
  const [edit, setEdit] = useState(true)
  const [loaded, setLoaded] = useState(false)

  const showUser = () => console.log("redirect to user's profile")

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
  
  const ownerView = <View>
    <Button title="Edit Project Details" onPress={()=> setEdit(true)}/>
    {project.interested_applicants?.length ? 
      <View>
        <Text>These users are interested in joining the project:</Text>
        {project.interested_applicants.map(applicant => (
          <Pressable key={applicant._id} onPress={showUser}>
            <Text>{`${applicant.first_name} ${applicant.last_name}, ${applicant.role}`}</Text>
          </Pressable>
        ))}
      </View> 
      : null
    } 
  </View>

  useEffect(() => {
    const currentProject = allProjects.find(project => project._id === id);
    if (currentProject) {
      setLoaded(true);
      setProject(currentProject);
    }
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
          {currentUser._id === project.owner ? ownerView : null}
          
        </View>
      )
    } else if (loaded && edit) {
      return (
        <View>
          <EditProject project={project} setEdit={setEdit}/>
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
