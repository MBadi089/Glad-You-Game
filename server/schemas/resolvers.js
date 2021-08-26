const { User, Game } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedGames');
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    game: async (parent, { gameId }) => {
      return Game.findOne({ gameId });
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addReview: async(parent, { gameId, reviewBody }, context) => {
      console.log('addReview')
      if (context.user) {
        const updatedGame = await Game.findOneAndUpdate(
          { gameId: gameId },
          { $push: { reviews: { reviewBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedGame;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    saveGame: async (parent, { gameData } , context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedGames: gameData } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticaionError('You need to be logged in!');
    },

    removeGame: async (parent, { gameId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedGames: { gameId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;