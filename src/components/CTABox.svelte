<!-- src/components/CTABox.svelte -->
<script>
    import { goto } from '$app/navigation';

  </script>
  
  <div class="bg-orange-400 text-white text-center p-4 rounded-lg my-40 mx-auto max-w-lg shadow-lg">
    <p class="text-lg">Create an account to start tracking how many you have completed!</p>
    <button 
  class="bg-LG text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-HG mt-4"
  on:click={() => goto('/login')} 
>
  Join now
</button>

  </div>
  
 