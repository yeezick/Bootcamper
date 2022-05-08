import { useEffect } from 'react';
import { Button, View } from 'react-native';
import { useSelector } from 'react-redux';

export const Settings = ({ navigation }) => {
  const reduxUser = useSelector((state) => state.ui.user);
  const { _id: userID, first_name, last_name } = reduxUser;

  return (
    <View>
      <Text>Settings</Text>
      <View>
        <Text>User Image</Text>
        <Text>{`${first_name} ${last_name}`}</Text>
      </View>
      {/* list of options */}
      <View>
        <Text>Setting 1</Text>
        <Text>Setting 2</Text>
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile', { userID })}
        />
        <Button
          title="Account Settings"
          onPress={() => navigation.navigate('Account Settings', { userID })}
        />
      </View>
      <Button title="Log Out" />
    </View>
  );
};
