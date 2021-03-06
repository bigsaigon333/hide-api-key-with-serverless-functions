const fetch = require("node-fetch");
const querystring = require("querystring");

exports.handler = async (event) => {
  const { path, queryStringParameters } = event;

  const ENDPOINT = "https://www.googleapis.com/youtube/v3";
  const apiMethod = path.split("/").pop();
  const parameters = querystring.stringify({
    ...queryStringParameters,
    key: process.env.API_KEY,
  });
  const headers = {
    "Access-Control-Allow-Origin": process.env.HOST,
    Vary: "Origin",
  };

  try {
    const URI = `${ENDPOINT}/${apiMethod}?${parameters}`;
    const response = await fetch(URI);
    const json = await response.json();

    return {
      statusCode: 200,
      ok: true,
      headers,
      body: JSON.stringify(json),
    };
  } catch (error) {
    return {
      statusCode: 404,
      statusText: error.message,
      ok: false,
      headers,
    };
  }
};
