// packages, libraries
import uuid from 'react-native-uuid';
import { ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

//components
import { Header } from '../components/Header/Header';
import { portfolioProjectForm } from '../services/formData';
import { Form } from '../components/Form/Form';
import { SingleActionButton } from '../components/Button/SingleActionButton';

//assets
import { addPortfolioProject } from '../services/api/users';
import { uiActions } from '../services/redux/slices/uiSlice';

export const AddPortfolioProjects = ({ navigation }) => {
  const { _id: userId } = useSelector((state) => state.ui.user);
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({
    image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
    project_title: '',
    role: '',
    tools: '',
    project_description: '',
    project_id: uuid.v4(),
  });

  const emptyFields =
    newProject.project_title === '' ||
    newProject.role === '' ||
    newProject.tools === '' ||
    newProject.project_description === '';

  const handleNewProject = async () => {
    if (emptyFields) {
      Alert.alert('Please fill in all fields.');
    } else
      try {
        const res = await addPortfolioProject(userId, newProject);
        dispatch(uiActions.updateUser(res));

        Alert.alert('Project saved to portfolio.', null, [
          {
            text: 'Add another project',
          },
          {
            text: 'Finish sign up',
            onPress: () => navigation.navigate('UserDashboard'),
          },
        ]);

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

  const unsavedProject =
    newProject.project_title !== '' ||
    newProject.role !== '' ||
    newProject.tools !== '' ||
    newProject.project_description !== '';

  let unsavedProjectPayload = {
    title: 'Finish',
    message: 'Finish without saving project?',
    options: [
      {
        text: 'Yes, discard project', // bring up to UX for better text
        onPress: () => navigation.navigate('Roulette'),
      },
      {
        text: 'Cancel',
      },
    ],
  };

  const finish = unsavedProject
    ? {
        handler() {
          const { message, options, title } = unsavedProjectPayload;
          Alert.alert(title, message, options);
        },
        title: unsavedProjectPayload.title,
      }
    : {
        handler() {
          navigation.navigate('Roulette');
        },
        title: 'Finish',
      };

  return (
    <ScrollView>
      <Header headerTitle="Add Projects to Profile" />
      <Form
        formData={portfolioProjectForm}
        formState={[newProject, setNewProject, handleNewProject]}
      />
      <SingleActionButton payload={finish} style="light" type="long" />
    </ScrollView>
  );
};
