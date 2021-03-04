import React from "react";
import { Link, useHistory} from "react-router-dom";

function Header(props) {

  let history = useHistory();

  function logout(){
    props.checkAuth();
    history.push('/LandingPage');
  }

  return (
  <nav className="navbar navbar-light navbar-expand-lg header">
    <h3 className="title">Memory-Book</h3>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{marginLeft: "60px"}}>
      <ul className="navbar-nav  ml-auto">
        <li className="nav-item">
          <Link className="nav-link " to={props.hOption==="My Memories" ? "/myMemories" : "/memories"}>{props.hOption}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to={props.hOption2==="My Diary" ? "/myDiary" : "/memories"}>{props.hOption2}</Link>
        </li>
        <li className="nav-item">
          <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  </nav>
  );
}

export default Header;
