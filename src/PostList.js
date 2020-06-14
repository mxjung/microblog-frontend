import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import "./PostList.css";
import { voteFromAPI } from "./actions";

/**
 *  PostList: Component that calls state of all titles
 *    - Parent: Home
 * */
function PostList() {
  const titles = useSelector(store => Object.values(store.titles), shallowEqual);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const handleVote = (postId, voteType) => {
    dispatch(voteFromAPI(postId, voteType));
  }

  // When we have received titles back from the redux store,
  // update isLoading to be false
  useEffect(() => {
    if (titles[0] !== null) {
      setIsLoading(loading => false);
    }
  }, [titles]);

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
      {isLoading ? (
        <div className="loading-spinner">
          <div className="loader"></div>
        </div>
        ) : (
          <div className="posts">
            {titles.length > 0 ? renderTitleListHTML() : <p>No Posts</p>}
          </div>
        )}
    </div>
  )
}

export default PostList;
