// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import "./UserDashboard.scss";
import { StyleSheet, Text, View } from "react-native";

export const UserDashboard = () => {
  return (
    <View>
      <Text>user dashboard</Text>
    </View>
  );
};

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
