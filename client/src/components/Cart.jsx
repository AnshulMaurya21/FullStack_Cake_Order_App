import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { buttonClick, slideIn, staggerFadeInOut } from "../animations";
import { setCartOff } from "../context/actions/displayCartAction";
import {
  BiChevronsRight,
  FcClearFilters,
  HiCurrencyRupee,
} from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { baseURL, getAllCartItems, increaseItemQuantity } from "../api";
import { setCartItems } from "../context/actions/cartAction";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import axios from "axios";
import { EmptyCart } from "../assets";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.map((data) => {
        tot = tot + data.product_price * data.quantity;
        setTotal(tot);
      });
    }
  }, [cart]);

  const handleCheckOut = () => {
    const data = {
      user: user,
      cart: cart,
      total: total,
    };
    axios
      .post(`${baseURL}/api/products/create-checkout-session`, { data })
      .then((res) => {
        if (res.data) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-300 md:w-508 bg-cardOverlay backdrop-blur-md shadow-md h-screen"
    >
      <div className="w-full flex items-center justify-between py-4 pb-4 px-6">
        <motion.i
          {...buttonClick}
          className=" cursor-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <BiChevronsRight className="text-[50px] text-textColor" />
        </motion.i>
        <p className="text-2xl text-headingColor font-semibold">Your Cart</p>
        <motion.i {...buttonClick} className="cursor-pointer">
          <FcClearFilters className="text-[30px] text-textColor" />
        </motion.i>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-zinc-900 h-full py-6 gap-3 relative">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start h-[65%] overflow-y-scroll scrollbar-none px-4">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>
            <div className=" bg-zinc-800 rounded-[60px] w-full h-[45%] flex flex-col items-center px-4 py-12 gap-9">
              <div className=" w-full flex items-center justify-evenly">
                <p className="text-3xl text-zinc-500 font-semibold">Total</p>
                <p className="text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1">
                  <HiCurrencyRupee className="text-primary" />

                  {total}
                </p>
              </div>
              <motion.button
                {...buttonClick}
                className="bg-orange-400 w-[70%] px-3 py-3 text-xl text-headingColor font-semibold hover:bg-orange-500 drop-shadow-md rounded-2xl"
                onClick={handleCheckOut}
              >
                Check Out
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <img src={EmptyCart} className="flex items-center justify-center w-auto h-auto px-4 py-2" alt="" />
            <h1 className="text-base text-primary font-bold px-8 md:px-32">Add some items to your cart !!</h1>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [itemTotal, setitemTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cart item"));
    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };
  const incrementCart = (productId) => {
    dispatch(alertSuccess("Updated the cart item"));
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNULL());
      });
    });
  };

  useEffect(() => {
    setitemTotal(data.product_price * data.quantity);
  }, [itemTotal, cart]);
  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      className="w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md gap-4 px-4"
    >
      <img
        src={data?.imageURL}
        className="w-24 min-w-[94px] h-24 object-contain"
        alt=""
      />

      <div className="flex items-center justify-start gap-1 w-full">
        <p className=" text-base text-primary font-semibold">
          {data?.product_name}{" "}
          <span className="text-sm block capitalize text-gray-400">
            {data?.product_category}
          </span>
        </p>
        <p className="text-sm flex items-center justify-center gap-1 font-semibold text-red-400 ml-auto">
          <HiCurrencyRupee className="text-red-400" /> {itemTotal}
        </p>
      </div>

      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClick}
          onClick={() => decrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-xl font-semibold text-primary">--</p>
        </motion.div>
        <p className="text-lg text-primary font-semibold">{data?.quantity}</p>

        <motion.div
          {...buttonClick}
          onClick={() => incrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-xl font-semibold text-primary">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
