const fetchDummySearchData = require("../dummy/fetchData.js");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": process.env.HOST,
    Vary: "Origin",
  };

  try {
    const response = await fetchDummySearchData();
    const body = await response.json();

    console.log(body);

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
