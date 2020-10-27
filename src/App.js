import './App.css';

import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import { Context } from './Context/AuthContext';
import Dashboard from './Pages/Dashboard/Dashboard';
import Auth from './Pages/Auth/Auth';
import Verify from './Pages/Verify/Verify';
import ErrorPage from './Pages/Error/ErrorPage';
import Urls from './Pages/Urls/Urls';
import NavBar from './Components/NavBar/NavBar';
import ForgetPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';

function App() {
  const { state, signout } = useContext(Context);
  const { email, token } = state;

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/verify" component={Verify} />
      <Route path="/Error" component={ErrorPage} />
      <Route path="/forgotPassword" component={ForgetPassword} />
      <Route path="/reset" component={ResetPassword} />
      <Route path="/" exact component={LandingPage} />
      <Redirect to="/" />
    </Switch>
  );

  if (state.token) {
    routes = (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/urlslist" component={Urls} />
        <Route path="/" exact component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div className="App">
      {token ? <NavBar signout={signout} email={email} /> : null}
      {routes}
    </div>
  );
}

export default App;
