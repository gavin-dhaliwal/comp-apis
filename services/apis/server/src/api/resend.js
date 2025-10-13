const { Resend } = require("resend");

const resendClient = new Resend(process.env.RESEND_KEY);

module.exports = {
  resendClient,
};
