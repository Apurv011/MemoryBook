import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SingleNote from "./SingleNote";
import CreateArea from "./CreateArea";
import axios from "axios";

function Notes(props) {

  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/note/allnotes").then(res => {
      setAllNotes(res.data.notes);
    });
  });

  return (
    <div>
      <Header checkAuth={props.changeAuthStatus} hOption="My Notes"/>
      <h2 className="userName">Hello, {props.uName} </h2>
      <CreateArea className="createnote"
                  userId={props.uID}
                  userName={props.uName} />
        {allNotes.map((note, index) => {
          return (
            <SingleNote
              key={index}
              id={note._id}
              title={note.title}
              btnTitle={'Read More'}
              content={note.content}
              author={note.author_name}
              date={note.date}
              image={note.image}
            />
          );
        })}
    </div>
  );
}

export default Notes;
