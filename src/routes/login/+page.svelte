<script>
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabaseConfig';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let isSignup = false; // Updated to reflect the action directly

  async function signUp() {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Signup successful! Check your email for a confirmation link.');
      goto('/profile'); // Adjust as necessary
    }
  }

  async function login() {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      goto('/profile'); // Adjust as necessary
    }
  }
</script>



{#if isSignup}
  <form on:submit|preventDefault={signUp}>
    <!-- Signup form fields -->
    <input type="email" bind:value={email} placeholder="Email">
    <input type="password" bind:value={password} placeholder="Password">
    <input type="password" bind:value={confirmPassword} placeholder="Confirm Password">
    <button type="submit">Sign Up</button>
  </form>
{:else}
  <form on:submit|preventDefault={login}>
    <!-- Login form fields -->
    <input type="email" bind:value={email} placeholder="Email">
    <input type="password" bind:value={password} placeholder="Password">
    <button type="submit">Log In</button>
  </form>
{/if}

<button on:click={() => isSignup = !isSignup}>
  {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
</button>


