import React, { useState, useEffect } from "react";
import Slide from 'react-reveal/Slide';
import styles from "./SingleMemory.module.css";
import {Link, useHistory } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from "axios";

function SingleMemory(props) {

  let history = useHistory();
  let author = props.author;

  const [isFav, setIsFav] = useState(false);
  const [list, setList] = useState([]);
  const [allFavs, setAllFavs] = useState({
    favs: []
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      axios.get("http://localhost:5000/user/" + foundUser.user._id, config).then(res => {
        setList(res.data.user.favs!==null ? res.data.user.favs : []);
        if(list.includes(props.id)){
          setIsFav(true);
        }
        else{
          setIsFav(false);
        }
        setAllFavs((preValues) => {
          return {
            ...preValues,
            favs: res.data.user.favs!==null ? res.data.user.favs : []
          };
        });
      })
    }
    else{
      history.push("/login");
    }
  }, [history, list, props.id]);

  function deleteMemory() {
    props.onDelete(props.id);
  }

  function changeLike(){
    const loggedInUser = localStorage.getItem("userData");

    if(isFav){
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };
        const index = list.indexOf(props.id);
        if (index > -1) {
          list.splice(index, 1);
        }
        console.log("List " + list.length);

        setAllFavs((preValues) => {
          return {
            ...preValues,
            favs: list
          };
        });

        axios.patch("http://localhost:5000/user/" + foundUser.user._id, allFavs, config).then(response => {
            console.log(response.data);
            axios.get("http://localhost:5000/user/" + foundUser.user._id, config).then(res => {
                setList(res.data.user.favs!==null ? res.data.user.favs : []);
                setAllFavs((preValues) => {
                  return {
                    ...preValues,
                    favs: res.data.user.favs!==null ? res.data.user.favs : []
                  };
                });
                setIsFav(false);
            }).catch((error) => {
              history.push("/login");
            });
        });
      }
    }
    else{
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };
        list.push(props.id);

        setAllFavs((preValues) => {
          return {
            ...preValues,
            favs: list
          };
        });

        axios.patch("http://localhost:5000/user/" + foundUser.user._id, allFavs, config).then(response => {
            console.log(response.data);
            axios.get("http://localhost:5000/user/" + foundUser.user._id, config).then(res => {
                setList(res.data.user.favs!==null ? res.data.user.favs : []);
                setAllFavs((preValues) => {
                  return {
                    ...preValues,
                    favs: res.data.user.favs!==null ? res.data.user.favs : []
                  };
                });
                setIsFav(!isFav);
            }).catch((error) => {
              history.push("/login");
            });
        });
      }
    }
  }

  function getCompleteMemory(){
    history.push({
          pathname: '/fullMemory',
          state: { memoryId: props.id }
      });
  }

  return (
      <div>
        <Slide left>
        <div className={styles.singleCard}>
            <img src={"http://localhost:5000/" + props.image} className={styles.cardImg} alt="..."/>
            <h5 style={{margin: "7px"}}>{props.title}</h5>
            <Link className="nav-link nav-item" style={{marginBottom:"7px", color:"#000000"}} to={"/user/"+ props.uID}>{props.btnTitle==="Delete" ? "" : "Author: " + author }</Link>
            <button className="btn btn-outline-dark" style={{marginLeft: "5px"}} onClick={getCompleteMemory}>Read More</button>
            {props.btnTitle!=="Delete" &&
              (isFav ?
                <FavoriteIcon fontSize="large" className={`${styles.likeBtn}`} onClick={changeLike} /> :
                <FavoriteBorderIcon fontSize="large" className={`${styles.likeBtn}`} onClick={changeLike} />
              )
            }
            <button style={props.btnTitle==="Delete" ? { visibility: "visible", margin: "16px"} : { visibility: "hidden" }} className="btn btn-outline-dark" onClick={deleteMemory}>{props.btnTitle}</button>
        </div>
        </Slide>
      </div>
  );
}


export default SingleMemory;
