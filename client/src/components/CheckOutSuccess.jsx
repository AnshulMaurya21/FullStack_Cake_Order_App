import React from "react";
import { Header } from "../components";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "../assets/icons";
import { Bill } from "../assets";

const CheckOutSuccess = () => {
  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col">
      <Header />
      <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-4 pb-24">
        <img src={Bill} className="w-full md:w-460" alt="" />
        <h1 className="text-[40px] text-headingColor font-bold">
          Amount Paid Successfully
        </h1>

        <motion.div {...buttonClick}>
          <NavLink
            to={"/"}
            className="flex items-center justify-center gap-4 cursor-pointer text-xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md"
          >
            <FaArrowLeft className="text-xl text-textColor" /> Get back to Home
          </NavLink>
        </motion.div>
      </div>
    </main>
  );
};

export default CheckOutSuccess;
