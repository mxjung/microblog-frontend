import {
  ADD_POST, UPDATE_POST, DELETE_POST, LOAD_SINGLE_POST,
  LOAD_TITLES, ADD_COMMENT, DELETE_COMMENT, ADD_TITLE, UPDATE_TITLE, UPDATE_VOTE_COUNT,
} from "./actionTypes";

/**
 * state = {posts: {postId1: {id, title, description, body, comments, votes}},...}
 *          titles: {postId1: {id, title, description},...}}
 */
const INITIAL_STATE = { posts: {}, titles: {} }

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: { ...state.posts, [action.formData.id]: { ...action.formData } }
      }

    case DELETE_POST:
      const postsCopy = { ...state.posts };
      const titlesCopy = { ...state.titles };

      delete postsCopy[action.postId];
      // Remove title that has postId
      delete titlesCopy[action.postId];

      return {
        ...state,
        posts: postsCopy,
        titles: titlesCopy
      }

    case LOAD_TITLES:
      return {
        ...state,
        titles: { ...action.titles }
      }

    case LOAD_SINGLE_POST:
      return {
        ...state,
        posts: { ...state.posts, [action.singlePost.id]: { ...action.singlePost } }
      }

    case ADD_TITLE:
      return {
        ...state,
        titles: { ...state.titles, [action.newTitle.id]: { ...action.newTitle } }
      }

    case UPDATE_TITLE:
      return {
        ...state,
        titles: { ...state.titles, [action.updatedTitle.id]: { ...action.updatedTitle } }
      }

    case UPDATE_VOTE_COUNT:

      let copyPostsforVotes = {...state.posts}
      // Check to see whether the post being voted on is already in redux posts state, if so need to update the post's votes attribute
      // as well as the title's votes attribute below.
      if (state.posts[action.postId]) {
        copyPostsforVotes = {...state.posts, [action.postId]: {...state.posts[action.postId], votes: action.voteAmount}}
      }
      return {
        ...state,
        titles: {...state.titles, [action.postId]: {...state.titles[action.postId], votes: action.voteAmount}},
        posts: {...copyPostsforVotes}
      }  
  

    case UPDATE_POST:
      // get back { id, title, description, body, votes } (missing comments)
      
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.formData.id]: {
            comments: [...state.posts[action.formData.id].comments],
            ...action.formData
          }
        }
      }

    // ******* look at combining reducers in further studies
    // ******* formData - give more specific name 
    case ADD_COMMENT:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.postId]: {
            ...state.posts[action.postId],
            comments: [...state.posts[action.postId].comments, { ...action.formData }]
          }
        }
      }

    case DELETE_COMMENT:
      const postsForPostCopy = {
        ...state.posts,
        [action.postId]: {
          ...state.posts[action.postId],
          comments: state.posts[action.postId].comments.filter(c => c.id !== action.commentId)
        }
      };
      return {
        ...state,
        posts: postsForPostCopy
      }

    default:
      return state;
  }
}

export default rootReducer;