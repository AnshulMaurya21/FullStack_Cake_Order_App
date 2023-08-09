import React from "react";
import { motion } from "framer-motion";
import { Delivery, HeroBg } from "../assets";
import { buttonClick, staggerFadeInOut } from "../animations";
import { randomData } from "../utils/styles";

const handleButtonClick = () => {
  window.location.href = "http://localhost:3000/dashboard/orders";
}
const Home = () => {
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-start justify-start gap-6">
        <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full">
          <p className="text-lg font-semibold text-orange-500">Free Delivery</p>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
            <img
              src={Delivery}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className=" text-[30px] text-headingColor md:text-[52px] font-sans font-extrabold tracking-wider">
          World's Best Bakery in{" "}
          <span className=" text-orange-600">Your City</span>
        </p>
        <p className="text-textColor text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          mollitia doloremque! Consequuntur excepturi illo architecto quibusdam,
          rem distinctio cupiditate fuga! Molestiae repudiandae nam omnis
          accusamus dolor et rerum minima odio consectetur illum, fugiat id est
          dolore facilis laborum, aliquam earum?
        </p>
        <motion.button
          {...buttonClick}
          className=" bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold"
          onClick={handleButtonClick}
        >
          Order Now
        </motion.button>
      </div>
      <div className="py-5 flex-1 flex items-center justify-end relative">
        <img
          className="absolute top-0 right-0 md:right-2 w-full h-420 md:w-full md:h-full"
          src={HeroBg}
          alt=""
        />

        <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-9">
          {randomData &&
            randomData.map((data, i) => (
              <motion.div
                key={i}
                {...staggerFadeInOut(i)}
                className=" w-32 h-36 md:h-auto md:w-150 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={data.imageURL}
                  className=" w-12 h-12 md:w-40 md:h-20 md:mt-4 object-contain"
                  alt=""
                />
                <p className="text-sm lg:text-lg font-semibold text-textColor text-center">
                  {data.product_name.slice(0, 14)}
                </p>

                <p className="text-[12px] text-center md:text-base text-lighttextGray font-semibold capitalize">
                  {data.product_category}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span>{" "}
                  {data.product_price}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
