import { useEffect, useState } from 'react';
import { AboutProject } from '../components/AboutProject/AboutProject.jsx';
import { Header } from '../components/Header/Header.jsx';
// import { SingleActionButton } from "../../components/Button/SingleActionButton.jsx";
// import { editProject, deleteProject } from "../../services/api/projects.js";
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { getOneProject } from '../services/api/projects.js';

export const EditProject = ({ navigation, route }) => {
  const [currProject, setCurrProject] = useState();
  const { projectID, setEdit } = route.params;
  const [loadedProject, toggleLoadedProject] = useState(false);
  // const createNewProject = false;
  const header = {
    text: 'Edit the fields below and click Update Project to save your changes.',
    title: 'Edit Project Details',
  };

  useEffect(() => {
    const fetchProject = async () => {
      const res = await getOneProject(projectID);
      setCurrProject(res);
      toggleLoadedProject(true);
    };
    fetchProject();
  }, []);

  if (!loadedProject) {
    return <Text>Loading....</Text>;
  }

  return (
    <ScrollView>
      <Button
        title="Cancel Editing"
        onPress={() => {
          navigation.navigate('SingleProject');
        }}
      />
      <Header headerText={header.text} headerTitle={header.title} />
      <AboutProject
        // createNewProject={createNewProject}
        project={currProject}
        // setEdit={setEdit}
        // handleSubmit={handleSubmit}
      />
    </ScrollView>
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
