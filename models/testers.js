const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testerSchema = new Schema({

  name: {
    type: String,
    trim: true,
    require: "Name is required"
  },

  available:{
    type: Boolean,
  },

});

const Testers = mongoose.model("testers", testerSchema);

module.exports = Testers;


