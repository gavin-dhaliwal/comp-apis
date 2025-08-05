const express = require("express");
const router = express.Router();

router.post("/sendMagicLink", (req, res) => {
  res.status(200).send({ message: "Login successful" });
});

module.exports = router;
