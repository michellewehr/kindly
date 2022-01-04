const { Schema, model } = require("mongoose");

const VerifySchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  verifyNumber: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Verify = model("Verify", VerifySchema);

module.exports = Verify;
