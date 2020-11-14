import React, { useState, useEffect } from "react";
import "./Orders.css";
import { useSelector } from "react-redux";
import { db } from "../../firebase/Firebase";
import OrderProduct from "./OrderProduct";
import { CircularProgress } from "@material-ui/core";
function Orders() {
  const { user } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (user) {
      setIsLoading(true);
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
          setIsLoading(false);
        });
    } else {
      setOrders([]);
      setIsLoading(false);
    }
  }, [user]);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      {isLoading ? (
        <div className="orders__loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="orders__order">
          {orders.length > 0 ? (
            orders.map((order) => <OrderProduct order={order} key={order.id} />)
          ) : (
            <>
              <h4>Nothing to show in order history.</h4>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
