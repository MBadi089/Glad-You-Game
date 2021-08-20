const { Schema } = require('mongoose');
const reviewSchema = require('./Review');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedGames` array in User.js
const gameSchema = new Schema(
  {
    // id from API
    gameId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    image: {
      type: String,
    },
    rating: {
      type: Number
    },
    ratings_count: {
      type: Number
    },
    esrb: {
      type: String
    },
    reviews: [reviewSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

gameSchema.virtual('reviewCount').get(function() {
  return this.reviews.length;
});

module.exports = gameSchema;