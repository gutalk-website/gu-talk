const fetch = require('node-fetch');

const API_ENDPOINT = 'https://github.com/login/oauth/access_token';
const CLIENT_ID = '592223f26d426d6b7141';
const CLIENT_SECRET = process.env.CLIENT_SECRET;

console.log(`Get secret: ${CLIENT_SECRET}`);

exports.handler = async (event, context) => {
    try {
        let response = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${event.queryStringParameters.code}`,
            headers: {
                'accept': 'application/json'
            }
        });
        return {
            statusCode: response.status,
            body: await response.text(),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify(err)
        };
    }
}