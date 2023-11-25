import React from "react";
import SlideBar from "../../components/shared/slidebar/SlideBar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
const Payment = () => {
  let location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { serviceId, serviceAmount } = location.state || {};

  const errorMsg = (msg) => toast.error(msg);

  const options = {
    style: {
      base: {
        fontSize: "16px",
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };
  const paymentData = {
    amount: Math.round((serviceAmount * 0, 5) * 100),
  };

  const paymentInfo = {
    amount: paymentData.amount,
    data: Date.now(),
  };

  async function handleSubmit(e) {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      res = await axios.post(
        "http://localhost:5000/api/v1/payment/process",
        paymentData,
        config
      );

      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.name,
            phone: user?.phoneNumber,
          },
        },
      });

      if (result.error) {
        errorMsg(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        //the payment is process or not
        if (result.paymentIntent.status === "succeeded") {
          paymentInfo.status = result.paymentIntent.status;
          paymentInfo.payId = result.paymentIntent.id;

          let paymentRes;
          try {
            let paymentRes = await axios.post(
              "http://localhost:5000/api/v1/paymentinfo",
              { paymentInfo, serviceId }
            );
          } catch (error) {
            console.log(error);
          }

          // push sucess
          navigate("/paymentsucess");
        } else {
          errorMsg("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      return error(error.response.data.message);
    }
  }
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <SlideBar />
      </div>
      <div className="col-span-9 mt-28 ml-48">
        <div className="w-96 bg-secBackColor rounded-md">
          <div className="row wrapper">
            <div className="col-10 col-lg-5 mx-auto">
              <form className="shadow-lg p-4" onSubmit={handleSubmit}>
                <h1 className="mb-4 text-center text-3xl text-textColor">
                  Card Info
                </h1>
                <div className="form-group">
                  <label
                    htmlFor="card_num_field"
                    className="text-sm font-medium text-textColor"
                  >
                    Card Number
                  </label>
                  <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control py-2 px-3 border rounded-md focus:ring focus:ring-blue-200 text-textColor"
                    options={options}
                  />
                </div>

                <div className="form-group mt-4">
                  <label
                    htmlFor="card_exp_field"
                    className="text-sm font-medium text-textColor"
                  >
                    Card Expiry
                  </label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control py-2 px-3 border rounded-md focus:ring focus:ring-blue-200 text-textColor"
                    options={options}
                  />
                </div>

                <div className="form-group mt-4">
                  <label
                    htmlFor="card_cvc_field"
                    className="text-sm font-medium text-textColor"
                  >
                    Card CVC
                  </label>
                  <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control py-2 px-3 border rounded-md focus:ring focus:ring-blue-200 text-textColor"
                    options={options}
                  />
                </div>
                <div className="ml-32">
                  <button
                    id="pay_btn"
                    type="submit"
                    className="btn btn-block py-1 px-4 mt-6 bg-blue text-white rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-200"
                  >
                    Pay{`- ${(serviceAmount * 0, 5)}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
