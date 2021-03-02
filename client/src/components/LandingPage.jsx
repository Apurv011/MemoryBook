import React from "react";
import { Link, useHistory} from "react-router-dom";

function LandingPage(){

  let history = useHistory();

  function signup(){
    history.push('/signup');
  }

  function login(){
    history.push('/login');
  }

  return (
    <div className="landingPage">
      <p className="landingPageTitle"> Memory Book </p>
      <p className="landingPageSubTitle">❝A moment lasts all of a second, but the memory lives on forever.❞</p>
      <div className="landingPageCard" style={{ transform: "skewY(1deg)", marginLeft:"420px", padding: "15px"}}>
        <p style={{marginTop:"35px"}} className="subTitle">Don't have an account?</p>
        <p className="subTitle">Sign up now and join the world of Memories!</p>
        <button style={{marginTop: "50px"}} type="button" onClick={signup} className="btn btn-outline-dark btn-lg">Sign Up</button>
      </div>
      <div className="landingPageCard" style={{ transform: "skewY(-1deg)" }}>
        <p style={{marginTop:"55px"}} className="subTitle">Already have an account?</p>
        <p className="subTitle">Logn In to the world of Memories!</p>
        <button style={{marginTop: "70px"}} type="button" onClick={login} className="btn btn-outline-dark btn-lg">Log In</button>
      </div>
    </div>
  );
}

export default LandingPage;
