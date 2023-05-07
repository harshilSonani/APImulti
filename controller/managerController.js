const managerdb = require("../model/managerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cookie = require("cookie-parser");
const employeedb = require("../model/employeesModel");

module.exports.insertManager = async (req, res) => {
  let data = await managerdb.findOne({ email: req.body.email });

  if (data) {
    return res.json({ status: 400, msg: "email taken" });
  } else {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let managerData = await managerdb.create(req.body);
    return res.json({ status: 200, msg: "manager inserted" });
  }
};

module.exports.managerLogin = async (req, res) => {
  let data = await managerdb.findOne({ email: req.body.email });

  if (data) {
    let pass = await bcrypt.compare(req.body.password, data.password);

    if (pass) {
      let token = await jwt.sign({ token: data }, "coder1", {
        expiresIn: 60 * 100 * 1000,
      });
      res.cookie("eee", token);

      return res.json({ status: 200, msg: "manager login", token });
    } else {
      return res.json({ status: 400, msg: "password not match" });
    }
  } else {
    return res.json({ status: 400, msg: "email not found" });
  }
};

module.exports.managerProfile = async (req, res) => {
  let data = await managerdb.find({});
  
  let d = await req.cookies.eee;
  
  let mData = await jwt.verify(d, 'coder1')
  
  

  return res.json({ status: 200, msg: "manager login", mData });
};

module.exports.viewEmployees = async (req, res) => {
  let d = await req.cookies.eee;

  let data = await jwt.verify(d, "coder1");

  let eData = await employeedb.find({ managerID: data.token._id });

  return res.json({ status: 200, eData });
};
