import React from "react";
import "./CommentCard.css";

/**
 * CommentCard: Presentational component that is passed a handleDelete function
 * to dispatch a delete comment action
 *    - Parent: CommentList
 */
function CommentCard({id, text, handleDeleteComment}) {
  const handleDelete = evt => {
    handleDeleteComment(id);
  }
  return (
  <div className="comment-card">
    <p className="comment-text">{text}</p>
    <button onClick={handleDelete} className="comment-delete-button">X</button>
  </div>);
}

export default CommentCard;