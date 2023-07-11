import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";

const LoginInput = ({
  placeholder,
  icon,
  inputState,
  inputStateFunc,
  type,
  isSignUp,
}) => {
  const [isFocus, setisFocus] = useState(false);
  return (
    <motion.div
     {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-white opacity-50 backdrop-blur-md rounded-md w-full px-4 py-2 ${
        isFocus ? "shadow-md shadow-red-400" : "shadow-none"
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setisFocus(true)}
        onBlur={() => setisFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
