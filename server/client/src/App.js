import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Register from './components/Register';
import DetailPage from './components/DetailPage';
import UserProfile from './components/UserProfile';
import EditUser from './components/EditUser';
import Logout from './components/Logout';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/editProfile">
          <EditUser />
        </Route>{' '}
        <Route path="/profile">
          <UserProfile />
        </Route>{' '}
        <Route path="/logout">
          <Logout />
        </Route>{' '}
        <Route path="/register">
          <Register />
        </Route>{' '}
        <Route path="/login">
          <Login />
        </Route>{' '}
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/watch">
          <DetailPage />
        </Route>{' '}
        <Route path="/">
          <Homepage />
        </Route>{' '}
      </Switch>{' '}
    </Router>
  );
}

export default App;
