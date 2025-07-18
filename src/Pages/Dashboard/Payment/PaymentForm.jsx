import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Components/Shared/Loader/Loader";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import DeshXpressLogo from "../../../Components/DeshXpressLogo/DeshXpressLogo";

const PaymentForm = ({ id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    data: parcelInfo,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isPending) return <Loader />;

  const amount = parcelInfo.price;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (card == null) return;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        id,
      });
      const clientSecret = res.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else {
        const transactionId = result.paymentIntent.id;
        const paymentData = {
          parcelId: id,
          email: user.email,
          amount,
          transactionId: transactionId,
          paymentMethod: result.paymentIntent.payment_method_types,
        };
        const paymentRes = await axiosSecure.post("/payments", paymentData);
        if (paymentRes.data.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            confirmButtonText: "Go to My Parcels",
          });
          navigate("/dashboard/myParcels");
        }
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-8 mt-10 mb-10 border border-gray-100">
      <div className="flex flex-col items-center mb-6">
        <DeshXpressLogo />
        <h2 className="text-2xl font-bold mt-2 mb-1 text-primary">Parcel Payment</h2>
        <p className="text-gray-500 text-sm">Secure payment powered by Stripe</p>
      </div>
      {/* Parcel summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <div className="font-semibold text-lg text-gray-700">{parcelInfo.parcelTitle}</div>
            <div className="text-xs text-gray-500">Type: <span className="capitalize">{parcelInfo.parcelType}</span></div>
          </div>
          <div className="text-sm text-gray-500">From <span className="font-semibold">{parcelInfo.senderDistrict}</span> to <span className="font-semibold">{parcelInfo.receiverDistrict}</span></div>
          <div className="text-xl font-bold text-primary">৳{amount}</div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700">Card Details</label>
          <div className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:border-primary transition">
            <CardElement options={{ style: { base: { fontSize: '16px', color: '#222', '::placeholder': { color: '#aaa' } } } }} />
          </div>
        </div>
        {error && <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg px-4 py-2 text-sm">{error}</div>}
        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-green-400 text-white font-bold text-lg shadow hover:from-green-400 hover:to-primary transition cursor-pointer"
          type="submit"
          disabled={!stripe}
        >
          Pay ৳{amount}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
