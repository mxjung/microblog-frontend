import React, { useEffect } from "react";
import PostList from "./PostList";
import { useDispatch } from "react-redux";
import { getTitlesFromAPI } from "./actions";
/**
 * Home: Home Component
 *    - Parent: Routes
 */
function Home() {
  const dispatch = useDispatch();

  // Load titles so that PostList has access to titles
  useEffect(
    function LoadTitlesFromAPI() {
      dispatch(getTitlesFromAPI());
    }, [dispatch]);

  return (
    <div>
      <PostList />
    </div>
  );
}

export default Home;