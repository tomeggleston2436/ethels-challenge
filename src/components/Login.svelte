<script>
    import { supabase } from './supabaseClient';
    import { goto } from '$app/navigation'; // Only for SvelteKit
  
    let email = '';
    let password = '';
  
    async function login() {
      const { user, error } = await supabase.auth.signIn({ email, password });
  
      if (error) console.error('Error logging in:', error.message);
      else goto('/profile'); // Redirect on successful login. Adjust the path as needed.
    }
  </script>
  
  <form on:submit|preventDefault={login}>
    <input type="email" bind:value={email} placeholder="Email">
    <input type="password" bind:value={password} placeholder="Password">
    <button type="submit">Log in</button>
  </form>
  