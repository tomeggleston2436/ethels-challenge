/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
    if (!locals.session?.data?.accessToken) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const response = await fetch('https://www.strava.com/api/v3/athlete', {
            headers: {
                'Authorization': `Bearer ${locals.session.data.accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch athlete data from Strava');
        }

        const athlete = await response.json();
        return new Response(JSON.stringify(athlete), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching athlete:', error);
        return new Response(error.message, { status: 500 });
    }
}