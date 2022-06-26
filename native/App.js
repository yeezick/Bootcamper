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

import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SingleChat } from './screens/Messaging/SingleChat';

const Stack = createStackNavigator();

const ChatStack = () => {
  // navigation limited to SingleChat
  return (
    <Stack.Navigator>
      <Stack.Screen name="SingleChat" component={SingleChat} />
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
