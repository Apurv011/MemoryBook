import React from "react";
import Slide from 'react-reveal/Slide';

import { useHistory } from 'react-router-dom';

function SingleMemory(props) {

  let history = useHistory();
  let author = props.author;

  function deleteMemory() {
    props.onDelete(props.id);
  }

  function getCompleteMemory(){
      history.push('/fullMemory/' + props.id);
  }

  return (
      <div>
        <Slide left>
        <div className="singleCard">
            <img src={"http://localhost:5000/" + props.image} className="card-img-1" alt="..."/>
            <h5 className="card-title" style={{margin: "15px"}}>{props.title}</h5>
            <p style={{margin: "15px"}}>{props.btnTitle==="Delete" ? "" : "Author: " + author }</p>
            <button className="btn btn-outline-dark" style={{marginLeft: "5px"}} onClick={getCompleteMemory}>Read More</button>
            <button style={props.btnTitle==="Delete" ? { visibility: "visible", margin: "16px"} : { visibility: "hidden" }} className="btn btn-outline-dark" onClick={deleteMemory}>{props.btnTitle}</button>
        </div>
        </Slide>
      </div>
  );
}


export default SingleMemory;
