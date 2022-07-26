import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AddPortfolioProject } from '../components/PortfolioCard/AddPortfolioProject';
import { ShowPortfolioProjects } from '../components/PortfolioCard/ShowPortfolioProjects';
import { Form } from '../components/Form/Form';
import { Header } from '../components/Header/Header';

import { uiActions } from '../services/redux/slices/uiSlice';
import { updateUser } from '../services/api/users';
import { userForm } from '../services/formData';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export const EditProfile = ({ navigation, route }) => {
  const { user: reduxUser, editMode } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const header = {
    text: "Before you can create or join a project, we'll need to finish your profile first.",
    title: 'About You',
  };

  return (
    //  edit profile
    <ScrollView>
      <Header headerTitle={header.title} headerText={header.text} />
      <AboutUser />
      <AddPortfolioProject />
      <ShowPortfolioProjects currUser={reduxUser} editMode={true}/>
      <Button title="start collaborating" onPress={() => navigation.navigate('Roulette')} />
      <Button
        title="back to user profile"
        onPress={() => {
          dispatch(uiActions.toggleEditMode());
          navigation.navigate('UserProfile', { userID: reduxUser._id });
        }}
      />
    </ScrollView>
  );
};

const AboutUser = () => {
  const { editMode, user } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    about: '',
    fun_fact: '',
    portfolio_link: '',
    role: '',
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
