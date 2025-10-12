const { validateEmail } = require("../../helpers/vaildator");
const { supabase } = require("../../api/supabase");
const { encrypt } = require("../../helpers/crypto");

const sendMagicLink = async (req, res) => {
  const { email } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).send({ error: "Invalid email" });
  }

  const verificationId = encrypt({
    email,
    expiry: Date.now() + 5 * 60 * 1000, // 5min in ms
  });

  const { error } = await supabase
    .from("email_verification")
    .insert({ email, verification_id: verificationId });

  if (error) {
    console.error(error);
    return res.status(500).send({ error: "Failed to store verification id" });
  }

  // send email with callback url with verificationId

  return res.status(200).send({ message: "Login successful" });
};

module.exports = sendMagicLink;
