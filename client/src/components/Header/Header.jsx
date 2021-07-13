import React from "react";
import {useHistory} from "react-router-dom";
import styles from "./Header.module.css";

function Header(props) {

  let history = useHistory();

  function logout(){
    localStorage.clear();
    history.push('/LandingPage');
  }

  function myMemories(){
    history.push({
          pathname: '/myMemories',
          state: { favs: [], isFav: false }
      });
  }

  function memories(){
    history.push('/memories');
  }

  function myDiary(){
    history.push('/myDiary');
  }

  function myProfile(){
    history.push({
          pathname: '/user',
          state: { authorId: props.uID }
      });
  }

  function showFavs(){
      history.push({
            pathname: '/myMemories',
            state: { favs:  props.favorites, isFav: true}
        });
  }

  return (
  <nav className={`${styles.header} navbar navbar-light navbar-expand-lg`}>
    <h3 className={styles.title}>Memory-Book</h3>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{marginLeft: "60px"}}>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button className="nav-link btn btn-link" onClick={props.hOption==="My Memories" ? myMemories : memories}>{props.hOption}</button>
        </li>
        <li className="nav-item">
          <button className="nav-link btn btn-link" onClick={props.hOption2==="My Diary" ? myDiary : memories}>{props.hOption2}</button>
        </li>
        <li className="nav-item">
          <button className="nav-link btn btn-link" onClick={props.hOption3==="My Profile" ? myProfile : memories}>{props.hOption3}</button>
        </li>
        <li className="nav-item">
          <button style={!props.isAuthor ? {visibility: "visible"} : {visibility: "hidden"} } className="nav-link btn btn-link" onClick={props.hOptionFav==="Favorites" ? showFavs : memories}>{props.hOptionFav}</button>
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
