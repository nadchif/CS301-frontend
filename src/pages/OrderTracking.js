import axios from "axios";
import { ENV_CONSTANTS } from "env";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LocalSwal } from "shared/LocalSwal";

import { formatDate } from "shared/utils";

export default function OrderTrackingPage() {
  const [isWorking, setIsWorking] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState("false");

  const getOrder = (e) => {
    e.preventDefault();
    setIsWorking(true);
    const url = `${ENV_CONSTANTS.apiUrl}/order/track`;

    const checkOrder = async () => {
      try {
        const result = await axios.post(url, {
          tracking_number: trackingNumber,
        });

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

    checkOrder();
  };

  const handleInputChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  return orderData ? (
    <>
      <div style={{ minHeight: "80vh" }}>
        <div className="row my-5">
          <div className="col-12 col-md-6 offset-md-3 text-center">
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
                  {formatDate(new Date(orderData.eta), "LLL dd, yyyy, hh:mm a")}
                </p>
              </>
            )}
            <Link
              to={`/orders/${orderData.id}`}
              className="my-3 btn btn-lg btn-warning rounded-0"
            >
              View Order Details
            </Link>
            &nbsp;
            <button
              type="button"
              onClick={() => setOrderData(null)}
              className="my-3 btn btn-lg btn-secondary rounded-0"
            >
              Track another Order
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="row py-5 bg-light" style={{ minHeight: "80vh" }}>
      <div className="col-12 col-md-6 offset-md-3 text-center">
        <h4 className="my-4">Enter Tracking Number</h4>

        <form onSubmit={getOrder}>
          <div className="form-group ">
            <input
              type="text"
              name="email"
              onChange={handleInputChange}
              required
              disabled={isWorking}
              className="form-control mb-2 rounded-0"
            />
          </div>
          <button type="submit" className="my-4 btn btn-block btn-warning">
            Check Status
          </button>
        </form>
      </div>
    </div>
  );
}
