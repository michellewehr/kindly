const { User, Event, Comment, GoodDeed } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken, authMiddleware } = require('../utils/auth');


const resolvers = {
   Query: {

      // ** USERS

      // find current logged in user
      me: async (parent, args, context) => {
         if (context.user) {
            const userData = await User.findOne({ _id: context.user._id }).select('-__v -password').populate('connections').populate('events');
            return userData;
         }
         throw new AuthenticationError('Not logged in');
      },

      // get all users
      users: async () => {
         return await User.find().select('-__v -password').populate('connections').populate('events');
      },

      // find user by id
      user: async (parent, { _id }) => {
         return await User.findOne({ _id }).select('-__v -password');
      },

      // ** EVENTS

      // get all events
      events: async () => {
         return await Event.find().populate('host').populate('attendees').populate('comments').select('-__v');
      },

      // TODO: Make sure all of the optional parameters work
      // find event by optional parameters which are id specific
      event: async (parent, { _id, hostId, attendeeId }) => {
         // ternary for each combination of parameters with event searching
         const params =
            _id ? { _id } : hostId ? { hostId } : attendeeId ? { attendeeId } :
               _id && hostId ? { _id, hostId } : _id && attendeeId ? { _id, attendeeId } : hostId && attendeeId ? { hostId, attendeeId }
                  : {}; // set params to empty if none passed

         // get all events with params sorted by most recently created first
         return await Event.find(params).sort({ createdAt: -1 }).select('-__v');
      },

      goodDeeds: async () => {
         return await GoodDeed.find().populate('host').populate('helper').populate('comments').select('-__v')
      },

      goodDeed: async () => {
         return await GoodDeed.findOne({ _id }).populate('host').populate('helper').populate('comments').select('-__v')
      }
   },

   Mutation: {
      createUser: async (parent, args) => {
         const user = await User.create(args)

         if (user) {
            const token = signToken(user)
            return { user, token }
         }
         // TODO: I think we need an error catch somewhere here. I could be wrong!
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

      // TODO: Call in name concat util function in submitFormHandler in the EventForm and GoodDeed components
      createEvent: async (parent, args, context) => {

         if (context.user) {
            const event = await Event.create(args)

            if (event) {
               await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { events: event._id } }, { new: true, runValidators: true });
               return event;
            }
            // TODO: Also need an error handler here because this is not authentication-based
         } else {
            throw new AuthenticationError('You need to be logged in!');
         }
      },

      createGoodDeed: async (parent, args, context) => {
         if (context.user) {
            const goodDeed = await GoodDeed.create(args)
            // TODO: Make this consistent with event creation function (ie an if statement)
            await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { goodDeeds: goodDeed._id } }, { new: true, runValidators: true });
            return goodDeed;
         } else {
            throw new AuthenticationError('You need to be logged in!');
         }
      },

      //add connection
      addConnection: async (parent, { connectionId }, context) => {
         if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
               { _id: context.user._id },
               { $addToSet: { connections: connectionId } },
               { new: true }
            ).populate('connections');

            return updatedUser;
         }
         throw new AuthenticationError('You need to be logged in!');
      },

      // TODO: Add mutation for removing connection

      // add comment to event 
      addComment: async (parent, { eventId, commentText }, context) => {
         if (context.user) {
            const comment = await Comment.create({ commentText });
            const updatedEvent = await Event.findByIdAndUpdate(
               { _id: eventId },
               { $push: { comments: comment } },
               { new: true }
            ).populate('comments').populate('host').populate('attendees');

            return updatedEvent;
         }
         throw new AuthenticationError('You need to be logged in!');
      },

      // TODO: figure out if we need a separate mutation for adding comment to goodDeed or if we could use the one above
      // TODO: My two cents: have optional parameters and add comment to either event id or good deed id

      //add reply to comment
      addReply: async (parent, { commentId, replyBody }, context) => {
         if (context.user) {
            const updatedComment = await Comment.findOneAndUpdate(
               { _id: commentId },
               { $push: { replies: { replyBody } } },
               { new: true }
            ).populate('replies');

            return updatedComment;
         }
         throw new AuthenticationError('You need to be logged in!');
      },

      joinEvent: async (parent, { eventId, attendee }, context) => {
         if (context.user) {
            const updatedEvent = await Event.findOneAndUpdate(
               { _id: eventId },
               { $addToSet: { attendees: attendee } },
               { new: true }
            )
            return updatedEvent
         }

         throw new AuthenticationError('You need to be logged in!')
      },

      leaveEvent: async (parent, { eventId, attendee }, context) => {
         if (context.user) {
            const updatedEvent = await Event.findOneAndUpdate(
               { _id: eventId },
               { $pull: { attendees: attendee } },
               { new: true }
            )
            return updatedEvent
         }

         throw new AuthenticationError('You need to be logged in!')
      },

      joinGoodDeed: async (parent, { goodDeedId, helperId }, context) => {
         if (context.user) {
            const updatedGoodDeed = await GoodDeed.findOneAndUpdate(
               { _id: goodDeedId },
               { helper: helperId },
               { new: true }
            ).populate('helper')
            return updatedGoodDeed
         }

         throw new AuthenticationError('You need to be logged in!')
      },

      leaveGoodDeed: async (parent, { goodDeedId, helperId }, context) => {
         if (context.user) {
            const updatedGoodDeed = await GoodDeed.findOneAndUpdate(
               { _id: goodDeedId },
               { $unset: { helper: "" } },
               { new: true }
            ).populate('helper')
            return updatedGoodDeed
         }

         throw new AuthenticationError('You need to be logged in!')
      }
      // TODO: Create mutations for canceling events and good deeds -- we would need to delete the event from all associated users
      // TODO: ...and the Event itself from the array of Events
   }
}

module.exports = resolvers
