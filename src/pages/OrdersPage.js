import axios from "axios";
import { ENV_CONSTANTS } from "env";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { LocalSwal } from "shared/LocalSwal";
import { formatDate, sumCartItems } from "shared/utils";
import AuthContext from "../context/auth-context";

export default function OrdersPage() {
  const authContext = useContext(AuthContext);
  const [isWorking, setIsWorking] = useState(false);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setIsWorking(true);
    const url = `${ENV_CONSTANTS.apiUrl}/order`;

    const fetchOrders = async () => {
      try {
        const result = await axios.get(url, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authContext.userData.access_token}`,
          },
        });
        setOrders(result.data.data);
      } catch (e) {
        console.error("api error", e.response);
        if (e.response && e.response.data && e.response.data.error) {
          LocalSwal.fire("Uh Oh", e.response.data.error, "error");
        } else {
          LocalSwal.fire(
            "Uh Oh",
            "An error occured. Please try again later",
            "error"
          );
        }
      }
      setIsWorking(false);
    };
    if (authContext.authenticated) {
      fetchOrders();
    }
  }, []);

  return authContext.authenticated ? (
    <div style={{ minHeight: "80vh" }} className=" py-4">
      <h3>My Orders</h3>
      <div className="row">
        <div className="col-12 ">
          <table className="table table-hover border border-dark">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Created</th>
                <th scope="col">Items</th>
                <th scope="col">Total</th>
                <th scope="col">Tracking #</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .sort((a, b) => {
                  return b.id - a.id;
                })
                .map((order) => (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>
                      <Link to={`/orders/${order.id}`}>
                        {formatDate(new Date(order.created_at), "LLL dd, yyyy")}
                      </Link>
                    </td>
                    <td>
                      {" "}
                      <Link to={`/orders/${order.id}`}>
                        {order.order_data.length}
                      </Link>
                    </td>
                    <td>{sumCartItems(order.order_data).toFixed(2)}</td>
                    <td>
                      {" "}
                      <Link to={`/orders/${order.id}`}>{order.tracking}</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}
