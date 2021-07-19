import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SingleMemory from "./SingleMemory";
import CreateArea from "../CreateArea/CreateArea";
import axios from "axios";
import {useHistory} from "react-router-dom";
import styles from "./Memories.module.css";
import { MoonLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
display: block;
margin: auto;
`;

function Memories(props) {

  let history = useHistory();
  const [allMemories, setAllMemories] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      axios.get(`${process.env.REACT_APP_SERVER}user/${foundUser.user._id}`, config).then(res => {
        setFollowing(res.data.user.following!==null ? res.data.user.following : []);
      });

      axios.get(`${process.env.REACT_APP_SERVER}memory/allmemories`, config).then(res => {
        setAllMemories(() => {
          return res.data.memories.filter((memory) => {
              for(var i=0; i<following.length; i++){
                if(following[i] === memory.user_id) return true;
              }
              return false;
          });
        });
        setLoading(false);
      }).catch((error) => {
        history.push("/login");
      });
    }
    else{
      history.push("/login");
    }
  });

  return (
    <div>
      <Header header1="Explore" uID={props.uID} hOption="My Memories" hOption2="My Diary" hOption3="My Profile"/>
      <h2 className={styles.userName}>Hello, {props.uName} </h2>
      <CreateArea userId={props.uID}
                  userName={props.uName}
                  uToken={props.uToken}
                  isImg={true} />
      <MoonLoader speedMultiplier={0.5} css={override} loading={loading} />
        {allMemories.slice(0).reverse().map((memory, index) => {
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
