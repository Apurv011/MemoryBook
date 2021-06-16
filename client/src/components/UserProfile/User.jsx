import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import SingleMemory from "../Memories/SingleMemory";
import styles from "./User.module.css";
import {useHistory} from "react-router-dom";

function User(props){

  let history = useHistory();

  const location = useLocation();
  let pathName = location.pathname;
  const uId = pathName.substr(6);

  const [userInfo, setUserInfo] = useState({
    username:"",
    bio: "",
    interests: "",
    image:""
  });
  const [userMemories, setUserMemories] = useState([]);

  const config = {
    headers: { "Authorization": "Bearer " + props.uToken }
  };
  useEffect(() => {

    const config = {
      headers: { "Authorization": "Bearer " + props.uToken }
    };

    axios.get("http://localhost:5000/user/" + uId, config).then(res => {
          console.log(res.data.user);
          setUserInfo((preValues) => {
            return {
              ...preValues,
              username: res.data.user.username,
              bio: res.data.user.bio,
              interests: res.data.user.interests,
              image: res.data.user.image
            };
          })
        })
      });

    axios.get("http://localhost:5000/memory/allmemories", config).then(res => {
      console.log(res.data);
      setUserMemories(() => {
        return res.data.memories.filter((memory) => {
          return memory.user_id === uId;
        });
      });
    }).catch((error) => {
      console.log(error.response.status);
      history.push("/login");

  }, [uId, props.uToken]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserInfo((preValues) => {
      return {
        ...preValues,
        [name]: value
      };
    });
    console.log(userInfo.bio);
  }

  function update(){

      const formData = new FormData();

      console.log(userInfo.bio);
      formData.append("username", userInfo.username);
      formData.append("bio", userInfo.bio);
      formData.append("interests", userInfo.interests);
      formData.append("image", userInfo.image);

      axios.patch("http://localhost:5000/user/" + uId, formData, config).then(response => {
          console.log(response.data);
          axios.get("http://localhost:5000/user/" + uId, config).then(res => {
                console.log(res.data.user);
                setUserInfo((preValues) => {
                  return {
                    username: res.data.user.username,
                    bio: res.data.user.bio,
                    interests: res.data.user.interests,
                    image: res.data.user.image
                  };
                });
            });
      });
  }

  function upload(event){
    console.log(userInfo.bio);
    setUserInfo((preValues) => {
      return {
        ...preValues,
        image: event.target.files[0]
      };
    });

  }

  function removePic(){
    setUserInfo((preValues) => {
      return {
        ...preValues,
        image: ""
      };
    });
  }

  return (

    <div>
      <Header checkAuth={props.changeAuthStatus} hOption="Home"/>
      <div className="mt-5 d-flex justify-content-center">
        <div className={`${styles.userCard} p-3`}>
          <div className="d-flex">
            <div>
              <img src={userInfo.image==="" ? "https://www.watershed.co.uk/engage/wp-content/uploads/2010/08/blank-profile.jpg"
                                            : "http://localhost:5000/" + userInfo.image}
                                            alt="..." className={styles.userCardImg} />
            </div>
            <div style={{marginTop:"15px"}} className="ml-3">
              <h2>{userInfo.username}</h2>
              <p className={styles.bio}>{userInfo.bio}</p>
              <h6>Interests</h6>
              <p>{userInfo.interests}</p>
              <button style={props.uID===uId ? { visibility: "visible", marginTop: "16px", marginRight: "20px"} : { visibility: "hidden" }}
                      className="btn btn-outline-dark" data-toggle="modal" data-target="#exampleModalCenter">Edit</button>
              <button style={props.uID===uId ? { visibility: "visible", marginTop: "16px"} : { visibility: "hidden" }}
                      className="btn btn-outline-dark" data-toggle="modal" data-target="#exampleModalCenter2">Change Profile Picture</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModalCenter" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Your Profile</h5>
            </div>
            <div className="modal-body">
              <label><b>Interests</b></label>
              <input onChange={handleChange} name="interests" value={userInfo.interests} className="form-control"/>
            </div>
            <div className="modal-body">
              <label><b>Add Bio</b></label>
              <textarea onChange={handleChange} name="bio" value={userInfo.bio} className="form-control" rows="2"/>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={update} className="btn btn-outline-dark" data-dismiss="modal">Done</button>
              <button type="button" className="btn btn-outline-dark" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModalCenter2" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Your Profile Picture</h5>
            </div>
            <div className="modal-body">
              <label style={{marginLeft:"7px"}}><b>Upload Profile Picture</b></label>
              <input type="file" multiple name="image" onChange={upload} />
            </div>
            <div className="modal-body">
              <button type="button" onClick={removePic} className="btn btn-outline-dark">Remove Profile Picture</button>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={update} className="btn btn-outline-dark" data-dismiss="modal">Done</button>
              <button type="button" className="btn btn-outline-dark" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{marginTop:"50px"}}>
      {userMemories.map((memory, index) => {
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
    </div>

  );
}

export default User;