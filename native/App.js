import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './services/redux/store.js';
import { SideMenu } from './components/SideMenu';
import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <Provider store={store}>
      <SideMenu />
      {/* <Navbar /> */}
    </Provider>
  );
}
