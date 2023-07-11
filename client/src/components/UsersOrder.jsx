import React, { useEffect, useState } from "react";
import { OrderData, Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { setOrders } from "../context/actions/ordersAction";

const UsersOrder = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const [userOrders, setUserOrders] = useState(null);
  useEffect(() => {
    if (!orders) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
        setUserOrders(data.filter((item) => item.userId === user?.user_id));
      });
    } else {
      setUserOrders(orders.filter((data) => data.userId === user?.user_id));
    }
  }, [orders]);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className=" w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-48 pb-24 gap-12">
        {userOrders?.length > 0 ? (
          <>
            {userOrders.map((item, i) => (
              <OrderData key={i} index={i} data={item} admin={false} />
            ))}
          </>
        ) : (
          <>
            <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
          </>
        )}
      </div>
    </main>
  );
};

export default UsersOrder;
