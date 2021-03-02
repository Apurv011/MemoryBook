import React, { useState } from "react";
import axios from "axios";

function CreateArea(props) {

  const [isExpanded, setIsExpanded] = useState(false);

  const [memories, setMemories] = useState({
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

  function sumbitMemory(event) {

    const formData = new FormData();

    formData.append("title", memories.title);
    formData.append("content", memories.content);
    formData.append("user_id", memories.user_id);
    formData.append("date", memories.date);
    formData.append("author_name", memories.author_name);
    formData.append("image", memories.image);

    axios.post("http://localhost:5000/memory/creatememory", formData).then(response => {
        console.log(response.data);
    });

    setMemories({
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
    setMemories((preValues) => {
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
    setMemories((preValues) => {
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
            value={memories.title} />
          )
        }
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={memories.content}
          placeholder="Write here..."
          rows={isExpanded===true ? 6 : 1}
        />
        {isExpanded &&
          (
            <input type="file" multiple name="image" onChange={upload} />
          )
        }
        <button className="create-note-btn" onClick={sumbitMemory}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
