export function calculateCostDetails({ parcelType, parcelWeight, senderDistrict, receiverDistrict }) {
  const isWithinCity = senderDistrict && receiverDistrict && senderDistrict === receiverDistrict;
  let base = 0, extra = 0, perKg = 0, total = 0, breakdown = "";
  const weight = parseFloat(parcelWeight) || 1;
  if (parcelType === "document") {
    base = isWithinCity ? 60 : 80;
    total = base;
    breakdown = `Document, Any weight: <b>৳${base}</b> (${isWithinCity ? 'Within City' : 'Outside City/District'})`;
  } else {
    if (weight <= 3) {
      base = isWithinCity ? 110 : 150;
      total = base;
      breakdown = `Non-Document, Up to 3kg: <b>৳${base}</b> (${isWithinCity ? 'Within City' : 'Outside City/District'})`;
    } else {
      perKg = 40 * Math.ceil(weight);
      if (isWithinCity) {
        total = perKg;
        breakdown = `Non-Document, >3kg: <b>৳40/kg x ${Math.ceil(weight)}kg = ৳${perKg}</b> (Within City)`;
      } else {
        extra = 40;
        total = perKg + extra;
        breakdown = `Non-Document, >3kg: <b>৳40/kg x ${Math.ceil(weight)}kg = ৳${perKg}</b> + ৳40 extra = <b>৳${total}</b> (Outside City/District)`;
      }
    }
  }
  return { base, perKg, extra, total, breakdown, isWithinCity, weight };
} 