const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    quantity: { type: Number, default: 0 },

    // 📍 LOCATION INTELLIGENCE (CORRECT PLACE)
    location: {
      category: { type: String, required: true },
      type: { type: String },
      shelf: { type: String },
      row: { type: String },
      box: { type: String }
    },

    // 📊 SALES HISTORY (UNCHANGED)
    salesHistory: [
      {
        qty: Number,
        pickedCorrectly: Boolean,
        shippedOnTime: Boolean,
        date: { type: Date, default: Date.now }
      }
    ],

    // ⚠️ LOSS & RISK
    lossScore: { type: Number, default: 0 },
    riskLevel: { type: String, default: "LOW" },

    // 🧩 TRACKING
    lastSoldAt: Date,
    damageCount: { type: Number, default: 0 },
    overstockCount: { type: Number, default: 0 },

    // 🕒 AUDIT LOG
    activityLog: [
      {
        action: String,
        quantity: Number,
        reason: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
