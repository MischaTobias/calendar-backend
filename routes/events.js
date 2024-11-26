/*
  This is the events route
  host + /api/events
*/
const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/fields-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

// MIDDLEWARES
router.use(validateJWT);

// ROUTES
router.get("/", getEvents);

router.post(
  "/",
  check("title", "Title is mandatory").not().isEmpty(),
  check("start", "Start date is mandatory").custom(isDate),
  check("end", "End date is mandatory").custom(isDate),
  validateFields,
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
