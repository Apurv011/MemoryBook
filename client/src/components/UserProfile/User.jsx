import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import SingleMemory from "../Memories/SingleMemory";
import styles from "./User.module.css";
import {Link, useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function User(){

  let history = useHistory();
  const location = useLocation();

  const [followersList, setFollowersList] = useState([]);
  const [allFollowers, setAllFollowers] = useState({
    followers: []
  });
  const [followingList, setFollowingList] = useState([]);
  const [allFollowing, setAllFollowing] = useState({
    following: []
  });
  const [userFollowingList, setUserFollowingList] = useState([]);
  const [allUserFollowing, setAllUserFollowing] = useState({
    following: []
  });
  const [userInfo, setUserInfo] = useState({
    username:"",
    _id: "",
    bio: "",
    interests: "",
    image:"",
    favs:[],
    followers: [],
    following: []
  });
  const [userMemories, setUserMemories] = useState([]);
  const [uId, setUId] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const loggedInUser = localStorage.getItem("userData");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userData");

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

      axios.get(`${process.env.REACT_APP_SERVER}memory/allmemories/`, config).then(res => {
        console.log(res.data);
        setUserMemories(() => {
          return res.data.memories.filter((memory) => {
            return memory.user_id === uId;
          });
        });
      }).catch((error) => {
        console.log(error.response.status);
        history.push("/login");
      });

      axios.get(`${process.env.REACT_APP_SERVER}user/${foundUser.user._id}`, config).then(res => {
        setUserFollowingList(res.data.user.following!==null ? res.data.user.following : []);

        setAllUserFollowing((preValues) => {
          return {
            ...preValues,
            following: res.data.user.following!==null ? res.data.user.following : []
          }
        });
      })

      var bool = true;

      axios.get(`${process.env.REACT_APP_SERVER}user/${uId}`, config).then(res => {
        setFollowersList(res.data.user.followers!==null ? res.data.user.followers : []);
        setFollowingList(res.data.user.following!==null ? res.data.user.following : []);
        for (var index = 0; index < followersList.length; index++) {
          if(followersList[index]._id === foundUser.user._id) {
            setIsFollowing(true);
            bool = false;
            break;
          }
        }
        if(bool){
          setIsFollowing(false);
        }
        setAllFollowers((preValues) => {
          return {
            ...preValues,
            followers: res.data.user.followers!==null ? res.data.user.followers : []
          };
        });
        setAllFollowing((preValues) => {
          return {
            ...preValues,
            following: res.data.user.following!==null ? res.data.user.following : []
          }
        });
        setUserInfo((preValues) => {
          return {
            ...preValues,
            username: res.data.user.username,
            _id: res.data.user._id,
            bio: res.data.user.bio,
            interests: res.data.user.interests,
            favs: res.data.user.favs,
            followers: res.data.followers,
            following: res.data.following,
            image: res.data.user.image
          };
        })
      })
    }
    else{
      history.push("/login");
    }
  }, [uId, history, location.state.authorId, followersList]);

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
      formData.append("interests", userInfo.interests);
      formData.append("image", userInfo.image);

      axios.patch(`${process.env.REACT_APP_SERVER}user/${uId}`, formData, config).then(response => {
          console.log(response.data);
          axios.get(`${process.env.REACT_APP_SERVER}user/${uId}`, config).then(res => {
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

  function changeFollow(){
    const loggedInUser = localStorage.getItem("userData");

    if(isFollowing){
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };

        for (var index = 0; index < followersList.length; index++) {
          if(followersList[index]._id === foundUser.user._id) {
            followersList.splice(index, 1);
            break;
          }
        }

        setAllFollowers((preValues) => {
          return {
            ...preValues,
            followers: followersList
          };
        });

        for (var index1 = 0; index1 < userFollowingList.length; index1++) {
          if(userFollowingList[index1]._id === location.state.authorId) {
            userFollowingList.splice(index1, 1);
            break;
          }
        }

        setAllUserFollowing((preValues) => {
          return {
            ...preValues,
            following: userFollowingList
          };
        });

        axios.patch(`${process.env.REACT_APP_SERVER}user/${foundUser.user._id}`, allUserFollowing, config).then(response => {
            console.log(response.data);
            axios.get(`${process.env.REACT_APP_SERVER}user/${foundUser.user._id}`, config).then(res => {
                setUserFollowingList(res.data.user.following!==null ? res.data.user.following : []);
                setAllUserFollowing((preValues) => {
                  return {
                    ...preValues,
                    following: res.data.user.following!==null ? res.data.user.following : []
                  };
                });
                setIsFollowing(false);
            }).catch((error) => {
              history.push("/login");
            });
        });

        axios.patch(`${process.env.REACT_APP_SERVER}user/${location.state.authorId}`, allFollowers, config).then(response => {
            console.log(response.data);
            axios.get(`${process.env.REACT_APP_SERVER}user/${location.state.authorId}`, config).then(res => {
                setFollowersList(res.data.user.followers!==null ? res.data.user.followers : []);
                setAllFollowers((preValues) => {
                  return {
                    ...preValues,
                    followers: res.data.user.followers!==null ? res.data.user.followers : []
                  };
                });
                setIsFollowing(false);
            }).catch((error) => {
              history.push("/login");
            });
        });

      }
    }
    else{
      if (loggedInUser) {
        setIsFollowing(true);

        const foundUser = JSON.parse(loggedInUser);

        const config = {
          headers: { "Authorization": "Bearer " + foundUser.token }
        };
        followersList.push(foundUser.user);

        setAllFollowers((preValues) => {
          return {
            followers: followersList
          };
        });

        userFollowingList.push(userInfo);

        setAllUserFollowing((preValues) => {
          return {
            following: userFollowingList
          };
        });

        axios.patch(`${process.env.REACT_APP_SERVER}user/${foundUser.user._id}`, allUserFollowing, config).then(response => {
            console.log(response.data);
            axios.get(`${process.env.REACT_APP_SERVER}user/${foundUser.user._id}`, config).then(res => {
                setUserFollowingList(res.data.user.following!==null ? res.data.user.following : []);
                setAllUserFollowing((preValues) => {
                  return {
                    ...preValues,
                    following: res.data.user.following!==null ? res.data.user.following : []
                  };
                });
                setIsFollowing(true);
            }).catch((error) => {
              history.push("/login");
            });
        });

        axios.patch(`${process.env.REACT_APP_SERVER}user/${location.state.authorId}`, allFollowers, config).then(response => {
            console.log(response.data);
            axios.get(`${process.env.REACT_APP_SERVER}user/${location.state.authorId}`, config).then(res => {
                setFollowersList(res.data.user.followers!==null ? res.data.user.followers : []);
                setAllFollowers((preValues) => {
                  return {
                    ...preValues,
                    followers: res.data.user.followers!==null ? res.data.user.followers : []
                  };
                });
                setIsFollowing(true);
            }).catch((error) => {
              history.push("/login");
            });
        });
      }
    }
  }


  return (

    <div>
      <Header hOption3="Home" hOptionFav="Favorites" favorites={userInfo.favs} isAuthor={isAuthor}/>
      <div className="mt-5 d-flex justify-content-center">
        <div className={`${styles.userCard} p-3`}>
          <div className="d-flex">
            <div>
              <img src={userInfo.image==="" ? "https://www.watershed.co.uk/engage/wp-content/uploads/2010/08/blank-profile.jpg"
                                            : process.env.REACT_APP_SERVER + userInfo.image}
                                            alt="..." className={styles.userCardImg} />
            </div>
            <div style={{marginTop:"15px"}} className="ml-3">
              <h2>{userInfo.username}</h2>
              <p className={styles.bio}>{userInfo.bio}</p>
              <div className="d-flex justify-content-start">
                <button data-toggle="modal" data-target="#followerModal" style={{paddingLeft: "0px"}} className="btn">
                  <span><strong>Followers</strong></span>
                  <p>{followersList.length}</p>
                </button>
                <div data-toggle="modal" data-target="#followingModal" className="btn">
                  <span><strong>Following</strong></span>
                  <p>{followingList.length}</p>
                </div>
                <button onClick={changeFollow} style={isAuthor ? { visibility: "visible"} : { visibility: "hidden" }}
                        className="btn">
                  <span><strong>{isFollowing ? "Unfollow" : "Follow"}</strong></span>
                  <p>.</p>
                </button>
              </div>
              <button style={!isAuthor ? { visibility: "visible", marginTop: "16px", marginRight: "20px"} : { visibility: "hidden" }}
                      className="btn btn-outline-dark" data-toggle="modal" data-target="#exampleModalCenter">Edit</button>
              <button style={!isAuthor ? { visibility: "visible", marginTop: "16px"} : { visibility: "hidden" }}
                      className="btn btn-outline-dark" data-toggle="modal" data-target="#exampleModalCenter2">Change Profile Picture</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="followerModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Followers</h5>
            </div>
            {followersList.slice(0).reverse().map((follower, index) => {
              console.log(follower.image);
              return (
                <div className={`${styles.card} p-2`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="user d-flex flex-row align-items-center">
                      <img src={process.env.REACT_APP_SERVER + follower.image} alt="profile_img" width="30" class="user-img rounded-circle mr-2" />
                      <Link className="nav-link nav-item" style={{marginBottom:"7px", color:"#000000"}}
                        to={{pathname: '/user', state: { authorId: follower._id }}}>
                        {follower.username}
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="modal fade" id="followingModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Following</h5>
            </div>
            {userFollowingList.slice(0).reverse().map((following, index) => {
              console.log(following.image);
              return (
                <div className={`${styles.card} p-2`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="user d-flex flex-row align-items-center">
                      <img src={process.env.REACT_APP_SERVER + following.image} alt="profile_img" width="30" className={`${styles.userImg} rounded-circle mr-2`} />
                      <Link className="nav-link nav-item" style={{marginBottom:"7px", color:"#000000"}}
                        to={{pathname: '/user', state: { authorId: following._id }}}>
                        {following.username}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
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
      {userMemories.slice(0).reverse().map((memory, index) => {
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
