import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Landing } from "./screens/Landing";
import { CreateProject } from "./screens/CreateProject";
import { EditProject } from "./screens/EditProject";
import { SingleProject } from "./screens/SingleProject";
import { Roulette } from "./screens/Roulette";
import { SignIn } from "./screens/SignIn";
import { SignUp } from "./screens/SignUp";
import { UserDashboard } from "./screens/UserDashboard";
import { UserProfile } from "./screens/UserProfile";
import { EditProfile } from "./screens/EditProfile";

const Drawer = createDrawerNavigator();

export const SideMenu = () => {
  return (
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
        component={UserProfile}
        // options={{ title: "welcome" }}
      />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        // options={{ title: "welcome" }}
      />
    </Drawer.Navigator>
  );
};
