import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { Landing } from '../screens/Landing';
import { Roulette } from '../screens/Roulette';
// import { EditProject } from '../screens/EditProject/EditProject';
import { CreateProject } from '../screens/CreateProject';

//Screen names
const landingName = "Landing";
const rouletteName = "Roulette";
const createProjectName = "Create Proj";

const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={landingName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === landingName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === rouletteName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === createProjectName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
          
      >

        <Tab.Screen name={landingName} component={ Landing } />
        <Tab.Screen name={rouletteName} component={ Roulette } />
        <Tab.Screen name={createProjectName} component={ CreateProject } />

      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default NavBar;