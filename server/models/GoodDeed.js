const { Schema, model } = require('mongoose');
const dateFormatter = require('../utils/dateFormat');
// const commentSchema = require('./Comment');

const goodDeedSchema = new Schema(
  {
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    helper: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      required: true,
      get: timestamp => dateFormatter(timestamp, { dateSuffix: false, monthLength: 'Long' })
    },
    deedText: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
)

const GoodDeed = model('GoodDeed', goodDeedSchema);

//TODO: view count/ comment count?

module.exports = GoodDeed;
