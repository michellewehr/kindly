const { User, Event, Comment, GoodDeed } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
   Query: {

      // ** USERS

      // find current logged in user
      me: async (parent, args, context) => {
         if (context.user) {
            const userData = await User.findOne({ _id: context.user._id }).select('-__v -password')
            return userData;
         }
         throw new AuthenticationError('Not logged in');
      },

      // get all users
      users: async () => {
         return await User.find().select('-__v -password');
      },

      // find user by id
      user: async (parent, { _id }) => {
         return await User.findOne({ _id }).select('-__v -password');
      },

      // ** EVENTS

      // get all events
      events: async () => {
         return await Event.find();
      },

      // find event by optional parameters which are id specific
      event: async (parent, { _id, hostId, attendeeId }) => {
         // ternary for each combination of parameters with event searching
         const params =
            _id ? { _id } : hostId ? { hostId } : attendeeId ? { attendeeId } :
               _id && hostId ? { _id, hostId } : _id && attendeeId ? { _id, attendeeId } : hostId && attendeeId ? { hostId, attendeeId }
                  : {}; // set params to empty if none passed

         // get all events with params sorted by most recently created first
         return await Event.find(params).sort({ createdAt: -1 });
      }
   },

   Mutation: {
      createUser: async (parent, args) => {

         // * functionality to check if email is duplicate
         const createdUserEmail = args.email;
         // find user by created email
         const alreadyExistingUser = await User.findOne({ createdUserEmail });

         // throw duplicate email error if user with that email exists already
         if (alreadyExistingUser.email === createdUserEmail) {
            throw new AuthenticationError('A user with this email already exists.');
         }

         // otherwise, create new user
         const user = await User.create(args);
         const token = signToken(user);
         return { user, token };
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

         console.log(context, "LINE 45")

         if (context.user) {
            const event = await Event.create(...args)
            await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { events: event._id } }, { new: true });
         }
         throw new AuthenticationError('You need to be logged in!');
      }
   }
}

module.exports = resolvers
