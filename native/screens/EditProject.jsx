// import { useNavigate } from "react-router-dom";
import { AboutProject } from "../../components/Projects/AboutProject/AboutProject.jsx";
import { Header } from "../../components/Header/Header.jsx";
// import { SingleActionButton } from "../../components/Button/SingleActionButton.jsx";
// import { editProject, deleteProject } from "../../services/api/projects.js";
import { StyleSheet, Text, View } from "react-native";

export const EditProject = ({ project, setEdit }) => {
  const createNewProject = false;
  const header = {
    text: "Edit the fields below and click Update Project to save your changes.",
    title: "Edit Project Details",
  };

  return (
    <View>
      <Header headerText={header.text} headerTitle={header.title}/>
      <AboutProject
        createNewProject={createNewProject}
        project={project}
        setEdit={setEdit}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

// export const ReactEditProject = ({ project, setEdit }) => {
//   const navigate = useNavigate();
//   const createNewProject = false;

//   const header = {
//     text: "Edit the fields below and click Update Project to save your changes.",
//     title: "Edit Project Details",
//   };

//   const handleSubmit = async (e, projectInfo) => {
//     e.preventDefault();
//     const updatedProject = await editProject(project._id, projectInfo);
//     if (updatedProject) setEdit(false);
//   };

//   const handleDelete = async () => {
//     await deleteProject(project._id);
//     navigate("/dashboard");
//   };

//   return (
//     <div>
//       <Header headerText={header.text} headerTitle={header.title} />
//       <AboutProject
//         createNewProject={createNewProject}
//         project={project}
//         setEdit={setEdit}
//         handleSubmit={handleSubmit}
//       />
//       <SingleActionButton onClick={handleDelete} text={"Delete Project"} />
//     </div>
//   );
// };
