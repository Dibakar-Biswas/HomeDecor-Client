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
      <div className="mb-16 p-4">
        <h2 className="font-bold text-center text-primary text-4xl mb-5">About us</h2>
        <p className="text-[22px]">
          Our journey began with a simple passion for transforming ordinary
          spaces into meaningful and memorable experiences. Over time, this
          passion grew into a dedicated decoration brand committed to
          creativity, quality, and customer satisfaction. Our mission is to
          design thoughtful, personalized decorations that elevate every
          occasion—celebrations, events, festivals, or corporate gatherings.
        </p>
      </div>
      <div>
        <ul className="flex text-2xl gap-5 p-4">{links}</ul>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default About;
