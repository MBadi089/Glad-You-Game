const { Schema, model } = require('mongoose');
const reviewSchema = require('./Review');

const gameSchema = new Schema(
  {
    // id from API
    gameId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
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

const Game = model('Game', gameSchema);

module.exports = Game;