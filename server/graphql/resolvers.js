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
         return await Event.find().populate('host').populate('attendees').populate('comments');
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
      },
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

      // TODO: Call in name concat util function in submitFormHandler in the EventForm and GoodDeed components
      createEvent: async (parent, args, context) => {

         // * create event with args body
         const event = await Event.create(args);
         if (context.user) {
            const event = await Event.create(args)
            await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { events: event._id } }, { new: true, runValidators: true });
            return event;
         } else {
            throw new AuthenticationError('You need to be logged in!');
         }
      },

      createGoodDeed: async (parent, args, context) => {
         if (context.user) {
            const goodDeed = await GoodDeed.create(args)
            await User.findByIdAndUpdate({ _id: context.user._id }, { $push: { goodDeeds: goodDeed._id } }, { new: true, runValidators: true });
            return goodDeed;
         } else {
            throw new AuthenticationError('You need to be logged in!');
         }
      },

      //add connection
      addConnection: async(parent, {connectionId}, context) => {
         if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
               { _id: context.user._id},
               { $addToSet: { connections: connectionId }},
               { new: true }
            ).populate('connections');

            return updatedUser;
         }
         throw new AuthenticationError('You need to be logged in!');
      }, 

      // add comment to event 
      addComment: async(parent, {eventId, commentText }, context) => {
         if(context.user) {
            console.log(parent);
            const comment = await Comment.create({commentText});
            console.log(comment);
            
            const updatedEvent = await Event.findByIdAndUpdate(
               { _id: eventId },
               { $push: {comments: comment}},
               {new: true}
            ).populate('comments').populate('host').populate('attendees');

            return updatedEvent; 
         }
         throw new AuthenticationError('You need to be logged in!');
      }, 

      // TODO: figure out if we need a separate mutation for adding comment to goodDeed or if we could use the one above

      //add reply to comment
      addReply: async(parent, {commentId, replyBody}, context) => {
         if(context.user) {
            const updatedComment = await Comment.findOneAndUpdate(
               { _id: commentId}, 
               { $push: {replies: { replyBody }}}, 
               {new: true}
            ).populate('replies');

            return updatedComment;
         }
         throw new AuthenticationError('You need to be logged in!');
      }
   }
}

module.exports = resolvers
