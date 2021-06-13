import React, { useState, useEffect } from "react";
import Fade from 'react-reveal/Fade';
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function FullMemory(props){

  const [author, setAuthor] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");

  const location = useLocation();
  let pathName = location.pathname;
  const memoryId = pathName.substr(11);

  useEffect(() => {

    const config = {
      headers: { "Authorization": "Bearer " + props.uToken }
    };

    axios.get("http://localhost:5000/memory/" + memoryId, config).then(res => {
          setAuthor(res.data.author_name);
          setAuthorId(res.data.user_id);
          setTitle(res.data.title);
          setContent(res.data.content);
          setDate(res.data.date);
          setImage(res.data.image);
      }).catch((error) => {
        console.log(error.response.status);
      });

  });

  return (
    <div>
    <Header checkAuth={props.changeAuthStatus} uID={props.uID} hOption="My Memories" hOption2="My Diary" hOption3="My Profile"/>
      <Fade left>
        <div className="completeNote col-md-9 col-sm-12">
          <img className="completeNoteImg col-md-9 col-sm-9" src={image==="" ? "https://images.wallpapersden.com/image/download/small-memory_am1pa2aUmZqaraWkpJRobWllrWdma2U.jpg"
                                                                           : "http://localhost:5000/" + image } alt="..." />
          <div style={{paddingLeft: "140px", paddingRight: "100px"}}>
            <h1 style={{marginTop:"35px"}}> {title} </h1>
            <p>
              <Link className="nav-link nav-item" style={{marginBottom:"7px", color:"#000000"}} to={"/user/"+ authorId}><em>Author: {author}</em></Link>
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


export default FullMemory;
