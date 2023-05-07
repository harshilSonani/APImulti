const employeesdb = require("../model/employeesModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cookie = require("cookie-parser");

module.exports.insertemployees = async (req, res) => {
  let data = await employeesdb.findOne({ email: req.body.email });

  if (data) {
    return res.json({ status: 400, msg: "this email taken" });
  } else {
    console.log(req.body.password);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let eData = await employeesdb.create(req.body);
    return res.json({ status: 200, msg: "employee insert" });
  }
};

module.exports.epmloyeeLogin = async (req, res) => {
  let data = await employeesdb.findOne({ email: req.body.email });

  if (data) {
    let pass = await bcrypt.compare(req.body.password, data.password);

    if (pass) {
      let token = await jwt.sign({ token: data }, "coder3", {expiresIn: 60 * 100 * 1000,});
      res.cookie('employee', token)

      return res.json({ status: 200, msg: "employee login", token });

    } else {
      return res.json({ status: 400, msg: "password not match" });
    }
  } else {
    return res.json({ status: 400, msg: "email not match" });
  }
};

module.exports.employeeProfile = async (req,res) =>{
  let d = await req.cookies.employee;
  let data = await jwt.verify(d, 'coder3');

  return res.json({'status' : 200, data});
}