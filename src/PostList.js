import React from "react";
import PostCard from "./PostCard";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import "./PostList.css";
import { voteFromAPI } from "./actions";

/** 
 *  PostList: Component that calls state of all titles
 *    - Parent: Home
 * */
function PostList() {
  const titles = useSelector(store => Object.values(store.titles), shallowEqual) 
  const dispatch = useDispatch();

  const handleVote = (postId, voteType) => {
    dispatch(voteFromAPI(postId, voteType));
  }

  const renderTitleListHTML = () => {
    return titles
      .sort((a, b) => b.votes - a.votes)
      .map(p => (
        <PostCard
          handleVote={handleVote}
          key={p.id}
          id={p.id}
          title={p.title}
          description={p.description}
          votes={p.votes} />
      ))
  }

  return (
    <div className="posts-list">
      <div className="posts-tagline">
        Welcome to <strong>Microblog</strong>, our innovative site for communicating on the information superhighway
      </div>
      <div className="posts">
        {titles.length > 0 ? renderTitleListHTML() : <p>No Posts</p>}
      </div>
    </div>
  );

}

export default PostList;
