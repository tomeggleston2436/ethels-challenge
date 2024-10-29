<!-- src/components/LoginButton.svelte -->
<script>
    function handleLogin() {
        window.location.href = '/api/login';
    }
</script>

<button on:click={handleLogin}>Login with Strava</button>
