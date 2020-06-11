import {
  ADD_POST, UPDATE_POST, DELETE_POST, LOAD_SINGLE_POST,
  LOAD_TITLES, ADD_COMMENT, DELETE_COMMENT, ADD_TITLE, UPDATE_TITLE, UPDATE_VOTE_COUNT,
} from "./actionTypes";
import produce from "immer";

/**
 * state = {posts: {postId1: {id, title, description, body, comments, votes}},...}
 *          titles: {postId1: {id, title, description},...}}
 */
const INITIAL_STATE = { posts: {}, titles: {} }

const immerRootReducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_TITLE:
        draft.titles[action.newTitle.id] = action.newTitle;
        break;

      case DELETE_POST:
        delete draft.posts[action.postId];
        // Remove title that has postId
        delete draft.titles[action.postId];
        break;

      case LOAD_TITLES:
        draft.titles = action.titles;
        break;

      case LOAD_SINGLE_POST:
        draft.posts[action.singlePost.id] = { ...action.singlePost };
        break;

      case UPDATE_TITLE:
        draft.titles[action.updatedTitle.id] = { ...action.updatedTitle };
        break;

      case UPDATE_POST:
        // get back { id, title, description, body, votes } (missing comments)
        draft.posts[action.formData.id] = { ...state.posts[action.formData.id], ...action.formData };
        break;

      case UPDATE_VOTE_COUNT:
        if (state.posts[action.postId]) {
          draft.posts[action.postId].votes = action.voteAmount;
        }
        draft.titles[action.postId].votes = action.voteAmount;
        break;

      case ADD_COMMENT:
        draft.posts[action.postId].comments.push({ ...action.formData });
        break;

      case DELETE_COMMENT:
        draft.posts[action.postId].comments =
          state.posts[action.postId].comments.filter(c => c.id !== action.commentId);
        break;

      default:
        return draft;
    }
  });

export default immerRootReducer