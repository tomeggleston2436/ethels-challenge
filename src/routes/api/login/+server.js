export async function GET() {
    const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_STRAVA_REDIRECT_URI || 'https://ethels.netlify.app/';
    const scope = 'read_all,profile:read_all,activity:read_all';
    const responseType = 'code';
    const approvalPrompt = 'auto';
    
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&approval_prompt=${approvalPrompt}`;
    
    return Response.redirect(authUrl, 302);
}