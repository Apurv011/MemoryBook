import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SingleMemory from "./SingleMemory";
import CreateArea from "./CreateArea";
import axios from "axios";

function Memories(props) {

  const [allMemories, setAllMemories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/memory/allmemories").then(res => {
      setAllMemories(res.data.memories);
    });
  });

  return (
    <div>
      <Header checkAuth={props.changeAuthStatus} hOption="My Memories"/>
      <h2 className="userName">Hello, {props.uName} </h2>
      <CreateArea className="createnote"
                  userId={props.uID}
                  userName={props.uName} />
        {allMemories.map((memory, index) => {
          return (
            <SingleMemory
              key={index}
              id={memory._id}
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
