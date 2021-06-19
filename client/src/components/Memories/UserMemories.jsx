import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SingleMemory from "./SingleMemory";
import axios from "axios";
import {useHistory} from "react-router-dom";

function UserMemories(props){

  let history = useHistory();

  const [userMemories, setUserMemories] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      axios.get("http://localhost:5000/memory/allmemories", config).then(res => {
        setUserMemories(() => {
          return res.data.memories.filter((memory) => {
            return memory.user_id === props.uID;
          });
        });
      }).catch((error) => {
        console.log(error.response.status);
        history.push("/login");
    });
  }
  else{
    history.push("/login");
  }
});

  function deleteMemory(id) {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

    axios.delete("http://localhost:5000/memory/memories/delete/"  + id, config).then(res => {
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
        {userMemories.map((memory, index) => {
          return (
            <SingleMemory
              key={index}
              id={memory._id}
              onDelete={deleteMemory}
              title={memory.title}
              btnTitle={"Delete"}
              content={memory.content}
              date={memory.date}
              image={memory.image}
            />
          );
          })}
        </div>
    </div>
  );
}

export default UserMemories;
