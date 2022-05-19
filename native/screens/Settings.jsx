import { useDispatch, useSelector } from 'react-redux';
import { Text, Button, View } from 'react-native';
import { signOut } from '../services/api/users';
import { uiActions } from '../services/redux/slices/uiSlice';

export const Settings = ({ navigation }) => {
  const reduxUser = useSelector((state) => state.ui.user);
  const { _id: userID, first_name, last_name } = reduxUser;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut();
    dispatch(uiActions.resetUser());
    navigation.navigate('Landing');
  };

  return (
    <View>
      <Text>Settings</Text>
      <View>
        <Text>User Image</Text>
        <Text>{`${first_name} ${last_name}`}</Text>
      </View>
      <View>
        <Text>Setting 1</Text>
        <Text>Setting 2</Text>
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile', { userID })}
        />
        <Button
          title="Account Settings"
          onPress={() => navigation.navigate('AccountSettings', { userID })}
        />
      </View>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};
