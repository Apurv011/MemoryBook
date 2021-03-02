import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';

function LogInForm(props){

  let history = useHistory();

  const [user, setUser] = useState({
      email: "",
      password:""
  });

  function loginUser(event) {
    axios.post("http://localhost:5000/user/login", user).then(response => {
      if(response.data.message === 'Auth Successful!'){
          console.log(response.data);
          props.getUser(response.data.user._id, response.data.user.username);
          props.changeAuthStatus();
          history.push('/memories');
      }
      else{
        console.log(response.data);
      }
    });

    setUser({
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
      <h2 className="Heading">Log In</h2>
      <form className="login-signup form-container" >
        <div className="form-group">
          <label><b>Email address</b></label>
          <input onChange={handleChange} type="email" name="email" value={user.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label><b>Password</b></label>
          <input onChange={handleChange} name="password" value={user.password} type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" onClick={loginUser} className="btn btn-outline-dark">Log In</button>
      </form>
      <Link to="/signup">
        <h1 id="emailHelp" className="form-text text-muted small-text" >
          Don't have an account? Click here to create!
        </h1>
      </Link>
    </div>
  );
}

export default LogInForm;
