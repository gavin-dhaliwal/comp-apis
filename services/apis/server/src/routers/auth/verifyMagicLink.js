const { admin } = require("../../api/firebase");
const { decrypt } = require("../../helpers/crypto");

const verifyMagicLink = async (req, res) => {
  const { verificationId } = req.body;

  const { email, expiry } = decrypt(verificationId);

  if (expiry < Date.now()) {
    return res.status(400).send({ error: "Magic link expired" });
  }

  let user = null;

  try {
    user = await admin.auth().getUserByEmail(email);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      user = await admin.auth().createUser({
        email: email,
        emailVerified: true,
      });
    }

    return res.status(400).send({ error: "Error getting user" });
  }

  const customToken = await admin.auth().createCustomToken(user.uid);

  return res.status(200).send({ customToken });
};

module.exports = verifyMagicLink;
