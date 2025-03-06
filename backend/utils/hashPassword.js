const bcrypt = require("bcrypt");

const hashPassword = async (userPassword) => {
  const saltRound = 10;
  return await bcrypt.hash(userPassword, saltRound);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };