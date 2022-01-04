const { Schema, model } = require("mongoose");
const dateFormatter = require("../utils/dateFormat");

const eventSchema = new Schema(
  {
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 560,
    },
    date: {
      type: Date,
      required: true,
      get: (timestamp) =>
        dateFormatter(timestamp, { dateSuffix: false, monthLength: "Long" }),
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    verify: [
      {
        type: Schema.Types.ObjectId,
        ref: "Verify",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

const Event = model("Event", eventSchema);

//TODO: view count/ comment count?

module.exports = Event;
