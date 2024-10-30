<script>
    import StravaActivities from '../../components/StravaActivities.svelte';
    export let data;
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    
    {#if data.isAuthenticated}
        <StravaActivities />
    {:else}
        <div class="text-center py-8">
            <h2 class="text-xl mb-4">Connect your Strava account</h2>
            <a 
                href="/api/login"
                class="inline-block bg-[#fc4c02] hover:bg-[#fc4c02]/90 text-white px-6 py-2 rounded-lg font-medium"
            >
                Connect with Strava
            </a>
        </div>
    {/if}
</div>