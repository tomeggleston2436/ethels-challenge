// src/routes/api/login/+server.js
export async function GET() {
    const clientId = process.env.VITE_STRAVA_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.VITE_STRAVA_REDIRECT_URI);
    const scope = 'read_all,profile:read_all,activity:read_all'; // Specify required scopes here
    const responseType = 'code';
    const approvalPrompt = 'auto';

    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&approval_prompt=${approvalPrompt}`;

    return Response.redirect(authUrl, 302);
}
