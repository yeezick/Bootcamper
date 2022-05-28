// utilities
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// screens
import { Applicants } from '../screens/Applicants/Applicants';
import { CreateProject } from '../screens/CreateProject';
import { EditProfile } from '../screens/EditProfile';
import { EditProject } from '../screens/EditProject/EditProject';
import { Landing } from '../screens/Landing';
import { Messages } from '../screens/Messages';
import { Roulette } from '../screens/Roulette';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { SingleProject } from '../screens/SingleProject';
import { UserDashboard } from '../screens/UserDashboard';
import { UserProfile } from '../screens/UserProfile';
import { CreateProfile } from '../screens/CreateProfile';
// assets
import { fetchAllProjects } from '../services/redux/actions/projectActions.js';
import { fetchAllTools } from '../services/redux/actions/toolActions.js';
import { signOut, verify } from '../services/api/users';
import { uiActions } from '../services/redux/slices/uiSlice';
import { AddPortfolioProjects } from '../screens/AddPortfolioProjects';

const Drawer = createDrawerNavigator();

export const SideMenu = () => {
  const dispatch = useDispatch();
  const { blacklisted_projects, user } = useSelector((state) => state.ui);
  const [userLoaded, toggleUserLoaded] = useState(false);

  useEffect(() => {
    const setupReduxStore = async () => {
      const verifiedUser = await verify();
      if (verifiedUser) {
        dispatch(uiActions.updateUser(verifiedUser));
      } else {
        dispatch(uiActions.updateUser(null));
      }
      dispatch(fetchAllTools());
      toggleUserLoaded(true);
    };
    setupReduxStore();
  }, []);

  useEffect(() => {
    if (userLoaded) {
      dispatch(fetchAllProjects(blacklisted_projects));
    } else {
      dispatch(fetchAllProjects());
    }
  }, [userLoaded]);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Landing" component={Landing} />
        {/* Landing is at the top of the list therefore is loaded fist on application open & refresh*/}
        <Drawer.Screen name="Applicants" component={Applicants} />
        <Drawer.Screen name="CreateProject" component={CreateProject} />
        <Drawer.Screen name="EditProfile" component={EditProfile} />
        <Drawer.Screen name="EditProject" component={EditProject} />
        <Drawer.Screen name="Messages" component={Messages} />
        <Drawer.Screen name="Roulette" component={Roulette} />
        <Drawer.Screen name="SingleProject" component={SingleProject} />
        <Drawer.Screen name="SignIn" component={SignIn} />
        <Drawer.Screen name="SignUp" component={SignUp} />
        <Drawer.Screen name="UserDashboard" component={UserDashboard} />
        <Drawer.Screen name="UserProfile" component={UserProfile} />
        <Drawer.Screen name="CreateProfile" component={CreateProfile} />
        <Drawer.Screen name="AddPortfolioProjects" component={AddPortfolioProjects} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
