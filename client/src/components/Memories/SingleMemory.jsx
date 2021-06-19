import React from "react";
import Slide from 'react-reveal/Slide';
import styles from "./SingleMemory.module.css";
import {Link, useHistory } from 'react-router-dom';

function SingleMemory(props) {

  let history = useHistory();
  let author = props.author;

  function deleteMemory() {
    props.onDelete(props.id);
  }

  function getCompleteMemory(){
    history.push({
          pathname: '/fullMemory',
          state: { memoryId: props.id }
      });
  }

  return (
      <div>
        <Slide left>
        <div className={styles.singleCard}>
            <img src={"http://localhost:5000/" + props.image} className={styles.cardImg} alt="..."/>
            <h5 style={{margin: "7px"}}>{props.title}</h5>
            <Link className="nav-link nav-item" style={{marginBottom:"7px", color:"#000000"}} to={"/user/"+ props.uID}>{props.btnTitle==="Delete" ? "" : "Author: " + author }</Link>
            <button className="btn btn-outline-dark" style={{marginLeft: "5px"}} onClick={getCompleteMemory}>Read More</button>
            <button style={props.btnTitle==="Delete" ? { visibility: "visible", margin: "16px"} : { visibility: "hidden" }} className="btn btn-outline-dark" onClick={deleteMemory}>{props.btnTitle}</button>
        </div>
        </Slide>
      </div>
  );
}


export default SingleMemory;
