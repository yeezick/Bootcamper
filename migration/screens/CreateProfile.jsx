// packages, libraries
import { useState} from 'react';
import { ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// components
import { Header } from '../components/Header/Header';
import { Form } from '../components/Form/Form';

// assets
import { uiActions } from '../services/redux/slices/uiSlice';
import { updateUser } from '../services/api/users';
import { createProfile } from '../services/formData';

export const CreateProfile = ({navigation}) => {
    const { user } = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        role: '',
        about: '',
        portfolio_link: '',
        show_portfolio: false,
        });
    
    const handleUserUpdate = async () => {
        try {
            const res = await updateUser(user._id, userInfo);
            dispatch(uiActions.updateUser(res));
            navigation.navigate('AddPortfolioProjects')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView>
            <Header headerTitle="Create Profile" headerText="" />
            <Form formData={createProfile} formState={[userInfo, setUserInfo, handleUserUpdate]} />
            <Button title="Complete later" onPress={() => navigation.navigate('Roulette')} />
        </ScrollView>
    )
};
