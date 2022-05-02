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
import { SingleActionButton } from '../components/Button/SingleActionButton';

export const CreateProfile = () => {
    const { user: reduxUser, editMode } = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const [ isCreated, setIsCreated ] = useState(false);


    const finish = {
        text: 'Finish',
        type: 'trigger-alert',
        options: [
            {
                
            }
        ],
    }

    return (
        <ScrollView>
            { !isCreated ? 
                <AboutUser setIsCreated={setIsCreated} /> 
                :
                (
                <>
                    <AddPortfolioProject />
                    <SingleActionButton payload={finish} />
                </>)
            }
            
        </ScrollView>
    )
};


const AboutUser = ({setIsCreated}) => {
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
            setIsCreated(true);
        } catch (error) {
            console.error(error);
        }
        };

        const header = {
            title: "Create Profile",
            text: null,
        }
    
        return (
        // className="about-user"
        <View>
            <Header headerTitle={header.title} headerText={header.text} />
            <Form formData={userForm} formState={[userInfo, setUserInfo, handleUserUpdate]} />
        </View>
        );
    };
    