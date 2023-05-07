const admindb = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const managerdb = require("../model/managerModel");
const employeedb = require("../model/employeesModel");
const Cookie = require("cookie-parser");

module.exports.insertAdmin = async (req, res) => {
  let data = await admindb.findOne({ email: req.body.email });

  if (data) {
    return res.json({ status: 400, msg: "this email taken" });
  } else {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    let admin = await admindb.create(req.body);
    return res.json({ status: 200, msg: "admin insert" });
  }
};

module.exports.adminRecord = async (req, res) => {
  let data = await admindb.find({});
  var d = await req.cookies.adminC;

  var aData = await jwt.verify(d, "coder");

  return res.json({'status' : 200, aData});
};

module.exports.adminLogin = async (req, res) => {
  let data = await admindb.findOne({ email: req.body.email });

  if (data) {
    let pass = await bcrypt.compare(req.body.password, data.password);

    if (pass) {
      let token = await jwt.sign({ token: data }, "coder", {expiresIn: 60 * 100 * 1000,});
      res.cookie("adminC", token);

      return res.json({ status: 200, msg: "admin login", token });
    } else {
      return res.json({ status: 400, msg: "no token" });
    }
  } else {
    return res.json({ status: 400, msg: "admin not login" });
  }
};

module.exports.viewManager = async (req, res) => {
  var d = await req.cookies.adminC;

  let data = await jwt.verify(d, "coder");

  let mData = await managerdb.find({ adminID: data.token._id });

  return res.json({ status: 200, "manager data": mData });
};

module.exports.viewEmployee = async (req, res) => {
  var d = await req.cookies.adminC;
  var data = await jwt.verify(d, "coder");

  let eData = await employeedb.find({ adminID: data.token._id });

  return res.json({ status: 200, "employee data": eData });
};
