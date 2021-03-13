const { data: dummySearchData } = require("./searchData.js");

module.exports = () => {
  const randomIndex = Math.floor(Math.random() * dummySearchData.length);

  return Promise.resolve(dummySearchData[randomIndex]);
};
