import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import styles from "./LoginSignupForm.module.css";

function LogInForm(props){

  let history = useHistory();

  const [user, setUser] = useState({
      email: "",
      password:""
  });

  function loginUser(event) {
    console.log(`${process.env.REACT_APP_SERVER}user/login`);
    axios.post(`${process.env.REACT_APP_SERVER}user/login`, user).then(response => {
      if(response.data.message === 'Auth Successful!'){
          console.log(response.data);
          localStorage.clear();
          localStorage.setItem('userData', JSON.stringify(response.data));
          props.getUser(response.data.user._id, response.data.user.username, response.data.token);
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
      <h1 className={styles.heading}>Log In</h1>
      <form className={`${styles.loginSignupCard} form-container`}>
        <div className="form-group">
          <label><b>Email address</b></label>
          <input onChange={handleChange} type="email" name="email" value={user.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <small id="emailHelp" className="text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label><b>Password</b></label>
          <input onChange={handleChange} name="password" value={user.password} type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" onClick={loginUser} className="btn btn-outline-dark">Log In</button>
      </form>
      <Link to="/signup">
        <p id="emailHelp" className="small-text" style={{color: "#161616"}} >
          Don't have an account? Click here to create!
        </p>
      </Link>
    </div>
  );
}

export default LogInForm;
