const express = require("express");
const router = express.Router();

// Import your route handlers
const sendMagicLink = require("./sendmagiclink");

// Define routes
router.post("/sendMagicLink", sendMagicLink);

// You can add more auth routes here
// router.post('/verify-magic-link', verifyMagicLink);
// router.post('/logout', logout);

module.exports = router;
