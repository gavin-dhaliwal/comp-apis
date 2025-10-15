const { validateEmail } = require("../../helpers/vaildator");
const { encrypt } = require("../../helpers/crypto");
const { resendClient } = require("../../api/resend");
const { magicLinkTemplate } = require("../../templates/magicLink.template");

const sendMagicLink = async (req, res) => {
  const { email } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).send({ error: "Invalid email" });
  }

  const verificationId = encrypt({
    email,
    expiry: Date.now() + 5 * 60 * 1000, // 5min in ms
  });

  // send email with callback url with verificationId

  const { error: resendError } = await resendClient.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Login to your account",
    html: magicLinkTemplate(
      `${"http://localhost:3000"}/login?verificationId=${verificationId}`
    ),
  });

  if (resendError) {
    console.error(resendError);
    return res.status(500).send({ error: "Failed to send email" });
  }

  return res.status(200).send({ message: "Magic link sent", verificationId });
};

module.exports = sendMagicLink;
