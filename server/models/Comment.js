const { Schema, model } = require("mongoose");
const replySchema = require ("./Reply");
const dateFormat = require("../utils/dateFormat");

const commentSchema = new Schema(

  {
      id: ID,
      commentText: {
        type: String,
        required: 'You need to leave a comment!',
        trim: true,
        maxlength: [280, 'Comment is too long!']
    },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
      username: {
        type: String,
        required: true,
    },
      likes: {
        type: Int,
        default: 0
    },
      replies: [replySchema]
  },
    { toJSON: {
        getters: true
  }
}
)

commentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', commentSchema)
// COMMENT;
// id: ID;
// User: [User];
// CommentText: String;
// createdAt: Date;
// Likes: Int;

module.exports = Comment
