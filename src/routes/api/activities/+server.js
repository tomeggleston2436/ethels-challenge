/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
    if (!locals.session?.data?.accessToken) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        // Include additional parameters for map data
        const params = new URLSearchParams({
            per_page: '200', // Get more activities
            include_all_efforts: 'true'
        });
        
        const response = await fetch(
            `https://www.strava.com/api/v3/athlete/activities?${params}`, 
            {
                headers: {
                    'Authorization': `Bearer ${locals.session.data.accessToken}`
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch activities from Strava');
        }

        const activities = await response.json();
        
        // Log the first activity to see its structure
        if (activities.length > 0) {
           
        }

        return new Response(JSON.stringify(activities), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching activities:', error);
        return new Response(error.message, { status: 500 });
    }
}