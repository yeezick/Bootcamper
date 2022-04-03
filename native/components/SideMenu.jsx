// utilities
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
// components
import { Landing } from '../screens/Landing';
import { CreateProject } from '../screens/CreateProject';
import { EditProject } from '../screens/EditProject';
import { SingleProject } from '../screens/SingleProject';
import { Roulette } from '../screens/Roulette';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { UserDashboard } from '../screens/UserDashboard';
import { UserProfile } from '../screens/UserProfile';
import { EditProfile } from '../screens/EditProfile';
// assets
import { getAllUsers, verify } from '../services/api/users';
import { uiActions } from '../services/redux/slices/uiSlice';
import { fetchAllProjects } from '../services/redux/actions/projectActions.js';
import { fetchAllTools } from '../services/redux/actions/toolActions.js';

const Drawer = createDrawerNavigator();

export const SideMenu = () => {
  const dispatch = useDispatch();
  const { blacklisted_projects, user } = useSelector((state) => state.ui);
  const [userLoaded, toggleUserLoaded] = useState(false);

  useEffect(() => {
    const setupReduxStore = async () => {
      // const verifiedUser = await verify();
      const allUsers = await getAllUsers(); // change once SIGN_IN is done
      dispatch(uiActions.updateUser(allUsers[0]));
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
        <Drawer.Screen
          name="Landing"
          component={Landing}
          // options={{ title: "welcome" }}
        />
        <Drawer.Screen
          name="CreateProject"
          component={CreateProject}
          // options={{ title: "welcome" }}
        />
        <Drawer.Screen
          name="EditProject"
          component={EditProject}
          // options={{ title: "welcome" }}
        />
        <Drawer.Screen
          name="SingleProject"
          component={SingleProject}
          // options={{ title: "welcome" }}
        />
        <Drawer.Screen
          name="Roulette"
          component={Roulette}
          // options={{ title: "welcome" }}
        />
        <Drawer.Screen
          name="SignIn"
          component={SignIn}
          // options={{ title: "welcome" }}
        />
        <Drawer.Screen
          name="SignUp"
          component={SignUp}
          // options={{ title: "welcome" }}
        />
        <Drawer.Screen
          name="UserDashboard"
          component={UserDashboard}
          // options={{ title: "welcome" }}
        />
        <Drawer.Screen
          name="UserProfile"
          // component={() => <UserProfile userId={user._id} />}
          initialParams={{ userId: user._id }}
        >
          {() => <UserProfile userId={user._id} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="EditProfile"
          // component={() => <UserProfile userId={user._id} />}
          initialParams={{ userId: user._id }}
        >
          {() => <EditProfile userId={user._id} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
