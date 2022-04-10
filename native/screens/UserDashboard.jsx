// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "./UserDashboard.scss";
import { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';

export const UserDashboard = ({navigation}) => {
  const { allProjects } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.ui);
  // consolidate these two with above
  const userId = user._id 
  const projectIds = user.member_of_projects

  const filterProjects = (allProjects) => {
    let projects = allProjects.filter((project) => projectIds.indexOf(project._id) >= 0 || project.owner === userId)
    return projects
  }
  
  return (
    <View>
      <Text>Bootcamper logo Placeholder</Text>
      <View>
        <Text>My Projects:</Text>
          {filterProjects(allProjects).map((project)=> {
            return (
              <ProjectBanner 
                title={project.title}
                role={project.owner === userId ? "Project Owner" : "Collaborator"}
                projectID={project._id}
                navigation={navigation}
              />
            )
        })}
      </View>
      <Button 
        title="Start a Project" 
        onPress={() => navigation.navigate('CreateProject')} 
      />
    </View>
  );
};


const ProjectBanner = ({title, role, projectID, navigation}) => {
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('SingleProject', {
        projectID: projectID,
      })}>
        <View>
          <Text>{title}</Text>
          <Text>{role}</Text>
        </View>
    </TouchableOpacity>

  )
}

// export const ReactUserDashboard = () => {
//   const currentUser = useSelector((state) => state.ui.user);
//   const allProjects = useSelector((state) => state.projects.allProjects);
//   const [collaborations, setCollaborations] = useState([]);
//   const [userProjects, setUserProjects] = useState([]);

//   useEffect(() => {
//     setUserProjects(
//       allProjects.filter((project) => project.owner === currentUser._id)
//     );
//     setCollaborations(
//       allProjects.filter((project) =>
//         currentUser.member_of_projects.includes(project._id)
//       )
//     );
//   }, [currentUser, allProjects]);

//   return (
//     <div className="user-dashboard">
//       <div className="collaborations-wrapper">
//         <h3>My Collaborations:</h3>
//         {collaborations?.map((project) => (
//           <Link to={`/projects/${project._id}`}>
//             <div className="collaboration-wrapper" key={project._id}>
//               <h4>{project.title}</h4>
//             </div>
//           </Link>
//         ))}
//       </div>
//       <div className="user-projects-wrapper">
//         <h3>My Projects:</h3>
//         {userProjects.map((project) => (
//           <Link to={`/projects/${project._id}`}>
//             <div className="user-project-wrapper" key={project._id}>
//               <h4>{project.title}</h4>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };
