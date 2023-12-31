const { EMAIL_TOKEN } = process.env;
import fetch from 'node-fetch';

exports.handler = async (event, context) => {
    const email = JSON.parse(event.body).payload.email
    console.log(`Received a submission: ${email}`)

    const response = await fetch(
        'https://api.convertkit.com/v3/forms/5545363/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            api_key: EMAIL_TOKEN,
            email: email
        }),
    }
    );
    let responseText = await response.text();
    console.log('response:', responseText);
    return {
        statusCode: 302,
        headers: {
            'Location': '/confirmation/',
        },
    }
}