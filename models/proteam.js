const mongoose = require("mongoose");

// define the schema for our user model
const proSchema = mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  shortName: {
    type: String
  },
  squadMarketValue: {
    type: String
  },
  crestUrl: {
    type: String
  }
});

// create the model for users and expose it to our app
module.exports = mongoose.model("Pro", proSchema);
