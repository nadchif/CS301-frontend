import axios from "axios";
import { ENV_CONSTANTS } from "env";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, Link, useParams } from "react-router-dom";
import { LocalSwal } from "shared/LocalSwal";

import { formatDate, sumCartItems } from "shared/utils";
import AuthContext from "../context/auth-context";

export default function OrderDetailsPage() {
  const authContext = useContext(AuthContext);
  const [isWorking, setIsWorking] = useState(false);
  const [orderData, setOrderData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    setIsWorking(true);
    const url = `${ENV_CONSTANTS.apiUrl}/order/${id}`;

    const fetchOrders = async () => {
      try {
        const result = await axios.get(url, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authContext.userData.access_token}`,
          },
        });
        console.log(result.data.data);
        setOrderData(result.data.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return authContext.authenticated ? (
    orderData && !isWorking ? (
      <>
        <div style={{ minHeight: "80vh" }}>
          <div className="row">
            <div className="col-12 bg-light p-3 mb-4 ">
              <h4 className="mt-2 mb-3">
                Status: <span className="text-success">Processsing</span>{" "}
              </h4>
              {orderData && (
                <>
                  <p>
                    <b>Tracking Number: </b>
                    {orderData.tracking}
                  </p>
                  <p>
                    <b>Order Received: </b>
                    {formatDate(
                      new Date(orderData.created_at),
                      "LLL dd, yyyy, hh:mm a"
                    )}
                  </p>
                  <p>
                    <b>Estimated Delivery: </b>
                    {formatDate(
                      new Date(orderData.eta),
                      "LLL dd, yyyy, hh:mm a"
                    )}
                  </p>
                </>
              )}
            </div>
            {orderData.order_data ? (
              orderData.order_data
                .sort((a, b) => {
                  return a.price - b.price;
                })
                .map((item) => (
                  <div
                    className="col-12 col-md-8 offset-md-2 my-3"
                    key={item.id}
                  >
                    <div className="card rounded-0">
                      <div className="row no-gutters">
                        <div className="col-sm-3">
                          <img
                            style={{
                              height: "8rem",
                              width: "100%",
                              objectFit: "cover",
                            }}
                            src={item.photo_url}
                            alt={item.name}
                          />
                        </div>
                        <div className="col-sm-9 ">
                          <div className="card-body">
                            <h5 className="card-title">
                              &#8369;{(item.price * item.quantity).toFixed(2)}
                            </h5>
                            <p className="card-text text-muted">
                              {item.quantity} x {item.name}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-12 py-5 my-5 text-center">No items</div>
            )}
            <div className="col-12 col-md-8 offset-md-2 ">
              <h3 className="my-3 text-right ">
                {" "}
                Total: &#8369;
                <span className="text-danger font-weight-bold">
                  {orderData.order_data
                    ? sumCartItems(orderData.order_data).toFixed(2)
                    : "0.00"}{" "}
                </span>
              </h3>
            </div>
            <div className="col-12 col-md-8 offset-md-2 mb-5">
              <Link to="/orders" className="btn  btn-success">
                &lt;- Return to Orders
              </Link>
            </div>
          </div>
        </div>
      </>
    ) : (
      <div>Loading...</div>
    )
  ) : (
    <Redirect to="/login" />
  );
}
