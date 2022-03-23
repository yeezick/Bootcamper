import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { Form } from '../../Form/Form';
import { Header } from '../../Header/Header';

import { uiActions } from '../../../services/redux/slices/uiSlice';
import { portfolioProjectForm } from '../../../services/formData';
import { addPortfolioProject } from '../../../services/api/users.js';
import { View } from 'react-native';

export const AddPortfolioProject = () => {
  const { _id: userId } = useSelector((state) => state.ui.user);
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    project_description: '',
    project_link: '',
    project_title: '',
    project_id: nanoid(),
  });
  // ideally updates the database on each new project without slowing the app down
  // this way the user can add a new project and on refresh, load their work.
  const handleNewProject = async (e) => {
    e.preventDefault();
    try {
      const res = await addPortfolioProject(userId, newProject);
      dispatch(uiActions.updateUser(res));
      setNewProject({
        image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
        project_description: '',
        project_link: '',
        project_title: '',
        project_id: nanoid(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const header = {
    title: 'Portfolio Projects',
    text: ' Add your personal projects here. You can add as many as you want, but to avoid cluttering we recommend a maximum of 3.',
  };

  return (
    // className="add-portfolio-project"
    <View>
      <Header headerTitle={header.title} headerText={header.text} />
      <Form
        formData={portfolioProjectForm}
        formState={[newProject, setNewProject, handleNewProject]}
      />
    </View>
  );
};
