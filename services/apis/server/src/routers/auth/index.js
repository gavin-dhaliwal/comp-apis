const express = require("express");
const router = express.Router();

// Import your route handlers
const sendMagicLink = require("./sendMagicLink");
const verifyMagicLink = require("./verifyMagicLink");

// Define routes
router.post("/sendMagicLink", sendMagicLink);
router.post("/verifyMagicLink", verifyMagicLink);

// You can add more auth routes here
// router.post('/verify-magic-link', verifyMagicLink);
// router.post('/logout', logout);

module.exports = router;
