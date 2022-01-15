import React from "react";
// import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Logo from "../../assets/Untitled.jpg"
// import Search from "./Searchbar/SearchMovies";
import "./style.css"

function Nav() {

  // function showNavigation() {
  //   // if (Auth.loggedIn()) {
  //   //   return (
  //   //     <ul className="flex-row">
  //   //       <li className="mx-1">
  //   //         {/* this is not using the Link component to logout or user and then refresh the application to the start */}
  //   //         <a href="/" onClick={() => Auth.logout()}>
  //   //           Logout
  //   //         </a>
  //   //       </li>
  //   //     </ul>
  //   //   );
  //   // } else {
  //   //   return (
  //   //     <ul className="flex-row">
  //   //       <li className="link mx-1">
  //   //         <Link to="/login">
  //   //           Login
  //   //         </Link>
  //   //       </li>
  //   //     </ul>
  //   //   );
  //   // }
  // }


  return (
    <header className="flex-row px-1 center">
      <h1>
        <Link to="/">
          <img src={Logo} className="photo" alt='blockflix logo'/>
        </Link>
      </h1>

    </header>
  );
}

export default Nav;
