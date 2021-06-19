import React from "react";

function Comment(props) {

    return (
    <div className="mt-2">
      <div className="d-flex flex-row align-items-center">
        <h5 className="mr-2">{props.commenter}</h5>
        <span class="mb-1 ml-2">{props.date}</span>
      </div>
      <div>
        <span>
          {props.comment}
        </span>
      </div>
      <hr />
    </div>
  );
}


export default Comment;
