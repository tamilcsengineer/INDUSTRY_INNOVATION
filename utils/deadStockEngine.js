module.exports.detectDeadStock = (product) => {
  if (!product.quantity || product.quantity <= 0) return null;

  const today = new Date();
  const lastSold = product.lastSoldAt || product.createdAt;

  const daysInactive = Math.floor(
    (today - new Date(lastSold)) / (1000 * 60 * 60 * 24)
  );

  if (daysInactive >= 30) {
    return {
      status: "DEAD_STOCK",
      daysInactive,
      action: "CLEARANCE / DISCOUNT / BUNDLE"
    };
  }

  if (daysInactive >= 15) {
    return {
      status: "WARNING",
      daysInactive,
      action: "PROMOTION / EARLY CLEARANCE"
    };
  }

  return {
    status: "ACTIVE",
    daysInactive,
    action: "NO_ACTION"
  };
};
