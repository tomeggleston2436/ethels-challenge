export async function POST({ request, locals }) {
    const { code } = await request.json();
    
    if (!code) {
        return new Response('Authorization code not found', { status: 400 });
    }

    try {
        const response = await fetch('https://www.strava.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
                client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
                code: code,
                grant_type: 'authorization_code'
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to exchange authorization code: ${await response.text()}`);
        }

        const data = await response.json();
        
        // Store token in the session
        if (!locals.session) {
            locals.session = {};
        }
        locals.session.data = { accessToken: data.access_token };

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Auth error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// Also handle GET requests for backward compatibility
export async function GET({ url, locals }) {
    const code = url.searchParams.get('code');
    if (!code) {
        return new Response('Authorization code not found', { status: 400 });
    }

    // Redirect to home with the code
    return new Response(null, {
        status: 302,
        headers: { Location: `/?code=${code}` }
    });
}