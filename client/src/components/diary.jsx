import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import SingleDay from "./SingleDay";
import axios from "axios";

function Diary(props){

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const [userDays, setUserDays] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/diary/alldays").then(res => {
      setUserDays(() => {
        return res.data.days.filter((day) => {
          return day.user_id === props.uID;
        });
      });
    });
  });

  function deleteDay(id) {
    axios.delete("http://localhost:5000/diary/day/delete/"  + id).then(res => {
      console.log(res);
    });

  setUserDays((preValues) => {
    return userDays.filter((day, index) => {
      return index !== id;
    });
  });
}

function getData(id){
  axios.get("http://localhost:5000/diary/" + id).then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setDate(res.data.date);
    });
}

  return (
    <div>
      <Header checkAuth={props.changeAuthStatus} hOption2="Home"/>
      <CreateArea className="createnote"
                  userId={props.uID}
                  userName={props.uName}
                  isImg={false} />
        <div className="row" style={{margin: "25px 50px"}}>
        {userDays.map((day, index) => {
          return (
            <SingleDay
              key={index}
              id={day._id}
              onRead={getData}
              onDelete={deleteDay}
              title={day.title}
              btnTitle={"Delete"}
              content={day.content}
              date={day.date}
            />
          );
          })}
        </div>
        <div className="modal fade" id="exampleModalCenter" >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
              </div>
              <div className="modal-body">{date}</div>
              <div className="modal-body" >{content}</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
}

export default Diary;
