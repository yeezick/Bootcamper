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


export const AddPortfolioProjects = ({navigation}) => {
    const { _id: userId } = useSelector((state) => state.ui.user );
    const dispatch = useDispatch();
    const [ newProject, setNewProject ] = useState({
        image: 'https://pbs.twimg.com/media/E5KGFT9X0AQzzaR?format=jpg&name=240x240',
        project_title: '',
        role: '',
        tools: '',
        project_description: '',
        project_id: uuid.v4(),
    });

    const empty = 
        newProject.project_title === '' &&
        newProject.role === '' &&
        newProject.tools === '' &&
        newProject.project_description === ''

    const handleNewProject = async () => {
        try {
            const res = await addPortfolioProject(userId, newProject);
            dispatch(uiActions.updateUser(res));

            Alert.alert(
                "Project saved to portfolio.", 
                null, 
                [{
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

    const finish = !empty ? {
        text: 'Finish',
        type: 'trigger-alert',
        message: "Finish without saving project?",
        options: [
            {
                text: 'Save and Finish',
                onPress: () => {},
            },
            {
                text: 'Finish without saving',
                onPress: () => navigation.navigate('Roulette'),
            },
            {
                text: 'Cancel'
            }
        ]
    } : {
        text: 'Finish',
        type: 'reroute',
        path: 'Roulette',
    }


    return (
        <ScrollView>
            <Header headerTitle="Add Projects to Profile" />
            <Form formData={portfolioProjectForm} formState={[newProject, setNewProject, handleNewProject]} />
            <SingleActionButton payload={finish}/>
        </ScrollView>
    )
};