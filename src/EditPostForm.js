import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./EditPostForm.css";

/**
 * EditPostForm: Component that is passed handleUpdatePost to dispatch action to update single post
 *    - Parent: PostDetails
 */
function EditPostForm({ currentPost, handleUpdatePost, setShowEditForm }) {

  // ********* creating one form comp
  const INITIAL_STATE = currentPost;
  const [formData, setFormData] = useState({ ...INITIAL_STATE })
  const history = useHistory();

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  // To add a dispatch into the submission.
  const handleSubmit = evt => {
    evt.preventDefault();
    const { name } = evt.target;
    if (name === "save") {
      // our formData here already includes the postId
      handleUpdatePost(formData);
    }
    setShowEditForm(false);
    history.push(`/${currentPost.id}`);
  }

  return (
    <div className="post-form">
      <h1 className="post-form-title">Edit Post</h1>
      <form className="post-form-form">
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          onChange={handleChange}
          value={formData.title} />
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          onChange={handleChange}
          value={formData.description} />
        <label htmlFor="body">Body:</label>
        <textarea
          name="body"
          type="textarea"
          onChange={handleChange}
          value={formData.body} />
        <div className="form-buttons">
          <button name="save" onClick={handleSubmit} className="post-save-button">Save</button>
          <button name="cancel" onClick={handleSubmit} className="post-cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );

}

export default EditPostForm;