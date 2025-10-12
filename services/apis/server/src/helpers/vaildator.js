const { emailRegex } = require("../constants/regex");

const validateEmail = email => {
  return emailRegex.test(email);
};

module.exports = {
  validateEmail,
};
