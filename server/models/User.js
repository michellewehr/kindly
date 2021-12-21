const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must be a valid email address!']
    },
    password: {
      type: String,
      required: true,
      minLength: 8
    },
    location: {
      type: String
    },
    profilePicture: {
      type: String
    },
    connections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
    goodDeeds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'GoodDeed'
      }
    ],
    kindlyScore: {
      type: Number
    }
  },
  {
    toJSON: { virtuals: true }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// get connection count for user sidebar
userSchema.virtual('connectionCount').get(function () {
  return this.connections.length;
});

// TODO: keep in mind whether or not we need virtuals to show events, good deeds, and kindly points for user profile

const User = model('User', userSchema);

module.exports = User;
