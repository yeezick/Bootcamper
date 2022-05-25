import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Text, View } from 'react-native';
import { handleToggle } from '../../services/utils/handlers';
import { UpdatePasswordForm } from './UpdatePassword';
import { DeleteModal } from './DeleteProfile';

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

// helper component
export const ConfirmedPasswordMessage = ({ status }) => {
  if (status) {
    return <Text>Password is confirmed</Text>;
  } else return <Text>INCORRECT PASSWORD</Text>;
};
