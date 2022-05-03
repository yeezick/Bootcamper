// import React from 'react'
import { useState} from 'react';
import { ScrollView } from 'react-native';
import { Header } from '../components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../services/redux/slices/uiSlice';
import { updateUser } from '../services/api/users';
import { Form } from '../components/Form/Form';
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
        </ScrollView>
    )
};
