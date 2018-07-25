import React from "react";
// import TestImageSubmit from "./pages/TestImageSubmit";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        {/* <Route exact path="/" component={TestImageSubmit} /> */}
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </div>
  </Router>
);

export default App;
