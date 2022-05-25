import { useEffect, useState } from 'react';
import { Button, Text, TextInput, Modal, View } from 'react-native';
import { confirmPassword, deleteUser, signOut } from '../../services/api/users';

export const DeleteModal = ({ userID, email, navigation, toggleDeleteModal }) => {
  const [deletePassword, setDeletePassword] = useState('');
  const [deletionStatus, setDeletionStatus] = useState('Pending');
  const [confirmedPassword, setConfirmedPassword] = useState(null);

  useEffect(() => {
    if (deletionStatus === 'Confirmed') {
      signOut();
      navigation.navigate('Landing');
      toggleDeleteModal(false);
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
