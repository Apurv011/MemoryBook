import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SingleMemory from "./SingleMemory";
import CreateArea from "../CreateArea/CreateArea";
import axios from "axios";
import {useHistory} from "react-router-dom";
import styles from "./Memories.module.css";

function Memories(props) {

  let history = useHistory();

  const [allMemories, setAllMemories] = useState([]);

  useEffect(() => {

    const config = {
      headers: { "Authorization": "Bearer " + props.uToken }
    };

    axios.get("http://localhost:5000/memory/allmemories", config).then(res => {
      setAllMemories(res.data.memories)
    }).catch((error) => {
      console.log(error.response.status);
      history.push("/login");
    });
  });

  return (
    <div>
      <Header checkAuth={props.changeAuthStatus} uID={props.uID} hOption="My Memories" hOption2="My Diary" hOption3="My Profile"/>
      <h2 className={styles.userName}>Hello, {props.uName} </h2>
      <CreateArea userId={props.uID}
                  userName={props.uName}
                  uToken={props.uToken}
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
