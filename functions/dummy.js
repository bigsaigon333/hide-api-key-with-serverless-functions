const fetchDummySearchData = require("../dummy/fetch.js");

exports.handler = async () => {
  const headers = {
    "Access-Control-Allow-Origin": process.env.HOST,
    Vary: "Origin",
  };

  try {
    const body = await fetchDummySearchData();

    return {
      statusCode: 200,
      ok: true,
      headers,
      body: JSON.stringify(body, null, " "),
    };
  } catch (error) {
    return {
      statusCode: 400,
      ok: false,
      headers,
      body: JSON.stringify(error, null, " "),
    };
  }
};
