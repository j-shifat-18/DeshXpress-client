const ParcelInfoSection = ({ register, errors, parcelType, watch }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Parcel Info</h2>
    <div className="flex items-center gap-6 mb-4">
      <label className="flex items-center gap-2">
        <input type="radio" value="document" {...register("parcelType")} defaultChecked />
        Document
      </label>
      <label className="flex items-center gap-2">
        <input type="radio" value="non-document" {...register("parcelType")} />
        Non-Document
      </label>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block font-medium">Parcel Title</label>
        <input {...register("parcelTitle", { required: "Required" })} className="input input-bordered w-full" />
        {errors.parcelTitle && <span className="text-red-500 text-xs">{errors.parcelTitle.message}</span>}
      </div>
      <div>
        <label className="block font-medium">Parcel Weight (KG)</label>
        <input {...register("parcelWeight", {
          required: parcelType === "non-document" ? "Required" : false,
          validate: v => parcelType === "document" || !v || !isNaN(parseFloat(v)) || "Must be a number"
        })} className="input input-bordered w-full" disabled={parcelType === "document"} />
        {errors.parcelWeight && <span className="text-red-500 text-xs">{errors.parcelWeight.message}</span>}
      </div>
    </div>
  </div>
);

export default ParcelInfoSection; 