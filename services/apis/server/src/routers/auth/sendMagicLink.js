const { validateEmail } = require("../../helpers/vaildator");
const { supabase } = require("../../api/supabase");
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
    console.error(error);
    return res.status(500).send({ error: "Failed to send email" });
  }

  // const { error: supabaseError } = await supabase
  //   .from("email_verification")
  //   .insert({ email, verification_id: verificationId });

  // if (supabaseError) {
  //   console.error(error);
  //   return res.status(500).send({ error: "Failed to store verification id" });
  // }

  return res.status(200).send({ message: "Login successful" });
};

module.exports = sendMagicLink;
