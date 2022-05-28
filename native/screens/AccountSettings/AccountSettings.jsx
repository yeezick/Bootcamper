import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UpdatePasswordForm } from './UpdatePassword';
import { DeleteForm } from './DeleteProfile';
import { Button, Text, View } from 'react-native';
import { handleToggle } from '../../services/utils/handlers';

export const AccountSettings = ({ navigation, route }) => {
  const [resetPassword, toggleResetPassword] = useState(false);
  const [deleteForm, toggleDeleteForm] = useState(false);
  const { _id: userID, email } = useSelector((state) => state.ui.user);

  useEffect(() => {}, [resetPassword]);

  // would be a good idea to replace the modals below with a generic modal
  return (
    <View>
      <Text>Account Settings</Text>

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

      {deleteForm && (
        <DeleteForm
          userID={userID}
          email={email}
          navigation={navigation}
          toggleDeleteForm={toggleDeleteForm}
        />
      )}
      {!deleteForm && (
        <Button
          title="Delete Profile"
          onPress={() => {
            toggleDeleteForm(true);
          }}
        />
      )}
    </View>
  );
};
