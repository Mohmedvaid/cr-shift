const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({

    totalTester: {
        type: Number,
        trim: true,
        require: "Number of testers cannot be empty"
    },

    totalDuration: [
        {
            type: String,
            trim: true
        }
    ]

});

const schedule = mongoose.model("schedule", scheduleSchema);

module.exports = schedule;