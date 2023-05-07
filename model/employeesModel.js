const mongoose = require("mongoose");

const employeesSchema = mongoose.Schema({
  adminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin record",
    required: true,
  },
  managerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "manager record",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
});

const employees = mongoose.model("employees record", employeesSchema);
module.exports = employees;
