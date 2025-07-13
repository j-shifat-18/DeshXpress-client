const ServiceCard = ({ service }) => {
    const {icon, title, description, highlight} = service;
  return (
    <div
      className={`flex flex-col items-center rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl ${
        highlight ? 'bg-[#CAEB66] border-2 border-lime-400' : 'bg-white '
      }`}
    >
      <div className="flex justify-center items-center w-20 h-20 rounded-full mb-4 bg-gradient-to-b from-[#EEEDFC] to-transparent p-3">{icon}</div>
      <h3 className="text-xl mb-2 text-[#03373D] font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
