import "./App.css";
import { CreateProject } from './screens/CreateProject/CreateProject.jsx';
import { EditProfile } from "./screens/EditProfile/EditProfile.jsx";
import { EditProject } from "./screens/EditProject/EditProject.jsx";
import { Landing } from "./screens/Landing/Landing.jsx";
import { Roulette } from "./screens/Roulette/Roulette.jsx";
import { SignIn } from "./screens/SignIn/SignIn.jsx";
import { SignUp } from "./screens/SignUp/SignUp.jsx";
import { SingleProject } from "./screens/SingleProject/SingleProject.jsx";
import { UserProfile } from "./screens/UserProfile/UserProfile.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path='/projects/create' element={<CreateProject />} />
        <Route exact path="/projects/:id" element={<SingleProject />} />
        <Route exact path="/projects/:id/edit" element={<EditProject />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route exact path="/users/:id" element={<UserProfile />} />
        <Route exact path="/users/:id/edit" element={<EditProfile />} />
      </Routes>
    </Layout>
  );
}

export default App;
