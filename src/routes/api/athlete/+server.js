/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
    

    if (!locals.session?.data?.accessToken) {
        console.log('No access token found');
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const response = await fetch('https://www.strava.com/api/v3/athlete', {
            headers: {
                'Authorization': `Bearer ${locals.session.data.accessToken}`
            }
        });

        if (!response.ok) {
            console.error('Strava API error:', response.status);
            const errorText = await response.text();
            console.error('Error details:', errorText);
            throw new Error('Failed to fetch athlete data from Strava');
        }

        const athlete = await response.json();
        console.log('Athlete data fetched successfully');
        
        return new Response(JSON.stringify(athlete), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error in athlete endpoint:', error);
        return new Response(error.message, { status: 500 });
    }
}
