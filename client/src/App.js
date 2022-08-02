import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateProject } from './screens/CreateProject/CreateProject.jsx';
import { EditProfile } from './screens/EditProfile/EditProfile.jsx';
// import { EditProject } from './screens/EditProject/EditProject.jsx';
import { Landing } from './screens/Landing/Landing.jsx';
import { Roulette } from './screens/Roulette/Roulette.jsx';
import { SignIn } from './screens/SignIn/SignIn.jsx';
import { SignUp } from './screens/SignUp/SignUp.jsx';
import { SingleProject } from './screens/SingleProject/SingleProject.jsx';
import { UserDashboard } from './screens/UserDashboard/UserDashboard.jsx';
import { UserProfile } from './screens/UserProfile/UserProfile.jsx';
import Layout from './layout/Layout';
import { LocationDisplay } from './components/LocationDisplay.jsx';
// assets
import './App.css';
import { verify } from './services/api/users';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from './services/redux/slices/uiSlice';
import { fetchAllProjects } from './services/redux/actions/projectActions.js';
import { fetchAllTools } from './services/redux/actions/toolActions.js';

function App() {
  const dispatch = useDispatch();
  const { blacklisted_projects, user } = useSelector((state) => state.ui);
  const [userLoaded, toggleUserLoaded] = useState(false);
  useEffect(() => {
    const setupReduxStore = async () => {
      const user = await verify();
      dispatch(uiActions.updateUser(user));
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
    <Layout>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/projects/create" element={<CreateProject />} />
        <Route exact path="/projects/:id" element={<SingleProject />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route exact path="/dashboard" element={<UserDashboard />}></Route>
        <Route exact path="/users/:id" element={<UserProfile />} />
        <Route exact path="/users/:id/edit" element={<EditProfile currUser={user} />} />
      </Routes>
      <LocationDisplay />
    </Layout>
  );
}

export default App;
