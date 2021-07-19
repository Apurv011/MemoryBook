import React from "react";
import styles from "./User.module.css";
import {Link } from 'react-router-dom';

function refreshPage(){
  window.location.reload();
}

function Card(props) {
  return (
   <div className={`${styles.card} p-2`}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="user d-flex flex-row align-items-center">
          <img src={props.img==="" ? "https://www.watershed.co.uk/engage/wp-content/uploads/2010/08/blank-profile.jpg" :
                    process.env.REACT_APP_SERVER + props.img}
                    alt="profile_img" width="30" class="user-img rounded-circle mr-2" />
          <Link className="nav-link nav-item" style={{marginBottom:"7px", color:"#000000"}}
            to={{pathname: '/user', state: { authorId: props.id }}}
            onClick={refreshPage} >
            {props.username}
          </Link>
        </div>
      </div>
    </div>
  );

}

export default Card;
