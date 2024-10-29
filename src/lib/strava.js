export async function createStravaToken(code) {
    const client_id = process.env.VITE_STRAVA_CLIENT_ID;
    const client_secret = process.env.VITE_STRAVA_CLIENT_SECRET;
    const grant_type = 'authorization_code';

    const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id,
            client_secret,
            code,
            grant_type
        })
    });

    return await response.json();
}
export async function fetchStravaActivities(access_token) {
    const url = 'https://www.strava.com/api/v3/athlete/activities';
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch data from Strava');
    }
    return response.json();
}