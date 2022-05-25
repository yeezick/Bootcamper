import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Text, TextInput, Modal, View } from 'react-native';
import { confirmPassword, updatePassword } from '../../services/api/users';
import { uiActions } from '../../services/redux/slices/uiSlice';
import { handleTextChange, handleToggle } from '../../services/utils/handlers';

export const UpdatePasswordForm = ({ email, toggleResetPassword, userID }) => {
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
