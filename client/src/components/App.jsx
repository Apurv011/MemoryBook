import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import Notes from "./Notes";
import A from "./a";
import UserNotes from "./UserNotes";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";


function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  function checkAuth(){
    setIsAuth(!isAuth);
  }

  function getCurrentUser(id, uName){
    setUserName(uName);
    setUserId(id);
  }

  return (
    <Router>
      <Route path="/" exact render={(props) => (
            <SignUpForm changeAuthStatus={checkAuth} />
          )}
       />
      <Route path="/signup" exact render={(props) => (
            <SignUpForm changeAuthStatus={checkAuth} />
          )}
      />
      <Route path="/login" exact render={(props) => (
          <LogInForm changeAuthStatus={checkAuth} getUser={getCurrentUser}/>
        )}
      />
      <ProtectedRoute path="/notes" exact component={Notes} uID={userId} uName={userName} changeAuthStatus={checkAuth} isAuth={isAuth} />
      <ProtectedRoute path="/myNotes" exact component={UserNotes} uID={userId} changeAuthStatus={checkAuth} isAuth={isAuth} />
      <ProtectedRoute path="/a/:pID" exact component={A} uID={userId} uName={userName} changeAuthStatus={checkAuth} isAuth={isAuth} />
    </Router>

  );
}

export default App;
