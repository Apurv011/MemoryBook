import React, { useState } from "react";
import SignUpForm from "./LoginSignup/SignUpForm";
import LogInForm from "./LoginSignup/LogInForm";
import Memories from "./Memories/Memories";
import FullMemory from "./Memories/FullMemory";
import UserMemories from "./Memories/UserMemories";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from "./MainPage/LandingPage";
import User from "./UserProfile/User";
import Diary from "./Diary/Diary";

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

      <Route path="/" exact>
        <LandingPage />
      </Route>

      <Route path="/landingPage" exact>
        <LandingPage />
      </Route>

      <Route path="/signup" exact>
        <SignUpForm changeAuthStatus={checkAuth} />
      </Route>

      <Route path="/login" exact>
        <LogInForm changeAuthStatus={checkAuth} getUser={getCurrentUser}/>
      </Route>

      <Route path="/memories" exact>
        <Memories  uID={userId} uName={userName} changeAuthStatus={checkAuth} isAuth={isAuth} uToken={userToken}/>
      </Route>

      <Route path="/myMemories" exact>
        <UserMemories exact component={UserMemories} uID={userId} changeAuthStatus={checkAuth} isAuth={isAuth} uToken={userToken}/>
      </Route>

      <Route path="/myDiary" exact>
        <Diary uID={userId} changeAuthStatus={checkAuth} isAuth={isAuth} uToken={userToken}/>
      </Route>

      <Route path="/fullMemory/:pID" exact>
        <FullMemory uID={userId} uName={userName} changeAuthStatus={checkAuth} isAuth={isAuth} uToken={userToken}/>
      </Route>

      <Route path="/user/:userID" exact>
        <User uID={userId} uName={userName} uToken={userToken} changeAuthStatus={checkAuth} isAuth={isAuth}/>
      </Route>

    </Router>

  );
}

export default App;
