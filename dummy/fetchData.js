const { data: dummySearchData } = require("./searchData.js");

module.exports = () => {
  const randomIndex = Math.floor(Math.random() * dummySearchData.length);

  console.log(dummySearchData[randomIndex]);

  return Promise.resolve(dummySearchData[randomIndex]);
};
