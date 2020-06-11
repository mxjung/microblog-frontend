import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import EditPostForm from "./EditPostForm";
import CommentList from "./CommentList";
import "./PostDetails.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getSinglePostFromAPI, updatePostToAPI, DeletePostToAPI, voteFromAPI } from "./actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

/**
 *  PostDetails: Component that calls state of specific post
 *    - Parent: Routes
 * */
function PostDetails() {

  const { postId } = useParams();
  const dispatch = useDispatch();

  // To add a useSelector to get specific post
  const post = useSelector(store => store.posts[postId], shallowEqual);
  const postToTitleObj = useSelector(store => store.titles[postId]);

  useEffect(
    function LoadSinglePostFromAPI() {
      // If post does not exist inside state, call API.
      if (!post) {
        dispatch(getSinglePostFromAPI(postId))
      }
    }, [dispatch]);

  // const postToDisplay = posts.filter(p => p.id === postId)[0];
  const [showEditForm, setShowEditForm] = useState(false);


  const handleClick = evt => {
    evt.preventDefault();
    setShowEditForm(true)
  }

  // To change the name of DeletePostToAPI to be lowercase at the start
  const handleDeletePost = evt => {
    dispatch(DeletePostToAPI(postId));
  }

  const handleUpdatePost = (newPostForm) => {
    dispatch(updatePostToAPI(newPostForm));
  }

  const handleVoteClick = evt => {
    evt.preventDefault();
    // voteType will be either a string of 'up' or 'down'
    const voteType = evt.target.name;
    dispatch(voteFromAPI(postId, voteType));
  }

  const renderPostDetails = () => {
    return (
      <div className="post-detail">
        <div className="post-headers">
          <div className="post-votes">
            <button name="up" onClick={handleVoteClick} className="post-vote-button">
              <FontAwesomeIcon icon={faChevronUp} style={{ 'fontSize': '20px', 'color': 'rgb(175, 175, 180)' }} />
            </button>
            <div className='post-total-votes'>{post.votes}</div>
            <button name="down" onClick={handleVoteClick} className="post-vote-button">
              <FontAwesomeIcon icon={faChevronDown} style={{ 'fontSize': '20px', 'color': 'rgb(175, 175, 180)' }} />
            </button>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-buttons">
            <button className="edit-post-btn" onClick={handleClick}>Edit</button>
            <button className="delete-post-btn" onClick={handleDeletePost}>Delete</button>
          </div>
        </div>
        <p className="post-description">{post.description}</p>
        <p className="post-body">{post.body}</p>
        <div className="comment-list">
          <CommentList postId={postId} />
        </div>
      </div>
    );
  }

  // Checks if post exists in our backend by checking for postId inside of titles
  // which already exists inside our redux state. If not, redirect to homepage.
  // This method breaks when you search for a specific post through searchbar (this
  // method depends on homepage having loaded titles into redux first)
  const renderPostState = () => {
    if (postToTitleObj) {
      return (post ? renderPostDetails() : <p>LOADING</p>)
    } else {
      return <Redirect to="/" />
    }
  }

  return (
    <div className="post-details-page">
      {showEditForm
        ? <EditPostForm currentPost={post} handleUpdatePost={handleUpdatePost} setShowEditForm={setShowEditForm} />
        : renderPostState()
      }
    </div>
  );
}

export default PostDetails;