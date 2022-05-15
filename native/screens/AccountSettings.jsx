import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, TextInput, View } from 'react-native';
import { confirmPassword, deleteUser, signIn, signOut } from '../services/api/users';
import { handleTextChange, handleToggle } from '../services/utils/handlers';

export const AccountSettings = ({ navigation, route }) => {
  const [resetPassword, toggleResetPassword] = useState(false);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const { _id: userID, email } = useSelector((state) => state.ui.user);

  // would be a good idea to replace the modals below with a generic modal
  return (
    <View>
      <Text>Account Settings</Text>

      {deleteModal && <DeleteModal userID={userID} email={email} navigation={navigation} />}
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
    setTimeout(async () => {
      const { currentPassword, newPassword, confirmNewPassword } = newPasswordForm;
      const credentials = {
        email,
        password: newPasswordForm.currentPassword,
      };
      const res = await confirmPassword(credentials, userID);
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
  }, [newPasswordForm]);

  useEffect(() => {
    if (!newPasswordsMatch && !confirmedPassword) {
      setActiveUpdateButton(false);
    } else {
      setActiveUpdateButton(true);
    }
  }, []);

  const handlePasswordUpdate = async () => {
    const res = await updatePassword(newPassword, userID); // i feel that backend should also error check to confirm current password
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
            <Text>Incorrect Password or !</Text>
          </View>
        </Modal>
      );
      break;

    default:
      break;
  }

  const ConfirmedPasswordMessage = ({ status }) => {
    if (status) {
      return <Text>Password is confirmed</Text>;
    } else return <Text>INCORRECT PASSWORD</Text>;
  };

  // this feels WET
  return (
    <View>
      {updateStatus !== 'Pending' && UpdatePasswordStatusModal}
      <Text>Confirm your password:</Text>
      <TextInput
        onChangeText={(currPassword) =>
          handleTextChange(currPassword, 'currentPassword', setNewPasswordForm)
        }
        value={newPasswordForm.currentPassword}
      />
      {confirmedPassword !== null && <ConfirmedPasswordMessage status={confirmedPassword} />}
      <Text>Create new password:</Text>
      <TextInput
        onChangeText={(newPassword) =>
          handleTextChange(newPassword, 'newPassword', setNewPasswordForm)
        }
        value={newPasswordForm.newPassword}
      />
      <Text>Confirm new password:</Text>
      <TextInput
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

const DeleteModal = ({ userID, email, navigation }) => {
  const [deletePassword, setDeletePassword] = useState('');
  const [deletionStatus, setDeletionStatus] = useState('Pending');
  let ModalMessage;

  useEffect(() => {
    if (deletionStatus === 'Confirmed') {
      signOut();
      navigation.navigate('Landing');
    }
  }, [deletionStatus]);

  const handleProfileDeletion = async () => {
    const credentials = {
      email,
      password: deletePassword,
    };
    const passwordVerified = await confirmPassword({ credentials, userID });
    if (passwordVerified) {
      await deleteUser(userID);
      setDeletionStatus('Confirmed');
    } else {
      setDeletionStatus('Unauthorized');
    }
  };

  switch (deletionStatus) {
    case 'Pending':
      <View>
        <Text>Type in your password to confirm your profile's deletion.</Text>
        <TextInput
          onChangeText={(confirmPassword) => {
            setDeletePassword(confirmPassword);
          }}
          value={deletePassword}
        />
        <Button title="Delete your profile" onPress={handleProfileDeletion} />
      </View>;
      break;
    case 'Confirmed':
      <View>
        <Text>Your Profile has been deleted.</Text>
      </View>;
      break;
    case 'Unauthorized':
      <View>
        <Text>Incorrect password or unauthorized, please try again. </Text>
        <Button title="OK" onPress={() => setDeletionStatus('Pending')} />
      </View>;
      break;
    default:
      <View>
        <Text> Loading.... I shouldn't be displayed tbh</Text>;
      </View>;
      break;
  }
  return (
    <Modal>
      <View>{ModalMessage}</View>
    </Modal>
  );
};
