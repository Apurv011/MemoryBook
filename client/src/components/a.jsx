import React, { useState, useEffect } from "react";
import Fade from 'react-reveal/Fade';
import { useLocation } from "react-router-dom";
import axios from "axios";

function A(props){

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");

  const location = useLocation();
  let pathName = location.pathname;
  const memoryId = pathName.substr(3);

  useEffect(() => {
    axios.get("http://localhost:5000/memory/" + memoryId).then(res => {
          setAuthor(res.data.author_name);
          setTitle(res.data.title);
          setContent(res.data.content);
          setDate(res.data.date);
          setImage(res.data.image);
      });
  });

  return (
    <div>
      <Fade left>
        <div className="completeNote col-md-9 col-sm-12">
        <img className="completeNoteImg col-md-9 col-sm-9" src={"http://localhost:5000/" + image } alt="..." />
          <div style={{paddingLeft: "140px", paddingRight: "100px"}}>
            <h1 style={{marginTop:"35px"}}> {title} </h1>
            <p>
              <em>Author: {author}</em>
            </p>
            <p>
              <small className="text-muted" style={{textAlign: "center"}}>{date}</small>
            </p>
            <p className="c"> {content} </p>
          </div>
        </div>
      </Fade>
    </div>
  );
}


export default A;
