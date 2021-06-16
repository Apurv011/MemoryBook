import React from "react";
import {useHistory} from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage(){

  let history = useHistory();

  function signup(){
    history.push('/signup');
  }

  function login(){
    history.push('/login');
  }

  return (
    <div className={`${styles.landingPage} row`} >
      <div className="col-lg-4 col-md-6">
        <p className={styles.landingPageTitle}><strong> Memory Book </strong></p>
        <p className={styles.landingPageSubTitle}><strong>❝A moment lasts all of a second, but the memory lives on forever.❞</strong></p>
      </div>
      <div className="col-lg-8 col-md-6">
        <div className="row">
          <div className={`${styles.landingPageCard } col-lg-5`}>
            <p style={{marginTop:"52px"}} className={styles.subTitle}><strong>Don't have an account?</strong></p>
            <p className={styles.subTitle}><strong>Sign up now and join the world of Memories!</strong></p>
            <button style={{marginTop: "45px"}} type="button" onClick={signup} className="btn btn-outline-dark btn-lg">Sign Up</button>
          </div>
          <div className={`${styles.landingPageCard } col-lg-5`}>
            <p style={{marginTop:"55px"}} className={styles.subTitle}><strong>Already have an account?</strong></p>
            <p className={styles.subTitle}><strong>Logn In to the world of Memories!</strong></p>
            <button style={{marginTop: "70px"}} type="button" onClick={login} className="btn btn-outline-dark btn-lg">Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
