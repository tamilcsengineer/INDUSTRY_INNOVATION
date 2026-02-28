const { detectDeadStock } = require("../utils/deadStockEngine");

/**
 * GET DEAD STOCK REPORT (ADMIN)
 */
const getDeadStockReport = async (req, res) => {
  try {
    const products = await Product.find();

    const report = products
      .map((p) => {
        const deadInfo = detectDeadStock(p);
        if (!deadInfo) return null;

        return {
          productId: p._id,
          name: p.name,
          quantity: p.quantity,
          daysInactive: deadInfo.daysInactive,
          status: deadInfo.status,
          suggestedAction: deadInfo.action
        };
      })
      .filter(Boolean);

    res.json(report);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
