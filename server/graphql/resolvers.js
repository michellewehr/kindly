const { User, Event, Comment, GoodDeed } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken, authMiddleware } = require('../utils/auth');


const resolvers = {
   Query: {

      // ** USERS

      // find current logged in user
      me: async (parent, args, context) => {
         if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('connections')
            .populate('events').populate({path: 'events', populate: 'host'})
            .populate('goodDeeds').populate({path: 'goodDeeds', populate: 'host'})
            
            return userData;
         }
         throw new AuthenticationError('Not logged in');
      },

      // get all users
      users: async () => {
         return await User.find().select('-__v -password').populate('connections').populate('events').populate('goodDeeds');
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

         if (!user) {
            throw new Error('Something went wrong when signing up. Please try again.');
         }
         const token = signToken(user)
         return { user, token }
      },

      login: async (parent, { email, password }) => {
         const user = await User.findOne({ email });

         if (!user) {
            throw new AuthenticationError('Incorrect login information');
         }

         const correctPassword = await user.isCorrectPassword(password);

         if (!correctPassword) {
            throw new AuthenticationError('Incorrect login information');
         }

         const token = signToken(user);
         return { token, user };
      },

      createEvent: async (parent, args, context) => {

         if (context.user) {
            const event = await Event.create({...args, host: context.user._id})

            if (!event) {
               throw new Error('Something went wrong when signing up. Please try again.');
            }
            await User.findByIdAndUpdate(
               { _id: context.user._id },
                { $push: { events: event._id } }, 
                { new: true });
            return event.populate('host').populate('attendees');
         } else {
            throw new AuthenticationError('You need to be logged in to create an event!');
         }
      },

      createGoodDeed: async (parent, args, context) => {
         if (context.user) {
            const goodDeed = await GoodDeed.create({...args, host: context.user._id});

            if (!goodDeed) {
               throw new Error('Something went wrong when signing up. Please try again.');
            }

            await User.findByIdAndUpdate(
               { _id: context.user._id }, 
               { $push: { goodDeeds: goodDeed._id } },
                { new: true });

            return goodDeed.populate('host').populate('attendees');
         } else {
            throw new AuthenticationError('You need to be logged in to create a good deed!');
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
         throw new AuthenticationError('You need to be logged in to add connections.');
      },

      // remove connection
      removeConnection: async (parent, { connectionId }, context) => {
         if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
               { _id: context.user._id },
               { $pull: { connections: connectionId } },
               { new: true }
            ).populate('connections');

            return updatedUser;
         }
         throw new AuthenticationError('You need to be logged in to add or remove connections.');
      },

      // add comment to event or a good deed
   addComment: async (parent, args, context) => {
      console.log(args.eventId)
      console.log(args.commentText);
      console.log(context.user);
      if (context.user) {
         const comment = await Comment.create({ ...args, author: context.user._id });
         console.log(comment);
         // check and set params for either event or good deed
         // const params = args.eventId ? { args.eventId, args.commentText } : { args.goodDeedId, args.commentText };

         // if params are event-oriented, update the event, otherwise update the good deed
         if (args.eventId) {
            const updatedEvent = await Event.findByIdAndUpdate(
               { _id: args.eventId },
               { $push: { comments: comment } },
               { new: true }
            ).populate('comments').populate({path: 'comments', populate: 'author'});
            return updatedEvent;
         } else if(args.goodDeedId) {
            const updatedGoodDeed = await GoodDeed.findByIdAndUpdate(
               { _id: args.goodDeedId },
               { $push: { comments: comment } },
               { new: true }
            ).populate('helper');
            return updatedGoodDeed.populate({path: 'comments', populate: 'author'});
         } else {
            throw new Error('Something went wrong!');
         }
      } throw new AuthenticationError('You need to be logged in!');
},



      //add reply to comment
      addReply: async (parent, { commentId, replyBody }, context) => {
         console.log(context.user);
         if (context.user) {
            const updatedComment = await Comment.findOneAndUpdate(
               { _id: commentId },
               { $push: { replies: { replyBody, author: context.user._id } } },
               { new: true, runValidators: true }
            ).populate('replies').populate({path: 'replies', populate: 'author'});

            return updatedComment;
         }
         throw new AuthenticationError('You need to be logged in!');
      },

      joinEvent: async (parent, { eventId }, context) => {
         if (context.user) {
            const updatedEvent = await Event.findOneAndUpdate(
               { _id: eventId },
               { $addToSet: { attendees: context.user._id } },
               { new: true }
            )

            //add to users events array
            const updatedUser = await User.findOneAndUpdate(
               { _id: context.user._id},
               { $push: {events: eventId}},
               {new: true}
            )
            return updatedEvent.populate('attendees')
         }

         throw new AuthenticationError('You need to be logged in!')
      },

      leaveEvent: async (parent, { eventId }, context) => {
         if (context.user) {
            const updatedEvent = await Event.findOneAndUpdate(
               { _id: eventId },
               { $pull: { attendees: context.user._id } },
               { new: true }
            )

            //take from users events array 
            const updatedUser = await User.findOneAndUpdate(
               { _id: context.user._id},
               { $pull: {events: eventId}},
               {new: true}
            )
            return updatedEvent.populate('attendees');
         }

         throw new AuthenticationError('You need to be logged in!')
      },

      // TODO: look into this one
      cancelEvent: async (parent, { eventId }, context) => {
         if (context.user) {
            // remove all associated users from event before deleting it
            const updatedEvent = await Event.findOneAndUpdate(
               { _id: eventId },
               { $unset: { attendees: [] } },
               { $unset: { host: "" } },
               { new: true }
            )
            // delete the event fully
            const removeEvent = await Event.findByIdAndRemove(
               { _id: eventId },
               { new: true }
            )
            // return the new list of all events to verify the deleted event is no longer listed
            return await Event.find({})
         }
         throw new AuthenticationError('You need to be logged in!')
      },

      // cancel good deed
      cancelGoodDeed: async (parent, { goodDeedId }, context) => {
         if (context.user) {
            // const updatedGoodDeed = await GoodDeed.findOneAndUpdate(
            //    { _id: goodDeedId },
            //    { $unset: { helper: "" } },
            //    { $unset: { host: "" } },
            //    { new: true }
            // )

            //delete entirely 
            const removeGoodDeed = await GoodDeed.findByIdAndRemove(
               { _id: goodDeedId },
               { new: true }
            )

            return await GoodDeed.find({}).populate('helper').populate('host');
         }
         throw new AuthenticationError('You need to be logged in!');
      },

      
      joinGoodDeed: async (parent, { goodDeedId }, context) => {
         if (context.user) {
            const updatedGoodDeed = await GoodDeed.findOneAndUpdate(
               { _id: goodDeedId },
               { helper: context.user._id },
               { new: true }
            ).populate('helper').populate('host');

            //add to users goodDeeds array
            const updatedUser = await User.findOneAndUpdate(
               { _id: context.user._id},
               { $push: {goodDeeds: goodDeedId}},
               {new: true}
            )

            return updatedGoodDeed;
         }

         throw new AuthenticationError('You need to be logged in!')
      },

      leaveGoodDeed: async (parent, { goodDeedId, helperId }, context) => {
         if (context.user) {
            const updatedGoodDeed = await GoodDeed.findOneAndUpdate(
               { _id: goodDeedId },
               { $unset: { helper: "" } },
               { new: true }
            ).populate('helper').populate('host')

              //add to users goodDeeds array
              const updatedUser = await User.findOneAndUpdate(
               { _id: context.user._id},
               { $pull: {goodDeeds: goodDeedId}},
               {new: true}
            )

            return updatedGoodDeed;
         }

         throw new AuthenticationError('You need to be logged in!')
      }
   }
};

module.exports = resolvers
