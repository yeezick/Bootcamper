import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { handleTextChange, handleToggle } from '../services/utils/handlers';

export const AccountSettings = ({ route }) => {
  const [resetPassword, toggleResetPassword] = useState(false);

  return (
    <View>
      <Text>Account Settings</Text>
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

      <Button title="Delete Profile" />
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
