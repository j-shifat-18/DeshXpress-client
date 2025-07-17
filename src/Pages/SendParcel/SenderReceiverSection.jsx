const SenderReceiverSection = ({ type, register, errors, regions, districts, centers }) => (
  <div className="flex-1">
    <h2 className="text-2xl font-semibold mb-4">{type} Info</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block font-medium">Region</label>
        <select {...register(`${type.toLowerCase()}Region`, { required: "Required" })} className="input input-bordered w-full">
          <option value="">Select region</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        {errors[`${type.toLowerCase()}Region`] && <span className="text-red-500 text-xs">{errors[`${type.toLowerCase()}Region`].message}</span>}
      </div>
      <div>
        <label className="block font-medium">District</label>
        <select {...register(`${type.toLowerCase()}District`, { required: "Required" })} className="input input-bordered w-full" disabled={!districts.length}>
          <option value="">Select district</option>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        {errors[`${type.toLowerCase()}District`] && <span className="text-red-500 text-xs">{errors[`${type.toLowerCase()}District`].message}</span>}
      </div>
      <div>
        <label className="block font-medium">Service Center</label>
        <select {...register(`${type.toLowerCase()}ServiceCenter`, { required: "Required" })} className="input input-bordered w-full" disabled={!centers.length}>
          <option value="">Select service center</option>
          {centers.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors[`${type.toLowerCase()}ServiceCenter`] && <span className="text-red-500 text-xs">{errors[`${type.toLowerCase()}ServiceCenter`].message}</span>}
      </div>
      <div className="md:col-span-3">
        <label className="block font-medium">{type} Name</label>
        <input {...register(`${type.toLowerCase()}Name`, { required: "Required" })} className="input input-bordered w-full" />
        {errors[`${type.toLowerCase()}Name`] && <span className="text-red-500 text-xs">{errors[`${type.toLowerCase()}Name`].message}</span>}
      </div>
      <div className="md:col-span-3">
        <label className="block font-medium">{type} Contact</label>
        <input {...register(`${type.toLowerCase()}Contact`, { required: "Required" })} className="input input-bordered w-full" />
        {errors[`${type.toLowerCase()}Contact`] && <span className="text-red-500 text-xs">{errors[`${type.toLowerCase()}Contact`].message}</span>}
      </div>
      <div className="md:col-span-3">
        <label className="block font-medium">{type} Address</label>
        <input {...register(`${type.toLowerCase()}Address`, { required: "Required" })} className="input input-bordered w-full" />
        {errors[`${type.toLowerCase()}Address`] && <span className="text-red-500 text-xs">{errors[`${type.toLowerCase()}Address`].message}</span>}
      </div>
      <div className="md:col-span-3">
        <label className="block font-medium">{type === "Sender" ? "Pick up Instruction" : "Delivery Instruction"}</label>
        <input {...register(type === "Sender" ? "pickupInstruction" : "deliveryInstruction", { required: "Required" })} className="input input-bordered w-full" />
        {errors[type === "Sender" ? "pickupInstruction" : "deliveryInstruction"] && <span className="text-red-500 text-xs">{errors[type === "Sender" ? "pickupInstruction" : "deliveryInstruction"].message}</span>}
      </div>
    </div>
  </div>
);

export default SenderReceiverSection; 