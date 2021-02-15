import React, { useState, useEffect } from "react";
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
  const noteId = pathName.substr(3);

  useEffect(() => {
    axios.get("http://localhost:5000/note/" + noteId).then(res => {
          setAuthor(res.data.author_name);
          setTitle(res.data.title);
          setContent(res.data.content);
          setDate(res.data.date);
          setImage(res.data.image);
      });
  });

  return (
    <div className="completeNote col-md-9 col-sm-12">
    <img className="completeNoteImg col-md-12 col-sm-12" src={"http://localhost:5000/" + image } alt="..." />
      <h1 style={{margin: "20px 10px"}}> {title} </h1>
      <p class="card-text"  style={{margin: "20px 10px"}}>
        <small><em>Author: {author}</em></small>
      </p>
      <p className="card-text"  style={{margin: "20px 10px"}}>
        <small className="text-muted">{date}</small>
      </p>
      <p className="c"  style={{margin: "20px 10px"}}> {content} </p>
    </div>
  );
}


export default A;
