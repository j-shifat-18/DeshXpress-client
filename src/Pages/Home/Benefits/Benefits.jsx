import React from "react";

import tracking from "../../../assets/benefits/live-percel-tracking.png";
import delivery from "../../../assets/benefits/safe-delivery.png";
import support from "../../../assets/benefits/call-center-support.jpg";

const benefits = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking benefit. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: tracking,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: delivery,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: support,
  },
];

const Benefits = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm"
          >
            <img
              src={benefit.image}
              alt={benefit.title}
              className="w-28 md:w-40"
            />
            <div className="text-center md:text-left py-6 px-10 border-l-2 border-dashed border-[#03373D]">
              <h3 className="text-[#03373D] text-2xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600 max-w-3xl font-medium">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
