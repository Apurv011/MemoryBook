import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import styles from "./User.module.css";
import {useHistory} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { MoonLoader } from "react-spinners";

const override = css`
display: block;
margin: 50px auto;
`;

function EditProfile(){

  let history = useHistory();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({
    username:"",
    bio: "",
    image:"",
    favs:[]
  });
  const [uId, setUId] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(true);

  const loggedInUser = localStorage.getItem("userData");

  function sleep(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");
    async function fetchData(){
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };

        if(location.state.authorId === foundUser.user._id){
          setUId(foundUser.user._id);
          setIsAuthor(false);
        }
        else{
          setUId(location.state.authorId);
          setIsAuthor(true);
        }

        axios.get(`${process.env.REACT_APP_SERVER}user/${uId}`, config).then(res => {
          console.log(res.data.user);
          setUserInfo((preValues) => {
            return {
              ...preValues,
              username: res.data.user.username,
              bio: res.data.user.bio,
              favs: res.data.user.favs,
              image: res.data.user.image
            };
          });
        });
        await sleep(1500);
        setLoading(false);
      }
      else{
        history.push("/login");
      }
    }
    fetchData();
  }, [uId, history, location.state.authorId]);

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

    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);

      const config = {
        headers: { "Authorization": "Bearer " + foundUser.token }
      };

      const formData = new FormData();

      console.log(userInfo.bio);
      formData.append("username", userInfo.username);
      formData.append("bio", userInfo.bio);
      formData.append("image", userInfo.image);

      axios.patch(`${process.env.REACT_APP_SERVER}user/${uId}`, formData, config).then(response => {
          console.log(response.data);
          axios.get(`${process.env.REACT_APP_SERVER}user/${uId}`, config).then(res => {
                console.log(res.data.user);
                setUserInfo((preValues) => {
                  return {
                    username: res.data.user.username,
                    bio: res.data.user.bio,
                    image: res.data.user.image
                  };
                });
            });
      });
    }
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
      <Header header1="Explore" hOption3="Home" hOptionFav="Favorites" favorites={userInfo.favs} isAuthor={isAuthor}/>
      <MoonLoader speedMultiplier={0.5} css={override} loading={loading} />
      {!loading &&
        (
          <div className="mt-5 d-flex justify-content-center">
            <div style={{marginBottom:"30px"}} className={`${styles.userCard} p-3`}>
              <div className="d-flex justify-content-center">
                <img src={userInfo.image==="" ? "https://www.watershed.co.uk/engage/wp-content/uploads/2010/08/blank-profile.jpg"
                                            : process.env.REACT_APP_SERVER + userInfo.image}
                                            alt="..." width="380" className="rounded-circle mr-2" />
              </div>
              <div style={{marginTop:"15px", textAlign:"center"}} className="ml-3">
                <h2>{userInfo.username}</h2>
                <p className={styles.bio}>{userInfo.bio}</p>
              </div>
              <div className="d-flex justify-content-between">
                <button style={!isAuthor ? { visibility: "visible", marginTop: "16px", marginRight: "20px"} : { visibility: "hidden" }}
                    className="btn btn-dark" data-toggle="modal" data-target="#exampleModalCenter">Edit My Bio</button>
                <button style={!isAuthor ? { visibility: "visible", marginTop: "16px"} : { visibility: "hidden" }}
                    className="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter2">Change Profile Picture</button>
              </div>
            </div>
          </div>
        )
      }
      <div className="modal fade" id="exampleModalCenter" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Your Profile</h5>
            </div>
            <div className="modal-body">
              <label><b>Add Bio</b></label>
              <textarea maxlength="50" onChange={handleChange} name="bio" value={userInfo.bio} className="form-control" rows="2"/>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={update} className="btn btn-outline-success" data-dismiss="modal">Done</button>
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
              <button type="button" onClick={removePic} className="btn btn-danger">Remove Profile Picture</button>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={update} className="btn btn-outline-success d-flex" data-dismiss="modal">Done</button>
              <button type="button" className="btn btn-outline-dark" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default EditProfile;
