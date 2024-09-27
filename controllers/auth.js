const { response } = require("express");

const createUser = (req, res = response) => {
  const { name, email, password } = req.body;

  return res.status(201).json({
    ok: true,
    msg: "Register",
    name,
    email,
    password,
  });
};

const revalidateToken = (req, res) => {
  return res.json({
    ok: true,
    msg: "Token renewed",
  });
};

const userLogin = (req, res = response) => {
  const { email, password } = req.body;

  return res.status(200).json({
    ok: true,
    msg: "Login",
    email,
    password,
  });
};

module.exports = {
  createUser,
  revalidateToken,
  userLogin,
};
