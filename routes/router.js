const express = require("express");
const model = require("./model");
const restrict = require("../middleware/restrict");

const router = express.Router();

router.get("/", restrict, async (req, res, next) => {
  try {
    const users = await model.find();

    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
