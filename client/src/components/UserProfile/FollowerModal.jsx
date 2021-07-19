import React, { useEffect, useState } from "react";
import styles from "./User.module.css";
import {Link } from 'react-router-dom';
import axios from "axios";

function refreshPage(){
  window.location.reload();
}

function Card(props) {

  const [userInfo, setUserInfo] = useState({
    username:"",
    id: "",
    image:""
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      axios.get(`${process.env.REACT_APP_SERVER}user/${props.id}`, config).then(res => {
        setUserInfo((preValues) => {
          return {
            ...preValues,
            username: res.data.user.username,
            id: res.data.user._id,
            image: res.data.user.image
          };
        });
      });
    }
  }, [props.id]);

  return (
   <div className={`${styles.card} p-2`}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="user d-flex flex-row align-items-center">
          <img src={userInfo.image==="" ? "https://www.watershed.co.uk/engage/wp-content/uploads/2010/08/blank-profile.jpg" :
                    process.env.REACT_APP_SERVER + userInfo.image}
                    alt="profile_img" width="30" className="user-img rounded-circle mr-2" />
          <Link className="nav-link nav-item" style={{marginBottom:"7px", color:"#000000"}}
            to={{pathname: '/user', state: { authorId: userInfo.id }}}
            onClick={refreshPage} >
            {userInfo.username}
          </Link>
        </div>
      </div>
    </div>
  );

}

export default Card;
