import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SingleMemory from "./SingleMemory";
import axios from "axios";
import {useHistory} from "react-router-dom";
import { useLocation } from "react-router-dom";

function UserMemories(props){

  let history = useHistory();
  const location = useLocation();

  const [userMemories, setUserMemories] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };
      axios.get(`${process.env.REACT_APP_SERVER}memory/allmemories/`, config).then(res => {
        if(!location.state.isFav){
          setUserMemories(() => {
            return res.data.memories.filter((memory) => {
              return memory.user_id === props.uID;
            });
          });
        }
        else{
          setUserMemories(() => {
            return res.data.memories.filter((memory) => {
              return location.state.favs.includes(memory._id);
            });
          });
        }
      }).catch((error) => {
        console.log(error.response.status);
        history.push("/login");
    });
  }
  else{
    history.push("/login");
  }

}, [history, props.uID, userMemories, location.state.isFav, location.state.favs]);

  function deleteMemory(id) {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

    axios.delete(`${process.env.REACT_APP_SERVER}memory/memories/delete/${id}`, config).then(res => {
      console.log(res);
    });

    setUserMemories((preValues) => {
      return userMemories.filter((memory, index) => {
        return index !== id;
      });
    });
  }
}

  return (
    <div>
      <Header hOption="Home"/>
        <div className="row" style={{margin: "25px 50px"}}>
        {userMemories.slice(0).reverse().map((memory, index) => {
          return (
            <SingleMemory
              key={index}
              id={memory._id}
              onDelete={deleteMemory}
              title={memory.title}
              isFav={true}
              btnTitle={"Delete" + String(location.state.favs.length<=0)}
              content={memory.content}
              date={memory.date}
              author={memory.author_name}
              image={memory.image}
            />
          );
          })}
        </div>
    </div>
  );
}

export default UserMemories;
