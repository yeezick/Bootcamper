import { useState } from 'react';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '../Form/Form';
import { Header } from '../Header/Header';
import { View } from 'react-native';
import { uiActions } from '../../services/redux/slices/uiSlice';
import { portfolioProjectForm } from '../../services/formData';
import { addPortfolioProject } from '../../services/api/users.js';

export const AddPortfolioProject = () => {
  const { _id: userId } = useSelector((state) => state.ui.user);
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    project_title: '',
    role: '',
    tools: '',
    project_description: '',
    // project_link: '',
    // project_title: '',
    project_id: uuid.v4(),
  });
  // ideally updates the database on each new project without slowing the app down
  // this way the user can add a new project and on refresh, load their work.
  const handleNewProject = async () => {
    try {
      const res = await addPortfolioProject(userId, newProject);
      dispatch(uiActions.updateUser(res));
      setNewProject({
        image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
        project_description: '',
        project_link: '',
        project_title: '',
        project_id: uuid.v4(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const header = {
    title: 'Add Projects to Profile'
  };

  return (
    // className="add-portfolio-project"
    <View>
      <Header title={header.title} />
      <Form
        formData={portfolioProjectForm}
        formState={[newProject, setNewProject, handleNewProject]}
      />
    </View>
  );
};
