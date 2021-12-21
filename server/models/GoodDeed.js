const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const commentSchema = require('./Comment');

const goodDeedSchema = new Schema(
    {
        host: {
            type: String, 
            required: true,
            trim: true
        },
        title: {
            type: String, 
            required: true, 
            trim: true
        },
        deedText: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
          },
        comments: [commentSchema],
        likes: {
            type: Int,
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

const GoodDeed = model('GoodDeed',goodDeedSchema);

//TODO: view count/ comment count?

module.exports = GoodDeed;