import React, { useState, useEffect } from "react";
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

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserToken(foundUser.token);
      setUserId(foundUser.user._id);
      setUserName(foundUser.user.username);
    }
  }, []);

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
        <SignUpForm />
      </Route>

      <Route path="/login" exact>
        <LogInForm getUser={getCurrentUser}/>
      </Route>

      <Route path="/memories" exact>
        <Memories  uID={userId} uName={userName} uToken={userToken}/>
      </Route>

      <Route path="/myMemories" exact>
        <UserMemories exact component={UserMemories} uID={userId} uToken={userToken}/>
      </Route>

      <Route path="/myDiary" exact>
        <Diary uID={userId} uToken={userToken}/>
      </Route>

      <Route path="/fullMemory" exact>
        <FullMemory uID={userId} uName={userName} uToken={userToken}/>
      </Route>

      <Route path="/user" exact>
        <User uID={userId} uName={userName} uToken={userToken} />
      </Route>

    </Router>

  );
}

export default App;
