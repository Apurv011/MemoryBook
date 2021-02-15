import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SingleMemory from "./SingleMemory";
import axios from "axios";

function UserMemories(props){

  const [userMemories, setUserMemories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/memory/allmemories").then(res => {
      setUserMemories(() => {
        return res.data.memories.filter((memory) => {
          return memory.user_id === props.uID;
        });
      });
    });
  });

  function deleteMemory(id) {

    axios.delete("http://localhost:5000/memory/memories/delete/"  + id).then(res => {
      console.log(res);
    });

  setUserMemories((preValues) => {
    return userMemories.filter((memory, index) => {
      return index !== id;
    });
  });
}

  return (
    <div>
      <Header checkAuth={props.changeAuthStatus} hOption="Home"/>
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
      <Footer />
    </div>
  );
}

export default UserMemories;
