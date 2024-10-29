// src/routes/api/callback/+server.js
export async function GET({ url, locals }) {
    const code = url.searchParams.get('code');
    if (!code) {
        return new Response('Authorization code not found', { status: 400 });
    }

    try {
        const response = await fetch('https://www.strava.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.VITE_STRAVA_CLIENT_ID,
                client_secret: process.env.VITE_STRAVA_CLIENT_SECRET,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.VITE_STRAVA_REDIRECT_URI
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to exchange authorization code: ${await response.text()}`);
        }

        const data = await response.json();
        
        // Store token in the session or a secure place
        locals.session.data = { accessToken: data.access_token };

        // Redirect to a dashboard or home page
        return Response.redirect('/dashboard', 302);
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}
