//utilities
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import { ChatRooms } from '../screens/Messaging/ChatRooms';
import { Roulette } from '../screens/Roulette';
import { Settings } from '../screens/Settings';
import { UserDashboard } from '../screens/UserDashboard';
import { UserProfile } from '../screens/UserProfile';

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
            let routeName = route.name;

            if (routeName === messages) {
              iconName = focused ? 'mail' : 'mail-outline';
            } else if (routeName === rouletteName) {
              iconName = focused ? 'shuffle' : 'shuffle-outline';
            } else if (routeName === userDashboard) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (routeName === userProfile) {
              iconName = focused ? 'person' : 'person-outline';
            } else if (routeName === settings) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={userDashboard} component={UserDashboard} />
        <Tab.Screen name={rouletteName} component={Roulette} />
        <Tab.Screen name={userProfile} component={UserProfile} />
        <Tab.Screen name={messages} component={ChatRooms} />
        <Tab.Screen name={settings} component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
