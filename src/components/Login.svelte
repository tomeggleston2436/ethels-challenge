<script>
  import { supabase } from '../../supabaseConfig';
  
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let isLogin = true;
  let confirmPassword = '';

  async function login() {
  try {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password 
    });

    if (error) throw error;  

    console.log('Logged in user:', user); 
    // Handle Successful Login: 
     // a) Redirect ('/profile')
     // b) Store user data as needed
  } catch (error) {
    console.error('Error logging in:', error);
    // Handle Login Errors
  }
}

async function signup() {
    try {
      if (password !== confirmPassword) {
        // Handle the case when passwords don't match
        alert('Passwords do not match!'); 
        return; // Stop signup attempt
      }
        const { user, session, error } = await supabase.auth.signUp({
            email, 
            password,
            data: { // Additional user data on registration
                first_name,
                last_name
             } 
        });

        if (error) throw error; 

        console.log('Signed up user:', user); 
        // Success Handling:
        // 1) Show success message/toast
        // 2) Redirect to profile -  goto('/profile'); 
    } catch (error) {
        console.error('Error signing up:', error);
        // Handle Signup Errors (display to the user)
    }
}


  function toggleForm() {
    isLogin = !isLogin;
  }
</script>
<form on:submit|preventDefault={isLogin ? login : signup} class="my-8 max-w-md mx-auto p-8 bg-white bg-opacity-90 shadow-lg rounded-lg space-y-4">
  
  <input type="email" bind:value={email} placeholder="Email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
  <input type="password" bind:value={password} placeholder="Password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
  <input type="password" bind:value={password} placeholder="Password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>

  <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>

  <button type="submit" class="w-full bg-LG text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-HG mt-4">
    {isLogin ? 'Login' : 'Sign Up'}
  </button>
</form>
<div class="my-8 flex justify-center">
  
<button on:click={toggleForm} class="bg-LG text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-HG mt-4">
  {isLogin ? 'Sign up' : 'Log in'} instead
</button>

</div>