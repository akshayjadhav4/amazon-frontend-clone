import React, { useState, useEffect } from "react";
import "./Orders.css";
import { useStateValue } from "../../contextApi/StateProvider";
import { db } from "../../firebase/Firebase";
import OrderProduct from "./OrderProduct";
function Orders() {
  const [{ user }, dispatch] = useStateValue();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <div className="orders">
      <div className="orders__order">
        {orders.map((order) => (
          <OrderProduct order={order} key={order.id} />
        ))}
      </div>
    </div>
  );
}

export default Orders;