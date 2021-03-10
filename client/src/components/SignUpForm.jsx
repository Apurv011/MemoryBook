import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';

function SignUpForm(props){

  let history = useHistory();

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmaiError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPsswordError, setConfirmPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useState({
      username: "",
      email: "",
      password:""
  });

  function valideate(){
    let isValid = true;
    if(user.username === ""){
      setUsernameError("Enter Username");
      isValid=false;
    }
    if(!user.email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
      setEmaiError("Enter a valid email");
      isValid=false;
    }
    if(user.password.length < 6){
      setPasswordError("Password length should be more than 5");
      isValid=false;
    }
    if(user.password !== confirmPassword){
      setConfirmPasswordError("Passwod is not matching");
      isValid=false;
    }
    return isValid;
  }

    function registerUser(event) {
      if(valideate()){

        axios.post("http://localhost:5000/user/signup", user).then(response => {
          console.log(response.data);
          props.changeAuthStatus();
          history.push('/login');
        });
        setUser({
          username: "",
          email: "",
          password:""
        });
      }

      event.preventDefault();
    }

    function confirmPsswordChange(event){
      setConfirmPassword(event.target.value);
    }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
  }

  return (
    <div>
      <h1 className="Heading">Sign Up</h1>
      <form className="login-signup form-container" >
        <div className="form-group">
          <label><b>Username</b></label>
          <input onChange={handleChange} type="text" class="form-control" name="username" value={user.username}/>
          <p className="form-text" style={{color: "#ff0000", fontSize:"12px"}}><b>{usernameError}</b></p>
        </div>
        <div className="form-group">
          <label><b>Email address</b></label>
          <input onChange={handleChange} type="email" className="form-control" name="email" value={user.email} aria-describedby="emailHelp" />
          <p className="form-text" style={{color: "#ff0000", fontSize:"12px"}}><b>{emailError}</b></p>
        </div>
        <div className="form-group">
          <label><b>Password</b></label>
          <input onChange={handleChange} type="password" className="form-control" name="password" value={user.password} />
          <p className="form-text" style={{color: "#ff0000", fontSize:"12px"}}><b>{passwordError}</b></p>
        </div>
        <div className="form-group">
          <label><b>Confirm Password</b></label>
          <input type="password" onChange={confirmPsswordChange} className="form-control" value={confirmPassword} />
          <p className="form-text" style={{color: "#ff0000", fontSize:"12px"}}><b>{confirmPsswordError}</b></p>
        </div>
        <button type="submit" onClick={registerUser} className="btn btn-outline-dark">Sign-Up</button>
      </form>
      <Link to="/login">
        <h1 id="emailHelp" className="form-text text-muted small-text">
          Already have an Accout? Click here to Log-In
        </h1>
      </Link>
    </div>
  );
}

export default SignUpForm;
