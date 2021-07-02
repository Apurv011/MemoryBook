import React, { useState, useEffect } from "react";
import Fade from 'react-reveal/Fade';
import Header from "../Header/Header";
import Comment from "./Comment";
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./FullMemory.module.css";
import {useHistory} from "react-router-dom";

function FullMemory(){

  let history = useHistory();
  const location = useLocation();
  const [list, setList] = useState([]);
  const [author, setAuthor] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [uID, setUID] = useState("");
  const [uName, setUName] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [allComments, setAllComments] = useState({
    comments: []
  });
  const [newComment, setNewComment] = useState({
    comment: "",
    commenter: "",
    date: ""
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      setUID(foundUser.user._id);
      setUName(foundUser.user.username);

      axios.get("http://localhost:5000/memory/" + location.state.memoryId, config).then(res => {
          console.log(res.data);
          setAuthor(res.data.author_name);
          console.log(author);
          setAuthorId(res.data.user_id);
          setTitle(res.data.title);
          setContent(res.data.content);
          setDate(res.data.date);
          setImage(res.data.image);
          setList(res.data.comments!==null ? res.data.comments : []);
          setAllComments((preValues) => {
            return {
              ...preValues,
              comments: res.data.comments!==null ? res.data.comments : []
            };
          });
      }).catch((error) => {
        history.push("/login");
      });
    }
    else{
      history.push("/login");
    }
  }, [uID, history, location, author]);

  function getDate(){
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    date = date + "-" + month + "-" + year;
    return date;
  }

  function goToUser(){
    history.push({
          pathname: '/user',
          state: { authorId: authorId }
      });
  }

  function submitComment(event) {

    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };
      list.push(newComment);
      console.log("List " + list.length);

      setAllComments((preValues) => {
        return {
          ...preValues,
          comments: list
        };
      });

      axios.patch("http://localhost:5000/memory/" + location.state.memoryId, allComments, config).then(response => {
          console.log(response.data);
          axios.get("http://localhost:5000/memory/" + location.state.memoryId, config).then(res => {
              console.log(res.data);
              setAuthor(res.data.author_name);
              setAuthorId(res.data.user_id);
              setTitle(res.data.title);
              setContent(res.data.content);
              setDate(res.data.date);
              setImage(res.data.image);
              setList(res.data.comments!==null ? res.data.comments : []);
              setAllComments((preValues) => {
                return {
                  ...preValues,
                  comments: res.data.comments!==null ? res.data.comments : []
                };
              });
          }).catch((error) => {
            history.push("/login");
          });
      });

    setNewComment({
      comment: "",
      commenter: "",
      date:""
    });
    alert("Comment added Successfully!");
    event.preventDefault();
  }
}

  function handleChange(event) {
    const { name, value } = event.target;
    setNewComment((preValues) => {
      return {
        ...preValues,
        [name]: value,
        commenter: uName,
        date: getDate()
      };
    });
  }

  function changeIcon(){
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div>
      <Header uID={uID} hOption="My Memories" hOption2="My Diary" hOption3="My Profile"/>
        <Fade left>
          <div className={`${styles.completeMemory} col-md-9 col-sm-12`}>
          <img className={`${styles.completeMemoryImg} col-md-9 col-sm-9`} src={image==="" ? "https://images.wallpapersden.com/image/download/small-memory_am1pa2aUmZqaraWkpJRobWllrWdma2U.jpg"
                                                                           : "http://localhost:5000/" + image } alt="..." />
          <div style={{paddingLeft: "120px", paddingRight: "100px"}}>
            <h1 style={{marginTop:"35px"}}> {title} </h1>
            <p className="text-muted">{date}</p>
            <button className="btn" onClick={goToUser}><strong>Author: {author}</strong></button>
            <br/>
            <p> {content} </p>
          </div>
          <div className="p-2 px-4 col-md-10 col-sm-9" style={{margin:"0px auto"}}>
            <div className={`d-flex flex-row mt-4 mb-4`}>
              <textarea rows={2} type="text"
                        className="form-control ml-80 mr-3"
                        onChange={handleChange}
                        name="comment"
                        value={newComment.comment}
                        placeholder="Add comment" />
              <button className="btn btn-outline-primary" type="button" onClick={submitComment}>
                Comment
              </button>
            </div>
            <div className="collapsable-comment">
              <button onClick={changeIcon} className="btn" data-toggle="collapse" aria-expanded="false" aria-controls="collapse-1" href="#collapse-1">
                <p>
                <span style={{color:"#000000"}}>{!isCollapsed ? "All Comments" : "Hide Comments"}</span>
                {!isCollapsed ? <ArrowDropDownRoundedIcon fontSize="large" style={{color:"#000000"}}/> : <ArrowDropUpRoundedIcon fontSize="large" style={{color:"#000000"}}/>}
                </p>
              </button>
              <div id="collapse-1" className="collapse">
              {allComments.comments.length!==0 ?  allComments.comments.map((cmt, index) => {
                return (
                  <Comment
                      comment={cmt.comment}
                      commenter={cmt.commenter}
                      date={cmt.date}
                    />
                  );
                }) : "No Comments Yet :("}
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}


export default FullMemory;
