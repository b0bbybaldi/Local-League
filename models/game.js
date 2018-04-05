const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  dateAndTime: { type: String, required: true },
  NumPlayer: { type: String, required: true },
  teamOne: String,
  teamTwo: String,
  itemsNeeded: { type: Array, required: true },
  address: String,
  userId: String,
  location: String,
  players: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds refer to the ids in the user model
      ref: "User"
    }
  ]
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
