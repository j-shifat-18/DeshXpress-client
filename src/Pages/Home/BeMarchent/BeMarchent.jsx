import React from "react";
import locationMarchentImg from '../../../assets/images/location-merchant.png'

const BeMarchent = () => {
  return (
    <div className="bg-[#03373D] bg-[url('assets/images/be-a-merchant-bg.png')] bg-no-repeat p-20 rounded-4xl mb-24">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={locationMarchentImg}
          className=""
        />
        <div>
          <h1 className="text-4xl font-extrabold ">Merchant and Customer Satisfaction is Our First Priority</h1>
          <p className="py-6">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn rounded-full bg-[#CAEB66] text-black font-bold text-xl">Become a Merchant</button>
          <button className="btn ml-5 btn-outline text-[#CAEB66] rounded-full hover:bg-[#CAEB66] hover:text-black font-bold text-xl">Earn with Profast Courier</button>
        </div>
      </div>
    </div>
  );
};

export default BeMarchent;
