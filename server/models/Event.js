const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

const eventSchema = new Schema(
    {
        host: {
            type: String, 
            required: true,
            trim: true
        },
        title: {
            type: String, 
            required: true, 
            trim: true,
            maxlength: 280
        },
        attendees: [
            {
               type: Schema.Types.User,
               ref: 'User'
            }
         ],
        location: {
            type: String,
            required: true,
            trim: true
          },
        description: {
            type: String, 
            required: true,
            maxlength: 280
        },
        date: {
            type: Date,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String, 
            required: true
        },
        url: {
            type: String, 
            required: false
        },
        image: {
            type: String, 
            required: false
        },
        comments: [commentSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const Event = model('Event', eventSchema);

//TODO: view count/ comment count?

module.exports = Event;