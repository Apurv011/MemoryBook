import React, { useState } from "react";
import axios from "axios";

function CreateArea(props) {

  const [isExpanded, setIsExpanded] = useState(false);

  const [notes, setNotes] = useState({
    title: "",
    content: "",
    user_id: "",
    author_name:"",
    date:"",
    image:""
  });

  const [imgName, setImgName] = useState("");

  function getDate(){
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  date = date + "-" + month + "-" + year;
  return date;
}

  function sumbitNote(event) {

    const formData = new FormData();

    formData.append("title", notes.title);
    formData.append("content", notes.content);
    formData.append("user_id", notes.user_id);
    formData.append("date", notes.date);
    formData.append("author_name", notes.author_name);
    formData.append("image", notes.image);

    axios.post("http://localhost:5000/note/createnote", formData).then(response => {
        console.log(response.data);
    });

    setNotes({
      title: "",
      content: "",
      user_id:"",
      author_name:"",
      date:""
    });

    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNotes((preValues) => {
      return {
        ...preValues,
        [name]: value,
        user_id: props.userId,
        author_name: props.userName,
        date: getDate()
      };
    });
  }

  function upload(event){

    setImgName(event.target.files[0]);

    const { name, value } = event.target;
    setNotes((preValues) => {
      return {
        ...preValues,
        [name]: value,
        user_id: props.userId,
        author_name: props.userName,
        date: getDate(),
        image: event.target.files[0]
      };
    });
  }

  function expand(){
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="createArea col-md-7 col-sm-12">
        {isExpanded &&
          (
            <input
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={notes.title} />
          )
        }
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={notes.content}
          placeholder="Take a note..."
          rows={isExpanded===true ? 3 : 1}
        />
        {isExpanded &&
          (
            <input type="file" multiple name="image" onChange={upload} />
          )
        }
        <button className="create-note-btn" onClick={sumbitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
