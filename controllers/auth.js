const { response } = require("express");
const User = require("../database/models/User");

const createUser = async (req, res = response) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "A user with this email already exists",
      });
    }

    user = new User({ ...req.body });
    await user.save();

    const { id, name } = user;

    return res.status(201).json({
      ok: true,
      msg: "Register",
      id,
      name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the admin",
    });
  }
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
