import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, TextInput, Modal, View } from 'react-native';
import { confirmPassword, deleteUser, signOut, updatePassword } from '../services/api/users';
import { uiActions } from '../services/redux/slices/uiSlice';
import { handleTextChange, handleToggle } from '../services/utils/handlers';

export const AccountSettings = ({ navigation, route }) => {
  const [resetPassword, toggleResetPassword] = useState(false);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const { _id: userID, email } = useSelector((state) => state.ui.user);

  // would be a good idea to replace the modals below with a generic modal
  return (
    <View>
      <Text>Account Settings</Text>

      {deleteModal && (
        <DeleteModal
          userID={userID}
          email={email}
          navigation={navigation}
          toggleDeleteModal={toggleDeleteModal}
        />
      )}
      <Button
        title={resetPassword ? 'Cancel' : 'Reset password'}
        onPress={() => handleToggle(toggleResetPassword)}
      />

      {resetPassword && (
        <UpdatePasswordForm
          email={email}
          toggleResetPassword={toggleResetPassword}
          userID={userID}
        />
      )}

      <Button
        title="Delete Profile"
        onPress={() => {
          toggleDeleteModal(true);
        }}
      />
    </View>
  );
};

const UpdatePasswordForm = ({ email, toggleResetPassword, userID }) => {
  const [newPasswordForm, setNewPasswordForm] = useState({
    confirmNewPassword: '',
    currentPassword: '',
    newPassword: '',
  });
  const [rerender, toggleRerender] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState(null);
  const [newPasswordsMatch, setNewPasswordMatch] = useState(false);
  const [activeUpdateButton, setActiveUpdateButton] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('Pending');
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (updateStatus === 'Failed') {
        setUpdateStatus('Pending');
        handleTextChange('', 'currentPassword', setNewPasswordForm);
      } else if (updateStatus === 'Success') {
        toggleResetPassword(false);
        setNewPasswordForm({
          confirmNewPassword: '',
          currentPassword: '',
          newPassword: '',
        });
      }
    }, 4000);
  }, [toggleRerender]);

  useEffect(() => {
    const { currentPassword, newPassword, confirmNewPassword } = newPasswordForm;
    if (currentPassword.length > 0) {
      setTimeout(async () => {
        const credentials = {
          email,
          password: currentPassword,
        };
        const res = await confirmPassword(credentials, userID); // pings API for every new character, once password security is enforced with minimum char amount, should restrict pinging this API to the minimum char #
        if (res) {
          setConfirmedPassword(true);
          if (confirmNewPassword.length > 0 && newPassword === confirmNewPassword) {
            setNewPasswordMatch(true);
            setActiveUpdateButton(true);
          } else {
            setNewPasswordMatch(false);
          }
        } else {
          setConfirmedPassword(false);
        }
        res ? setConfirmedPassword(true) : setConfirmedPassword(false);
        if (newPassword === confirmNewPassword) {
          setNewPasswordMatch(true);
        } else {
          setNewPasswordMatch(false);
        }
      }, 2000);
    } else {
      setConfirmedPassword(null);
    }
  }, [newPasswordForm]);

  useEffect(() => {
    if (!newPasswordsMatch && !confirmedPassword) {
      setActiveUpdateButton(false);
    } else {
      setActiveUpdateButton(true);
    }
  }, []);

  const handlePasswordUpdate = async () => {
    const res = await updatePassword(newPasswordForm.newPassword, userID); // i feel that backend should also error check to confirm current password
    if (res) {
      setUpdateStatus('Success');
      dispatch(uiActions.updateUser(res.user));
      handleToggle(toggleRerender);
    } else {
      setUpdateStatus('Failed');
    }
  };

  let UpdatePasswordStatusModal;
  switch (updateStatus) {
    case 'Success':
      UpdatePasswordStatusModal = (
        <Modal>
          <View>
            <Text>Password updated!</Text>
          </View>
        </Modal>
      );
      break;
    case 'Failed':
      UpdatePasswordStatusModal = (
        <Modal>
          <View>
            <Text>Incorrect Password, try again</Text>
            <Button title="OK" onPress={() => setUpdateStatus('Pending')} />
          </View>
        </Modal>
      );
      break;

    default:
      break;
  }

  // this feels WET
  return (
    <View>
      {updateStatus !== 'Pending' && UpdatePasswordStatusModal}
      <Text>Confirm your password:</Text>
      <TextInput
        autoCapitalize="none"
        returnKeyType="next"
        secureTextEntry={true}
        onChangeText={(currPassword) =>
          handleTextChange(currPassword, 'currentPassword', setNewPasswordForm)
        }
        value={newPasswordForm.currentPassword}
      />
      {confirmedPassword !== null && <ConfirmedPasswordMessage status={confirmedPassword} />}
      <Text>Create new password:</Text>
      <TextInput
        autoCapitalize="none"
        returnKeyType="next"
        secureTextEntry={true}
        onChangeText={(newPassword) =>
          handleTextChange(newPassword, 'newPassword', setNewPasswordForm)
        }
        value={newPasswordForm.newPassword}
      />
      <Text>Confirm new password:</Text>
      <TextInput
        autoCapitalize="none"
        returnKeyType="next"
        secureTextEntry={true}
        onChangeText={(confirmNewPassword) =>
          handleTextChange(confirmNewPassword, 'confirmNewPassword', setNewPasswordForm)
        }
        value={newPasswordForm.confirmNewPassword}
      />

      {newPasswordForm.newPassword !== newPasswordForm.confirmNewPassword && (
        <Text>NEW PASSWORD AND CONFIRM NEW PASSWORD DO NOT MATCH</Text>
      )}

      <Button
        title="Update my password"
        disabled={!activeUpdateButton}
        onPress={handlePasswordUpdate}
      />
    </View>
  );
};

const DeleteModal = ({ userID, email, navigation, toggleDeleteModal }) => {
  const [deletePassword, setDeletePassword] = useState('');
  const [deletionStatus, setDeletionStatus] = useState('Pending');
  const [confirmedPassword, setConfirmedPassword] = useState(null);

  useEffect(() => {
    if (deletionStatus === 'Confirmed') {
      signOut();
      navigation.navigate('Landing');
      toggleDeleteModal(false);
      console.log(navigation);
    }
  }, [deletionStatus]);

  useEffect(() => {
    if (deletePassword.length > 3) {
      setTimeout(() => {
        const credentials = {
          email,
          password: deletePassword,
        };
        setConfirmedPassword(async () => {
          return await confirmPassword({ credentials, userID });
        });
      }, 2000);
    } else {
      setConfirmedPassword(null);
    }
  }, [deletePassword]);

  const handleProfileDeletion = async () => {
    if (confirmedPassword) {
      await deleteUser(userID);
      setDeletionStatus('Confirmed');
    } else {
      setDeletionStatus('Unauthorized');
    }
  };

  let ModalMessage;
  switch (deletionStatus) {
    case 'Pending':
      ModalMessage = (
        <View>
          <Button
            title="Cancel Deletion"
            onPress={() => {
              toggleDeleteModal(false);
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
      break;
    case 'Confirmed':
      ModalMessage = (
        <View>
          <Text>Your Profile has been deleted.</Text>
        </View>
      );
      break;
    case 'Unauthorized':
      ModalMessage = (
        <View>
          <Text>Incorrect password or unauthorized, please try again. </Text>
          <Button title="OK" onPress={() => setDeletionStatus('Pending')} />
        </View>
      );
      break;
    default:
      ModalMessage = (
        <View>
          <Text> Loading.... I shouldn't be displayed tbh</Text>;
        </View>
      );
      break;
  }

  return <Modal>{ModalMessage}</Modal>;
};

const ConfirmedPasswordMessage = ({ status }) => {
  if (status) {
    return <Text>Password is confirmed</Text>;
  } else return <Text>INCORRECT PASSWORD</Text>;
};
