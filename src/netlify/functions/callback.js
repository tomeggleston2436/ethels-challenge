// File: netlify/functions/callback.js
const axios = require('axios');

exports.handler = async function(event, context) {
  const { code } = event.queryStringParameters;
  const clientID = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;

  try {
    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: clientID,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
    });

    // Redirect the user back to your app, or manage the session as needed
    return {
      statusCode: 302,
      headers: {
        Location: '/your-app-url', // You could include some session token or status in the query
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
  }
};
