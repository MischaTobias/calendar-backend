const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateToken } = require("../helpers/jwt");

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

    // encrypt password
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    // generate token
    const token = await generateToken(user.id, user.name);

    const { id, name } = user;

    return res.status(201).json({
      ok: true,
      uid: id,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the admin",
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const { uid, name } = req;

  const token = await generateToken(uid, name);

  return res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

const userLogin = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    const msg = "Email or password is incorrect";

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg,
      });
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        ok: false,
        msg,
      });
    }

    // generate token
    const token = await generateToken(user.id, user.name);

    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the admin",
    });
  }
};

module.exports = {
  createUser,
  revalidateToken,
  userLogin,
};
