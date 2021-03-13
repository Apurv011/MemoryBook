import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import Memories from "./Memories";
import FullMemory from "./FullMemory";
import UserMemories from "./UserMemories";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "./LandingPage";
import User from "./User";
import Diary from "./diary";

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userToken, setUserToken] = useState("");

  function checkAuth(){
    setIsAuth(!isAuth);
  }

  function getCurrentUser(id, uName, uToken){
    setUserName(uName);
    setUserId(id);
    setUserToken(uToken);
  }

  return (
    <Router>
      <Route path="/landingPage" exact component={LandingPage} />
      <Route path="/" exact component={LandingPage} />

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
      <ProtectedRoute path="/myDiary" exact component={Diary} uID={userId} changeAuthStatus={checkAuth} isAuth={isAuth} />
      <ProtectedRoute path="/fullMemory/:pID" exact component={FullMemory} uID={userId} uName={userName} changeAuthStatus={checkAuth} isAuth={isAuth} />
      <ProtectedRoute path="/user/:userID" exact component={User} uID={userId} uName={userName} uToken={userToken} changeAuthStatus={checkAuth} isAuth={isAuth} />
    </Router>

  );
}

export default App;
