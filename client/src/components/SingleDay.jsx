import Slide from 'react-reveal/Slide';
import React from "react";

import { useHistory } from 'react-router-dom';

function SingleDay(props) {

  let history = useHistory();

  function getData(){
    props.onRead(props.id);
  }

  function deleteDay() {
    props.onDelete(props.id);
  }

  return (
    <div>
      <Slide left>
      <div className="card singleDayCard" style={{ width: "18rem", borderRadius: "7px", margin: "16px" }}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.date}</p>
          <button type="button" onClick={getData} className="btn btn-outline-dark" data-toggle="modal" data-target="#exampleModalCenter">
          Read More
          </button>
          <button style={{ margin: "16px" }} className="btn btn-outline-dark" onClick={deleteDay}>Delete</button>
        </div>
      </div>
      </Slide>
    </div>
  );

}

export default SingleDay;
