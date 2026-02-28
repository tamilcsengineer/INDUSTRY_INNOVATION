module.exports.calculateLocationIntelligence = (product) => {
  const history = product.salesHistory || [];

  if (history.length === 0) {
    return {
      accuracy: 100,
      status: "NEW",
      message: "New product – no location issues yet"
    };
  }

  const total = history.length;
  const correctPick = history.filter(h => h.pickedCorrectly).length;
  const onTime = history.filter(h => h.shippedOnTime).length;

  const accuracy = Math.round(
    ((correctPick + onTime) / (2 * total)) * 100
  );

  let status = "PERFECT";
  let message = "Location working perfectly";

  if (accuracy < 90 && accuracy >= 70) {
    status = "NEEDS_IMPROVEMENT";
    message = "Shelf confusion detected – consider rearranging";
  }

  if (accuracy < 70) {
    status = "BAD_LOCATION";
    message = "High picking/shipping errors – relocation required";
  }

  return { accuracy, status, message };
};
