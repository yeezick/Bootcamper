import { useEffect, useState } from 'react';
import { Button, Text, TextInput, Modal, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../services/redux/slices/uiSlice';
import { ConfirmedPasswordMessage } from './Helpers';
import { confirmPassword, deleteUser, signOut } from '../../services/api/users';

export const DeleteForm = ({ userID, email, navigation, toggleDeleteForm }) => {
  const [deletePassword, setDeletePassword] = useState('');
  const [deletionStatus, setDeletionStatus] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState(null);
  const dispatch = useDispatch();

  useEffect(async () => {
    setTimeout(() => {
      if (deletionStatus === 'Confirmed') {
        navigation.navigate('Landing');
        toggleDeleteForm(false);
      }
    }, 3000);
  }, [deletionStatus]);

  useEffect(() => {
    if (deletePassword.length > 3) {
      setTimeout(async () => {
        const credentials = {
          email,
          password: deletePassword,
        };
        const res = await confirmPassword(credentials, userID);
        setConfirmedPassword(res);
      }, 2000);
    } else {
      setConfirmedPassword(null);
    }
  }, [deletePassword]);
  const handleProfileDeletion = async () => {
    if (confirmedPassword) {
      const { deletionStatus, message } = await deleteUser(userID);
      if (deletionStatus) {
        setDeletionStatus('Confirmed');
        dispatch(uiActions.resetUser());
        await signOut();
      } else {
        setDeletionStatus('Unauthorized');
        console.log('Error:', message);
      }
    } else {
      setDeletionStatus('Unauthorized');
    }
  };

  let ModalMessage;
  if (deletionStatus === 'Confirmed') {
    ModalMessage = (
      <Modal>
        <View>
          <Text>Your Profile has been deleted.</Text>
        </View>
      </Modal>
    );
  } else if (deletionStatus === 'Unauthorized') {
    ModalMessage = (
      <Modal>
        <View>
          <Text>Incorrect password or unauthorized, please try again. </Text>
          <Button title="OK" onPress={() => setDeletionStatus(null)} />
        </View>
      </Modal>
    );
  } else {
    ModalMessage = (
      <Modal>
        <View>
          <Text> Loading.... I shouldn't be displayed tbh</Text>
        </View>
      </Modal>
    );
  }
  return (
    <View>
      {deletionStatus !== null && ModalMessage}
      <Button
        title="Cancel Deletion"
        onPress={() => {
          toggleDeleteForm(false);
        }}
      />
      <Text>Type in your password to confirm your profile's deletion.</Text>
      <TextInput
        autoCapitalize="none"
        returnKeyType="next"
        secureTextEntry={true}
        onChangeText={(confirmPassword) => {
          setDeletePassword(confirmPassword);
        }}
        value={deletePassword}
      />
      {confirmedPassword !== null && <ConfirmedPasswordMessage status={confirmedPassword} />}
      <Button
        disabled={!confirmedPassword}
        title="Delete your profile"
        onPress={handleProfileDeletion}
      />
    </View>
  );
};
