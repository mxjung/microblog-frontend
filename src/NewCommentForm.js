import React, { useState } from "react";
import "./NewCommentForm.css";
/** 
 *  NewCommentForm: Component that takes in handleAddComment that will call action to add comment
 *   - Parent: CommentList
 * */
function NewCommentForm({ handleAddComment }) {
  const INITIAL_STATE = { text: "" }
  const [formData, setFormData] = useState({ ...INITIAL_STATE })

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    handleAddComment({ ...formData });
    setFormData({ ...INITIAL_STATE });
  }

  return (
    <div className="new-comment-block">
      <form onSubmit={handleSubmit} className="new-comment-form">
        <input
          name="text"
          placeholder="New Comment"
          onChange={handleChange}
          value={formData.text}
          className="new-comment-input" />
        <button name="add" className="new-comment-button">Add</button>
      </form>
    </div>);

}

export default NewCommentForm;