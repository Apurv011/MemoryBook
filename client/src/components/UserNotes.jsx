import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SingleNote from "./SingleNote";
import axios from "axios";

function UserNotes(props){

  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/note/allnotes").then(res => {
      setUserNotes(() => {
        return res.data.notes.filter((note) => {
          return note.user_id === props.uID;
        });
      });
    });
  });

  function deleteNote(id) {

    axios.delete("http://localhost:5000/note/notes/delete/"  + id).then(res => {
      console.log(res);
    });

  setUserNotes((preValues) => {
    return userNotes.filter((note, index) => {
      return index !== id;
    });
  });
}

  return (
    <div>
      <Header checkAuth={props.changeAuthStatus} hOption="Home"/>
        <div className="row" style={{margin: "25px 50px"}}>
        {userNotes.map((note, index) => {
          return (
            <SingleNote
              key={index}
              id={note._id}
              onDelete={deleteNote}
              title={note.title}
              btnTitle={"Delete"}
              content={note.content}
              date={note.date}
              image={note.image}
            />
          );
          })}
        </div>
      <Footer />
    </div>
  );
}

export default UserNotes;
