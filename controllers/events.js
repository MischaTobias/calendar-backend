const { response } = require("express");

const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate("user", "name");
    return res.status(200).json({ ok: true, events });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Contact admin about this error" });
  }
};

const createEvent = async (req, res = response) => {
  try {
    const event = await Event.create({ ...req.body, user: req.uid });
    return res.status(201).json({ ok: true, event });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Contact admin about this error" });
  }
};

const updateEvent = async (req, res = response) => {
  try {
    const eventId = req.params.id;
    const uid = req.uid;

    const event = await Event.findById(eventId);

    if (!event)
      return res
        .status(404)
        .json({ ok: false, msg: "There is not event with that id" });

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "Not enough privileges to edit this event",
      });

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return res.status(200).json({ ok: true, event: updatedEvent });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Contact admin about this error" });
  }
};

const deleteEvent = async (req, res = response) => {
  try {
    const eventId = req.params.id;
    const uid = req.uid;

    const event = await Event.findById(eventId);

    if (!event)
      return res
        .status(404)
        .json({ ok: false, msg: "There is not event with that id" });

    if (event.user.toString() !== uid)
      return res.status(401).json({
        ok: false,
        msg: "Not enough privileges to remove this event",
      });

    await Event.findByIdAndDelete(eventId);
    return res.status(200).json({ ok: true });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Contact admin about this error" });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
