import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';

function SignUpForm(props){

  let history = useHistory();

  const [user, setUser] = useState({
      username: "",
      email: "",
      password:""
  });

    function registerUser(event) {
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

      event.preventDefault();
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
      <h2 className="Heading">Sign Up</h2>
      <form className="login-signup form-container" >
        <div className="form-group">
          <label><b>Username</b></label>
          <input onChange={handleChange} type="text" class="form-control" name="username" value={user.username}/>
        </div>
        <div className="form-group">
          <label><b>Email address</b></label>
          <input onChange={handleChange} type="email" className="form-control" name="email" value={user.email} aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label><b>Password</b></label>
          <input onChange={handleChange} type="password" className="form-control" name="password" value={user.password} />
        </div>
        <button type="submit" onClick={registerUser} className="btn btn-dark">Sign-Up</button>
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
