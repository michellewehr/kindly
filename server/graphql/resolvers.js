const { User, Event, Comment, GoodDeed } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password')
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    }
  },

  Mutation: {
    // todo BUG: email can be duplicated
    createUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)
      return { user, token }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw new AuthenticationError('Incorrect login information')
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect login information');
      }

      const token = signToken(user);
      return { token, user };
    },

    // TODO: On submit handler function make sure the user first and last name are passed to the resolvers as args.
    createEvent: async (parent, args, context) => {

      console.log(context.user, "LINE 45")

      if (context.user) {
        const event = await Event.create(...args)
        await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { events: event._id } }, { new: true });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
}

module.exports = resolvers
