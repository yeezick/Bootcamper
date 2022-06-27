//utilities
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import { Messages } from '../screens/Messages';
import { Roulette } from '../screens/Roulette';
import { Settings } from '../screens/Settings';
import { UserDashboard } from '../screens/UserDashboard';
import { UserProfile } from '../screens/UserProfile/UserProfile';

//Screen names
const messages = 'Messages';
const rouletteName = 'Roulette';
const settings = 'Settings';
const userProfile = 'Profile';
const userDashboard = 'Dashboard';

const Tab = createBottomTabNavigator();

export const Navbar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={userDashboard}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === messages) {
              iconName = focused ? 'mail' : 'mail-outline';
            } else if (rn === rouletteName) {
              iconName = focused ? 'shuffle' : 'shuffle-outline';
            } else if (rn === userDashboard) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === userProfile) {
              iconName = focused ? 'person' : 'person-outline';
            } else if (rn === settings) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={userDashboard} component={UserDashboard} />
        <Tab.Screen name={rouletteName} component={Roulette} />
        <Tab.Screen name={userProfile} component={UserProfile} />
        <Tab.Screen name={messages} component={Messages} />
        <Tab.Screen name={settings} component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
