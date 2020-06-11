import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NewPostForm from "./NewPostForm";
import Home from "./Home";
import PostDetails from "./PostDetails";

/**
 * Routes: Routes component 
 */
function Routes() {
  return (
    <Switch>
      <Route exact path="/new">
        <NewPostForm />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/:postId">
        <PostDetails />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;