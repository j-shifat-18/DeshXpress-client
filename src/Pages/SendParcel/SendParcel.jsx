import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ParcelInfoSection from "./ParcelInfoSection";
import SenderReceiverSection from "./SenderReceiverSection";
import { calculateCostDetails } from "./costUtils";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

function generateTrackingId() {
  return 'DXP-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

const SendParcel = () => {
  const [serviceData, setServiceData] = useState([]);
  const [senderDistricts, setSenderDistricts] = useState([]);
  const [senderCenters, setSenderCenters] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);
  const [receiverCenters, setReceiverCenters] = useState([]);

  const { user } = useAuth() || {};
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      parcelType: "document"
    }
  });
  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const senderDistrict = watch("senderDistrict");
  const receiverRegion = watch("receiverRegion");
  const receiverDistrict = watch("receiverDistrict");

  useEffect(() => {
    fetch("/serviceCenter.json")
      .then(res => res.json())
      .then(data => setServiceData(data));
  }, []);

  // Sender dynamic fields
  useEffect(() => {
    if (!senderRegion) {
      setSenderDistricts([]);
      setValue("senderDistrict", "");
      setSenderCenters([]);
      setValue("senderServiceCenter", "");
      return;
    }
    const districts = Array.from(new Set(serviceData.filter(d => d.region === senderRegion).map(d => d.district)));
    setSenderDistricts(districts);
    setValue("senderDistrict", "");
    setSenderCenters([]);
    setValue("senderServiceCenter", "");
  }, [senderRegion, serviceData, setValue]);

  useEffect(() => {
    if (!senderDistrict) {
      setSenderCenters([]);
      setValue("senderServiceCenter", "");
      return;
    }
    const entry = serviceData.find(d => d.district === senderDistrict && d.region === senderRegion);
    setSenderCenters(entry ? entry.covered_area : []);
    setValue("senderServiceCenter", "");
  }, [senderDistrict, senderRegion, serviceData, setValue]);

  // Receiver dynamic fields
  useEffect(() => {
    if (!receiverRegion) {
      setReceiverDistricts([]);
      setValue("receiverDistrict", "");
      setReceiverCenters([]);
      setValue("receiverServiceCenter", "");
      return;
    }
    const districts = Array.from(new Set(serviceData.filter(d => d.region === receiverRegion).map(d => d.district)));
    setReceiverDistricts(districts);
    setValue("receiverDistrict", "");
    setReceiverCenters([]);
    setValue("receiverServiceCenter", "");
  }, [receiverRegion, serviceData, setValue]);

  useEffect(() => {
    if (!receiverDistrict) {
      setReceiverCenters([]);
      setValue("receiverServiceCenter", "");
      return;
    }
    const entry = serviceData.find(d => d.district === receiverDistrict && d.region === receiverRegion);
    setReceiverCenters(entry ? entry.covered_area : []);
    setValue("receiverServiceCenter", "");
  }, [receiverDistrict, receiverRegion, serviceData, setValue]);

  const regions = Array.from(new Set(serviceData.map(d => d.region)));

  // Tanstack mutation for posting parcel
  const parcelMutation = useMutation({
    mutationFn: async (fullData) => {
      const res = await axiosSecure.post("/parcels", fullData);
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Booking Confirmed!",
        text: "Your parcel has been created successfully.",
        showConfirmButton: false,
        timer: 1800
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Failed to create parcel. Please try again.",
      });
    }
  });

  const onSubmit = data => {
    const { breakdown, total } = calculateCostDetails(data);
    const created_at = new Date().toISOString();
    const trackingId = generateTrackingId();
    const email = user?.email || "";
    const fullData = {
      ...data,
      created_at,
      trackingId,
      email,
      price: total
    };
    Swal.fire({
      title: "Delivery Cost Details",
      html: `
        <div style='text-align:left'>
          <div>${breakdown}</div>
          <hr style='margin:10px 0'/>
          <div style='font-size:1.2em'><b>Total Price:</b> <span style='color:#2563eb'>৳${total}</span></div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm Booking",
      cancelButtonText: "Edit Details",
      customClass: {
        popup: 'swal2-rounded swal2-padding'
      }
    }).then(result => {
      if (result.isConfirmed) {
        parcelMutation.mutate(fullData);
      }
      // If cancelled, do nothing (user can edit form)
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-10 mb-10">
      <h1 className="text-4xl font-bold mb-2">Send Parcel</h1>
      <p className="text-lg text-gray-600 mb-8">Fill in the details below to send your parcel. All fields are required except parcel weight for documents.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <ParcelInfoSection register={register} errors={errors} parcelType={parcelType} watch={watch} />
        <div className="flex flex-col lg:flex-row gap-8">
          <SenderReceiverSection
            type="Sender"
            register={register}
            errors={errors}
            regions={regions}
            districts={senderDistricts}
            centers={senderCenters}
          />
          <SenderReceiverSection
            type="Receiver"
            register={register}
            errors={errors}
            regions={regions}
            districts={receiverDistricts}
            centers={receiverCenters}
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary px-8 py-2 rounded-full text-lg text-black" disabled={parcelMutation.isLoading}>
            {parcelMutation.isLoading ? "Submitting..." : "Proceed to Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;