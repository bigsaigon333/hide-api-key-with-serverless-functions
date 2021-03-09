const data = require("./data.js");

module.exports = () => {
  const randomIndex = Math.floor(Math.random() * data.length);

  return Promise.resolve(data[randomIndex]);
};
