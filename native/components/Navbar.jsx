//utilities
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import { Applicants } from '../screens/Applicants/Applicants';
import { CreateProject } from '../screens/CreateProject';
import { EditProfile } from '../screens/EditProfile';
import { EditProject } from '../screens/EditProject/EditProject';
import { Landing } from '../screens/Landing';
import { Roulette } from '../screens/Roulette';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { SingleProject } from '../screens/SingleProject';
import { UserDashboard } from '../screens/UserDashboard';
import { UserProfile } from '../screens/UserProfile';
import  Messages  from '../screens/Messages'

//Screen names

const userDashboard = 'Dashboard';
const rouletteName = "Roulette";
const userProfile = 'Profile';
const messages = 'Messages';
// const settings = 'Settings'; 

const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={userDashboard}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === userDashboard) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === rouletteName) {
              iconName = focused ? 'shuffle' : 'shuffle-outline';

            } else if (rn === userProfile) {
              iconName = focused ? 'person' : 'person-outline';
            } else if (rn === messages) {
              iconName = focused ? 'mail' : 'mail-outline';
            }
            // else if (rn === settings) {
            //   iconName = focused ? 'settings' : 'settings-outline';
            // }


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
          
      >

        <Tab.Screen name={userDashboard} component={ UserDashboard } />
        <Tab.Screen name={rouletteName} component={ Roulette } />
        <Tab.Screen name={userProfile} component={ UserProfile } />
        <Tab.Screen name={messages} component={ Messages } />
        {/* <Tab.Screen name={settings} component={ Settings } /> */}

      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default NavBar;