// src/routes/api/activities/+server.js
export async function GET({ locals }) {
    const accessToken = locals.session?.accessToken;  // Adjust based on your session management
    if (!accessToken) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const response = await fetch('https://www.strava.com/api/v3/athlete/activities', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch activities from Strava');
        }

        const activities = await response.json();
        return new Response(JSON.stringify(activities), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}
