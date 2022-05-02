// import React from 'react'
import { useState, useEffect } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../services/redux/slices/uiSlice';
import { updateUser } from '../services/api/users';
import { userForm } from '../services/formData';
import { Form } from '../components/Form/Form';
import { AddPortfolioProject } from '../components/PortfolioCard/AddPortfolioProject';
import { ShowPortfolioProjects } from '../components/PortfolioCard/ShowPortfolioProjects';

export const CreateProfile = () => {
    const { user: reduxUser, editMode } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const header = {
        title: "About Me",
        text: null,
    }

    return (
        <ScrollView>
            <Header headerTitle={header.title} headerText={header.text} />
            <AboutUser />
        </ScrollView>
    )
};


const AboutUser = () => {
    const { editMode, user } = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        role: '',
        about: '',
        portfolio_link: '',
        show_portfolio: false,
        });
    
        useEffect(() => {
        if (editMode) {
            const { about, fun_fact, portfolio_link, role } = user;
            setUserInfo({
            about,
            fun_fact,
            portfolio_link,
            role,
            });
        }
        }, [editMode]);
    
        const handleUserUpdate = async () => {
        try {
            const res = await updateUser(user._id, userInfo);
            dispatch(uiActions.updateUser(res));
        } catch (error) {
            console.error(error);
        }
        };
    
        return (
        // className="about-user"
        <View>
            <Form formData={userForm} formState={[userInfo, setUserInfo, handleUserUpdate]} />
        </View>
        );
    };
    