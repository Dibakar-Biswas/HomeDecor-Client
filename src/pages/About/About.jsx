import React from "react";
import { NavLink, Outlet } from "react-router";

const About = () => {
  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-red-600 font-extrabold" : ""
          }
          to="story"
        >
          Story
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-red-600 font-extrabold" : ""
          }
          to="mission"
        >
          Mission
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-red-600 font-extrabold" : ""
          }
          to="success"
        >
          Success
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-red-600 font-extrabold" : ""
          }
          to="team"
        >
          Team & Others
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="mt-10">
      <div className="mb-16">
        <h2 className="font-extrabold text-6xl mb-5">About us</h2>
        <p className="text-[22px]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      <div>
        <ul className="flex text-2xl gap-5">{links}</ul>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default About;