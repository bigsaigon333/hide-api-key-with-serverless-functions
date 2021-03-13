const fetchDummySearchData = require("../dummy/fetchData.js");
const stringify = require("../utils/stringify.js");

exports.handler = async () => {
  const headers = {
    "Access-Control-Allow-Origin": process.env.HOST,
    Vary: "Origin",
  };

  try {
    const body = await fetchDummySearchData();

    console.log(body);

    return {
      statusCode: 200,
      ok: true,
      headers,
      body: stringify(body),
    };
  } catch (error) {
    return {
      statusCode: 400,
      ok: false,
      headers,
      body: stringify(error),
    };
  }
};
