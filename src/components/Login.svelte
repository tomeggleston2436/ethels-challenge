<script>
  import { auth } from '../firebaseConfig';
  import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

  let email = '';
  let password = '';
  let isLogin = true;

  async function login() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', userCredential.user);
      // Redirect user or show login success message
    } catch (error) {
      console.error('Error logging in:', error);
      // Show error message to your user
    }
  }

  async function signup() {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signed up user:', userCredential.user);
      // Redirect user or show signup success message
    } catch (error) {
      console.error('Error signing up:', error);
      // Show error message to your user
    }
  }

  function toggleForm() {
    isLogin = !isLogin;
  }
</script>
<form on:submit|preventDefault={isLogin ? login : signup} class="my-8 max-w-md mx-auto p-8 bg-white bg-opacity-90 shadow-lg rounded-lg space-y-4">
  
  <input type="email" bind:value={email} placeholder="Email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
  <input type="password" bind:value={password} placeholder="Password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
  <button type="submit" class="w-full bg-LG text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-HG mt-4">
    {isLogin ? 'Login' : 'Sign Up'}
  </button>
</form>
<div class="my-8 flex justify-center">
  
<button on:click={toggleForm} class="bg-LG text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-HG mt-4">
  {isLogin ? 'Sign up' : 'Log in'} instead
</button>

</div>