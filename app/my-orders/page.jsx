"use client";
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const MyOrders = () => {
  const { currency, getToken, user } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setOrders(data.orders.reverse());
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <div className="space-y-5">
          {/* <h2 className="text-lg font-medium mt-6">My Orders</h2> */}
          <p className="text-2xl md:text-3xl text-white">
            My <span className="font-medium text-sony">Orders</span>
          </p>
          {loading ? (
            <Loading />
          ) : (
            <div className="max-w-5xl border-t border-gray-300 text-sm">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                >
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="max-w-16 max-h-16 object-cover"
                      src={assets.box_icon}
                      alt="box_icon"
                    />
                    <p className="flex flex-col gap-3">
                      <span className="font-medium text-base text-white">
                        {order.items
                          .map(
                            (item) => item.product.name + ` x ${item.quantity}`
                          )
                          .join(", ")}
                      </span>
                      <span className="text-white">
                        Items : {order.items.length}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium text-white">
                        {order.address.fullName}
                      </span>
                      <br />
                      <span className="text-white">{order.address.area}</span>
                      <br />
                      <span className="text-white">{`${order.address.city}, ${order.address.state}`}</span>
                      <br />
                      <span className="text-white">
                        {order.address.phoneNumber}
                      </span>
                    </p>
                  </div>
                  <p className="font-medium my-auto text-white">
                    {currency}
                    {order.amount}
                  </p>
                  <div>
                    <p className="flex flex-col items-center">
                      {/* <span className="text-white">Method : COD</span> */}
                      <span className="text-white pt-7">
                        Date : {new Date(order.date).toLocaleDateString()}
                      </span>
                      {/* <span className="text-white">Payment : Pending</span> */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
