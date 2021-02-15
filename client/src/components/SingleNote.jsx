import React from "react";
import { useHistory } from 'react-router-dom';

function SingleNote(props) {

  let history = useHistory();
  let author = props.author;

  function deleteNote() {
    props.onDelete(props.id);
  }

  function getCompleteNote(){
      history.push('/a/' + props.id);
  }

  return (
      <div className="singleCard">
        <img src={"http://localhost:5000/" + props.image} className="card-img-1" alt="..."/>
        <h5 className="card-title" style={{margin: "15px"}}>{props.title}</h5>
        <p style={{margin: "15px"}}>{props.btnTitle==="Delete" ? "" : "Author: " + author }</p>
        <button className="btn btn-light" style={{marginLeft: "5px"}} onClick={getCompleteNote}>Read More</button>
        <button style={props.btnTitle==="Delete" ? { visibility: "visible", margin: "16px"} : { visibility: "hidden" }} className="btn btn-light" onClick={deleteNote}>{props.btnTitle}</button>
      </div>
  );
}


export default SingleNote;
