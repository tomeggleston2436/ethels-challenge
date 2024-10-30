export async function GET({ url, locals }) {
    // Get code from URL search params
    const code = url.searchParams.get('code');
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
                grant_type: 'authorization_code',
                redirect_uri: import.meta.env.VITE_STRAVA_REDIRECT_URI || 'https://ethels.netlify.app/'
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to exchange authorization code: ${await response.text()}`);
        }

        const data = await response.json();
        
        // Store token in the session
        locals.session.data = { accessToken: data.access_token };
        
        // Redirect to dashboard with base URL
        const baseUrl = import.meta.env.VITE_BASE_URL || 'https://ethels.netlify.app/';
        return Response.redirect(`${baseUrl}/dashboard`, 302);
    } catch (error) {
        console.error('Auth error:', error);
        const baseUrl = import.meta.env.VITE_BASE_URL || 'https://ethels.netlify.app/';
        return Response.redirect(`${baseUrl}?error=auth_failed`, 302);
    }
}