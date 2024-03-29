import React, { useState } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
// import CategoryMenu from "../CategoryMenu/index";



//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList} from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { AiFillFire } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css"


  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="link mx-1">
            <Link to="/login">
              Login/Signup
            </Link>
          </li>
        </ul>
      );
    }
  }

const SideBar = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar>
          <SidebarHeader>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )} */}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}><a href="/"></a>Home</MenuItem>
              <MenuItem icon={<AiFillFire />}><Link to="/Search"></Link>Movie Sale</MenuItem>
              <MenuItem icon={<FaList />}><Link to="/orderHistory"></Link>Order History</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              {/* <MenuItem icon={<BsPencilSquare />}><Link to="/signup"></Link>Signup</MenuItem> */}
              <MenuItem icon={<FiLogOut />}>{showNavigation()} </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBar;