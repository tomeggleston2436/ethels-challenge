// src/routes/supabase/+server.js



import { supabase } from '../supabaseConfig';



export const POST = async ({ request }) => {
    const data = await request.json();

supabaseConfig.js
    // Example: Signup Logic
    if (data.action === 'signup') {
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password
        });
    } else if (data.action === 'login') {
        const { user, session, error } = await supabase.auth.signIn({
            email: data.email,
            password: data.password
        });

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 400 });
        }

        return new Response(JSON.stringify({ user, session }), { status: 200 });
    } else {
        return new Response({ status: 500 }, { error: 'Unsupported action' });
    }
};





