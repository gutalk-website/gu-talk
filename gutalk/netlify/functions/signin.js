const fetch = require('node-fetch');

const API_ENDPOINT = 'https://github.com/login/oauth/access_token';
const CLIENT_ID = '10563cad7a654a79848c';
const CLIENT_SECRET = process.env.CLIENT_SECRET;

exports.handler = async (event, context) => {
    let response;
    try {
        response = await fetch(API_ENDPOINT, {
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