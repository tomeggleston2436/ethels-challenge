/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
    if (locals.session) {
        locals.session.data = null;
    }
    return new Response(null, {
        status: 302,
        headers: {
            'Location': '/',
            'Set-Cookie': 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
    });
}
