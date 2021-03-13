import React, { useState, useEffect } from "react";
import Header from "./Header";
import SingleMemory from "./SingleMemory";
import CreateArea from "./CreateArea";
import axios from "axios";

function Memories(props) {

  const [allMemories, setAllMemories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/memory/allmemories").then(res => {
      setAllMemories(res.data.memories)
    }).catch(error => console.log(error))
  });

  return (
    <div>
      <Header checkAuth={props.changeAuthStatus} uID={props.uID} hOption="My Memories" hOption2="My Diary" hOption3="My Profile"/>
      <h2 className="userName">Hello, {props.uName} </h2>
      <CreateArea className="createnote"
                  userId={props.uID}
                  userName={props.uName}
                  isImg={true} />
        {allMemories.map((memory, index) => {
          return (
            <SingleMemory
              key={index}
              id={memory._id}
              uID={memory.user_id}
              title={memory.title}
              btnTitle={'Read More'}
              content={memory.content}
              author={memory.author_name}
              date={memory.date}
              image={memory.image}
            />
          );
        })}
    </div>
  );
}

export default Memories;
