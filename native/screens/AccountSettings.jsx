import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { confirmPassword, deleteUser, signIn, signOut } from '../services/api/users';
import { handleTextChange, handleToggle } from '../services/utils/handlers';

export const AccountSettings = ({ navigation, route }) => {
  const [resetPassword, toggleResetPassword] = useState(false);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const { _id: userID, email } = useSelector((state) => state.ui.user._id);

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
          toggleResetPassword={toggleResetPassword}
          userID={route.params.userID}
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

const UpdatePasswordForm = ({ toggleResetPassword, userID }) => {
  const [newPasswordForm, setNewPasswordForm] = useState({
    confirmNewPassword: '',
    currentPassword: '',
    newPassword: '',
  });

  // this feels WET
  return (
    <View>
      <Text>Confirm your password:</Text>
      <TextInput
        onChangeText={(currPassword) =>
          handleTextChange(currPassword, 'currentPassword', setNewPasswordForm)
        }
        value={newPasswordForm.currentPassword}
      />
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
      <Button title="Update my password" onPress={() => handleToggle(toggleResetPassword)} />
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
