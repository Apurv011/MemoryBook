import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import CreateArea from "../CreateArea/CreateArea";
import SingleDay from "./SingleDay";
import axios from "axios";
import {useHistory} from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
display: block;
margin: auto;
`;

function Diary(props){

  let history = useHistory();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  const [userDays, setUserDays] = useState([]);

  useEffect(() => {

    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      axios.get(`${process.env.REACT_APP_SERVER}diary/alldays`, config).then(res => {
        setUserDays(() => {
          return res.data.days.filter((day) => {
            return day.user_id === props.uID;
          });
        });
        setLoading(false);
      }).catch((error) => {
        console.log(error.response.status);
        history.push("/login");
      });
    }
    else{
      history.push("/login");
    }
  });

  function deleteDay(id){
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      axios.delete(`${process.env.REACT_APP_SERVER}diary/day/delete/${id}`, config).then(res => {
        console.log(res);
      });

    setUserDays((preValues) => {
      return userDays.filter((day, index) => {
        return index !== id;
      });
    });
  }
}

function getData(id){

  const loggedInUser = localStorage.getItem("userData");
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);

    const config = {
      headers: { "Authorization": "Bearer " + foundUser.token }
    };

    axios.get(`${process.env.REACT_APP_SERVER}diary/${id}`, config).then(res => {
          setTitle(res.data.title);
          setContent(res.data.content);
          setDate(res.data.date);
      });
  }
}

  return (
    <div>
      <Header header1="Explore" hOption3="Home"/>
      <CreateArea userId={props.uID}
                  userName={props.uName}
                  uToken={props.uToken}
                  isImg={false} />
      <MoonLoader speedMultiplier={0.5} css={override} loading={loading} />
        <div className="row" style={{margin: "25px 50px"}}>
        {userDays.slice(0).reverse().map((day, index) => {
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
    </div>
  );
}

export default Diary;
