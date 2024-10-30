import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals }) {
    const code = url.searchParams.get('code');
    if (!code) {
        throw redirect(303, '/');
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
            throw new Error('Failed to exchange token');
        }

        const data = await response.json();
        
        // Initialize session if it doesn't exist
        if (!locals.session) {
            locals.session = {};
        }
        
        // Set session data
        locals.session.data = { 
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: data.expires_at
        };

        throw redirect(303, '/dashboard');
    } catch (error) {
        console.error('Auth error:', error);
        throw redirect(303, '/?error=auth_failed');
    }
}