// import 'react-native-gesture-handler';
// import { Provider } from 'react-redux';
// import store from './services/redux/store.js';
// import { SideMenu } from './components/SideMenu';
// import { Navbar } from './components/Navbar';

// export default function App() {
//   return (
//     <Provider store={store}>
//       <SideMenu />
//       {/* <Navbar /> */}
//     </Provider>
//   );
// }

// packages
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// components
import { Login, Signup, SingleChat } from './screens/Messaging';

const Stack = createStackNavigator();

const ChatStack = () => {
  // navigation limited to SingleChat
  return (
    <Stack.Navigator>
      <Stack.Screen name="SingleChat" component={SingleChat} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  // Leverage the ChatStack
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  );
};

const App = () => {
  return <RootNavigator />;
};

export default App;
