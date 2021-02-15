import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import Memories from "./Memories";
import A from "./a";
import UserMemories from "./UserMemories";
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
      <ProtectedRoute path="/memories" exact component={Memories} uID={userId} uName={userName} changeAuthStatus={checkAuth} isAuth={isAuth} />
      <ProtectedRoute path="/myMemories" exact component={UserMemories} uID={userId} changeAuthStatus={checkAuth} isAuth={isAuth} />
      <ProtectedRoute path="/a/:pID" exact component={A} uID={userId} uName={userName} changeAuthStatus={checkAuth} isAuth={isAuth} />
    </Router>

  );
}

export default App;
