import React from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { buttonClick } from "../animations";
import { motion } from "framer-motion";

const handleButtonClick = () => {
  window.location.href = "https://www.instagram.com/anshhullll/";
};
const DBLeftSection = () => {
  return (
    <div className="h-full py-12 flex flex-col bg-slate-50 backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">BakeMeHappy</p>
      </NavLink>

      <hr />

      <ul className="flex flex-col gap-3">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/home"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/orders"}
        >
          Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/items"}
        >
          Items
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/newItem"}
        >
          Add New Item
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
              : isNotActiveStyles
          }
          to={"/dashboard/users"}
        >
          Users
        </NavLink>
      </ul>

      <div className="w-200 items-center justify-center flex h-220 mt-auto px-2">
        <div className="w-full h-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-1 px-3">
          <div className="w-8 h-8 border bg-white rounded-full flex items-center justify-center">
            <p className="text-xl font-bold text-red-500">?</p>
          </div>
          <p className="text-xl text-primary font-semibold">Help Center</p>
          <p className="text-base text-gray-300 text-center">
            Having trouble in city. Please contact us for more questions.
          </p>
          <p className="px-2 py-2 rounded-full bg-primary text-red-400 cursor-pointer">
            <motion.button {...buttonClick} onClick={handleButtonClick}>
              Get in touch
            </motion.button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
