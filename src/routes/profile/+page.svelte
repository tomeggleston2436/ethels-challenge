<script>
    // Import Firebase auth to check user state or display user info
    import { auth } from '../../firebaseConfig';

    import { onMount } from 'svelte';
   
  
    let userProfile = null;
  
    onMount(() => {
      userProfile = auth.currentUser; // Get the current user
      // Alternatively, use a Svelte store to manage user state
    });
  
    async function connectToStrava() {
      // Implement Strava connection logic here
    }
  </script>
  
  {#if userProfile}
    <h1>Welcome, {userProfile.email}</h1>
    <button on:click={connectToStrava}>Connect to Strava</button>
  {:else}
    <p>Please log in to view this page.</p>
  {/if}
  