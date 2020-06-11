import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBox.css";

/** Renders a navbox with links to the home page and to the new post form.
 *   - Parent: App
 * */
function NavBox() {

  return (
    <nav className="navbox">
      <div className="nav-details">
        <h1 className="nav-title">Microblog</h1>
        <h4 className="nav-tagline">Get into the Rithm of blogging!</h4>
        <div className="links">
          <NavLink exact to="/" className="link">Blog</NavLink>
          <NavLink exact to="/new" className="link">Add a new post</NavLink>
        </div>
      </div>
    </nav>);

}

export default NavBox;