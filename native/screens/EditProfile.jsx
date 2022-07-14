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
import * as React from 'react';
import { Alert, Modal, Pressable } from 'react-native';
import ModalComp from '../components/Modal/ModalComp';

export const EditProfile = ({ navigation, route }) => {
  const { user: reduxUser, editMode } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const header = {
    text: "Before you can create or join a project, we'll need to finish your profile first.",
    title: 'About You',
  };

  return (
    //  edit profile
    <ScrollView>
      <Header title={header.title} subtext={header.text} />
      <AboutUser />
      {modalVisible && <AddPortfolioModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Add a Project</Text>
      </Pressable>
      {/* <AddPortfolioProject /> */}
      <ShowPortfolioProjects currUser={reduxUser} />
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
      {/* <ModalComp /> */}
      <Form formData={userForm} formState={[userInfo, setUserInfo, handleUserUpdate]} />
    </View>
  );
};

const AddPortfolioModal = ({ modalVisible, setModalVisible }) => {
 console.log("This line", setModalVisible)
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Your Project Below!</Text>
            <AddPortfolioProject modalVisible={modalVisible} setModalVisible={ setModalVisible}/>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 400,
    width: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'black',
  },
  buttonClose: {
    backgroundColor: 'orange',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
