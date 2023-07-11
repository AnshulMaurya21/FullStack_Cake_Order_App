import React from "react";

const Spinner = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full animate-spin border-x-4 border-solid border-red-400 border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
