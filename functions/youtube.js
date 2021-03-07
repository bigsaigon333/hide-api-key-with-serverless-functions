const fetch = require("node-fetch");
const querystring = require("querystring");

exports.handler = async (event) => {
  const { path, queryStringParameters } = event;

  const YOUTUBE_ENDPOINT = "https://www.googleapis.com/youtube/v3";
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
    const URI = `${YOUTUBE_ENDPOINT}/${apiMethod}?${parameters}`;
    const response = await fetch(URI);
    const body = await response.json();

    if (body.error) {
      return {
        statusCode: body.error.code,
        ok: false,
        headers,
        body: JSON.stringify(body, null, " "),
      };
    }

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
