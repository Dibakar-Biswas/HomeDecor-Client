import React from "react";
import Logo from "../../../components/Logo/Logo";
import { FaAnchor, FaHome, FaPlus } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { MdDashboardCustomize, MdDesignServices } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { IoIosContacts } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";
import { IoLogIn, IoLogOut } from "react-icons/io5";

const Navbar = () => {

  const {user, logOut} = useAuth();

  const handleLogOut = () => {
    logOut()
    .then()
    .catch(error => {
      console.log(error);
    })
  }

    const links = (
    <>
      <li><NavLink className={({ isActive }) =>
            isActive ? "text-pink-600 font-bold" : ""
          }
          to="/" ><FaHome></FaHome>Home
        </NavLink>
        </li>
      <li><NavLink className={({ isActive }) =>
            isActive ? "text-pink-600 font-bold" : ""
          }
          to="/" ><MdDesignServices />Service
        </NavLink>
        </li>
      <li><NavLink className={({ isActive }) =>
            isActive ? "text-pink-600 font-bold" : ""
          }
          to="/about" ><FcAbout />About
        </NavLink>
        </li>
      <li><NavLink className={({ isActive }) =>
            isActive ? "text-pink-600 font-bold" : ""
          }
          to="/" ><IoIosContacts />Contact
        </NavLink>
        </li>
      <li><NavLink className={({ isActive }) =>
            isActive ? "text-pink-600 font-bold" : ""
          }
          to="/decoration-item" ><IoIosContacts />Decoration Item
        </NavLink>
        </li>
      <li><NavLink className={({ isActive }) =>
            isActive ? "text-pink-600 font-bold" : ""
          }
          to="/decorator" ><IoIosContacts />Decorator
        </NavLink>
        </li>
      {user && <li><NavLink className={({ isActive }) =>
            isActive ? "text-pink-600 font-bold" : ""
          }
          to="/dashboard" ><MdDashboardCustomize />Dashboard
        </NavLink>
        </li>}
      
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost text-xl">
            <Logo></Logo>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {/* {
          user ? <a onClick={handleLogOut} className="btn">Log Out</a>
          : <Link className="btn" to='/login'>Login</Link>
        } */}
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  src={user.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>

              <li className="mt-1">
                <Link to={"/profile"}>
                  <FaAnchor /> Profile
                </Link>
              </li>

              
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-xs text-left bg-linear-to-r from-pink-500 to-red-500 text-white"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn rounded-full border-gray-300  btn-sm bg-linear-to-r from-pink-500 to-red-500 text-white"
          >
            {" "}
            <IoLogIn /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
