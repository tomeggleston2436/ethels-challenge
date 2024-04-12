<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseConfig'; // Ensure correct path to your Supabase configuration

  let userProfile = null;

  onMount(() => {
    userProfile = supabase.auth.getUser(); // Get the current user from Supabase
    // Alternatively, use a Svelte store to manage user state globally
  });

  async function connectToStrava() {
    // Implement Strava connection logic here
  }
</script>

{#if userProfile}
  <div>
    <h1>Welcome, {userProfile.email}</h1>
    <!-- Display other user information -->
  </div>
{:else}
  <p>Please log in to view this page.</p>
{/if}
