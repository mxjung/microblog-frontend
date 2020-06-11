import axios from "axios";
// Different action functions.
import {ADD_POST, UPDATE_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT, LOAD_TITLES, 
        LOAD_SINGLE_POST, SHOW_ERROR, ADD_TITLE, UPDATE_TITLE, UPDATE_VOTE_COUNT} from "./actionTypes";

const BASE_URL = "http://localhost:5000/api/posts";

export function addPost (formData) {
  return {
    type: ADD_POST,
    formData: formData
  }
}

export function updatePost (formData) {
  return {
    type: UPDATE_POST,
    formData: formData
  }
}

export function deletePost (postId) {
  return {
    type: DELETE_POST,
    postId: postId
  }
}

export function loadTitles (titleIdsToTitles) {
  return {
    type: LOAD_TITLES,
    titles: titleIdsToTitles
  }
}

export function addTitle (newTitle) {
  return {
    type : ADD_TITLE,
    newTitle: newTitle
  }
}

export function updateTitle(updatedTitle) {
  return {
    type : UPDATE_TITLE,
    updatedTitle: updatedTitle
  }
}

export function loadSinglePosts (singlePost) {
  return {
    type: LOAD_SINGLE_POST,
    singlePost: singlePost
  }
}

export function addComment (postId, formData) {
  return {
    type: ADD_COMMENT,
    postId: postId,
    formData: formData,
  }
}

export function deleteComment (postId, commentId) {
  return {
    type: DELETE_COMMENT,
    postId: postId,
    commentId: commentId
  }
}

export function voteOnPost (postId, voteAmount) {
  return {
    type: UPDATE_VOTE_COUNT,
    postId: postId,
    voteAmount: voteAmount
  }
}


export function showErr (errorSinglePost) {
  return {
    type: SHOW_ERROR,
    errorSinglePost: errorSinglePost
  }
}

// API Call made inside Home
export function getTitlesFromAPI() {
  return async function(dispatch) {
    try {
      let res = await axios.get(BASE_URL);
      // Convert the array received from the API into a nested object
      // for use within the frontend of the app.

      let titleIdsToTitles = {};
      res.data.forEach(t => titleIdsToTitles[t.id] = t);
      dispatch(loadTitles(titleIdsToTitles));
    }

    catch(err) {
      console.log("you failed api title get");
    }
  }
}

// API Call made inside PostDetails
export function getSinglePostFromAPI(id) {
  return async function(dispatch) {
    try {
      let res = await axios.get(
          `${BASE_URL}/${id}`);
      let singlePost = res.data
      dispatch(loadSinglePosts(singlePost));
    }

    catch(err) {
      let errorSinglePost = err.response.data;
      dispatch(showErr(errorSinglePost));
      console.log("you failed api posts get");
    }
  }
}

// API Call made inside NewPostForm
export function addSinglePostFromAPI(formData) {
  return async function(dispatch) {
    try {
      let res = await axios.post(BASE_URL, formData);

      // Create new object without body (title has no body)
      let newTitle = {id: res.data.id, title: res.data.title, description: res.data.description}
      dispatch(addTitle(newTitle));
    }

    catch(err) {
      console.log("you failed api post single post");
    }
  }
}

// API Call made inside PostDetails
export function updatePostToAPI(formData) {
  return async function(dispatch) {
    try {
      let res = await axios.put(
          `${BASE_URL}/${formData.id}`, formData);

      // Update title 
      const {id, title, description} = res.data;
      dispatch(updateTitle({id, title, description}));

      // Update Post
      dispatch(updatePost(res.data));
    }

    catch(err) {
      console.log("you failed api posts to Update post");
    }
  }
}

// API Call made inside PostDetails
export function DeletePostToAPI(postId) {
  return async function(dispatch) {
    try {
      let res = await axios.delete(
          `${BASE_URL}/${postId}`);

      // Delete post from posts (DELETE_POST in rootReducer will also delete postId from titles state)
      dispatch(deletePost(postId));
    }

    catch(err) {
      console.log("you failed api posts to delete post");
    }
  }
}

// API Call made inside CommentList
export function addSingleCommentFromAPI(postId, formData) {
  return async function(dispatch) {
    try {
      let res = await axios.post(
          `${BASE_URL}/${postId}/comments`, formData);

      // {id: commentId, text: some text}
      dispatch(addComment(postId, res.data));
    }

    catch(err) {
      console.log("you failed api post to add comment");
    }
  }
}

// API Call made inside CommentList
export function deleteSingleCommentFromAPI(postId, commentId) {
  return async function(dispatch) {
    try {
      let res = await axios.delete(
          `${BASE_URL}/${postId}/comments/${commentId}`);

      dispatch(deleteComment(postId, commentId));
    }

    catch(err) {
      console.log("you failed api delete a comment");
    }
  }
}

// API Call made from either PostList or PostDetails to update the vote count for a specific post by postId.
// voteType is a string of either 'up' or 'down'
export function voteFromAPI(postId, voteType) {
  return async function(dispatch) {
    try {
      let res = await axios.post(
          `${BASE_URL}/${postId}/vote/${voteType}`);
      dispatch(voteOnPost(postId, res.data.votes));
    }
    catch(err) {
      console.log("you failed api voting a post");
    }
  }
}
