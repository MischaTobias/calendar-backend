/*
  This is the auth route
  host + /api/auth
*/
const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const {
  createUser,
  revalidateToken,
  userLogin,
} = require("../controllers/auth");
const { validateFields } = require("../middlewares/fields-validator");

// ROUTES

router.get("/renewToken", revalidateToken);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password should be at least 6 characters long").isLength(
      { min: 6 }
    ),
    validateFields,
  ],
  userLogin
);

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be at least 6 characters long").isLength(
      { min: 6 }
    ),
    validateFields,
  ],
  createUser
);

module.exports = router;
