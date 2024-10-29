<script>
    import { onMount } from 'svelte';
    let activities = [];
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            const response = await fetch('/api/activities');
            if (response.ok) {
                activities = await response.json();
                if (activities.length === 0) {
                    error = "No activities found.";
                }
            } else {
                throw new Error('Failed to fetch activities');
            }
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    });
</script>

{#if loading}
    <p>Loading activities...</p>
{:else if error}
    <p>{error}</p>
{:else}
    <ul>
        {#each activities as activity}
            <li>{activity.name} - {activity.distance} meters</li>
        {/each}
    </ul>
{/if}
