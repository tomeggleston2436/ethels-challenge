import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    

    event.locals.session = {
        data: cookies.session ? JSON.parse(cookies.session) : null
    };
    
    const response = await resolve(event);

    if (event.locals.session?.data) {
        // Set session cookie
        response.headers.set(
            'set-cookie',
            cookie.serialize('session', JSON.stringify(event.locals.session.data), {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7 // 1 week
            })
        );
       
    }

    return response;
}
