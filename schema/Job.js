const { Schema, model } = require("mongoose");

const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 100,
  },
});

module.exports = Job = model("job", JobSchema);
