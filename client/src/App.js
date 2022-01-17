import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          Landing
        </Route>
        <Route path="/sign-up">
          SignUp
        </Route>
        <Route path="/sign-in">
          SignIn
        </Route>
        <Route exact path="/users/:id/edit">
          EditProfile
        </Route>
        <Route exact path="/users/:id">
          UserProfile
        </Route>
        <Route exact path="/projects/:id">
          SingleProject
        </Route>
        <Route exact path="/projects/:id/edit">
          EditProject/CreateProject
        </Route>
        <Route path="/roulette">
          Roulette
        </Route>
      </Switch>
    </div>
  );
}

export default App;
