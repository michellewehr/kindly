const { Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const replySchema = new Schema(
  {
    replyBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    author: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


module.exports = replySchema;
