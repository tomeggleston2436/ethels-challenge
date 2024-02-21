<script>
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabaseConfig';

  let email = '';
  let password = '';
  let confirmPassword = '';
  let isLogin = true;
  let name = '';

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

  function toggleForm() {
    isLogin = !isLogin;
  }
</script>



<form on:submit|preventDefault={isLogin ? login : signUp} class="space-y-6 bg-LP p-6 shadow-md rounded-lg max-w-md mx-auto my-8">
  {#if !isLogin}
    <div>
      <label for="name" class="block text-sm font-medium text-DG">Name</label>
      <input type="text" bind:value={name} id="name" class="mt-1 block w-full px-3 py-2 bg-white border border-DG rounded-md shadow-sm focus:outline-none focus:ring-Orange focus:border-Orange" placeholder="Full Name" required>
    </div>
  {/if}
  
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
    <input type="email" bind:value={email} id="email" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="you@example.com" required>
  </div>

  <div>
    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
    <input type="password" bind:value={password} id="password" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="••••••••" required>
  </div>

  {#if !isLogin}
    <div>
      <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
      <input type="password" bind:value={confirmPassword} id="confirm-password" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="••••••••" required>
    </div>
  {/if}

  <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-Orange hover:bg-hover-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    {isLogin ? 'Login' : 'Sign Up'}
  </button>

  <button type="button" on:click={toggleForm} class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-HG hover:bg-DG focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-HG">
    {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
  </button>
</form>
