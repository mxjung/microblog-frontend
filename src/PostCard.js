import React from "react";
import "./PostCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

/**
 *  PostCard: Presentational component that displays link to postDetails page
 *    - Parent: PostList
 * */
function PostCard({ handleVote, id, title, description, votes }) {


  const handleVoteClick = evt => {
    evt.preventDefault();
    const { name } = evt.target;
    console.log(name);
    handleVote(id, name);
  }

  return (
    <div className="postcard">
      <div className="votes">
        <button name="up" onClick={handleVoteClick} className="vote-button">
          <FontAwesomeIcon icon={faChevronUp} style={{ 'fontSize': '16px', 'color': 'rgb(175, 175, 180)' }} />
        </button>
        <div className='total-votes'>{votes}</div>
        <button name="down" onClick={handleVoteClick} className="vote-button">
          <FontAwesomeIcon icon={faChevronDown} style={{ 'fontSize': '16px', 'color': 'rgb(175, 175, 180)' }} />
        </button>
      </div>
      <div className="postcard-details">
        <Link to={`/${id}`} className="postcard-link">
          <div className="postcard-title">{title}</div>
        </Link>
        <h4 className="postcard-description"><i>{description}</i></h4>
      </div>
    </div>
  );

}

export default PostCard;