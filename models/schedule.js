const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({

    totalTesters: {
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

const schedules = mongoose.model("schedules", scheduleSchema);

module.exports = schedules;