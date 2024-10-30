<script>
    import { onMount } from 'svelte';

    let activities = [];
    let error = null;
    let isLoading = true;

    async function fetchActivities() {
        try {
            const response = await fetch('/api/activities');
            if (!response.ok) {
                throw new Error('Failed to fetch activities');
            }
            activities = await response.json();
        } catch (err) {
            error = err.message;
            console.error('Error fetching activities:', err);
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        fetchActivities();
    });
</script>

<div class="space-y-4">
    {#if error}
        <div class="bg-red-50 text-red-700 p-4 rounded-lg">
            {error}
        </div>
    {/if}

    {#if isLoading}
        <div class="text-center py-8">
            Loading activities...
        </div>
    {/if}

    {#if activities.length > 0}
        <div class="space-y-4">
            <h2 class="text-xl font-semibold">Recent Activities</h2>
            <div class="space-y-2">
                {#each activities as activity (activity.id)}
                    <div class="flex items-center justify-between p-4 rounded-lg border bg-white">
                        <div class="flex items-center gap-3">
                            <div>
                                <h3 class="font-medium">{activity.name}</h3>
                                <p class="text-sm text-gray-600">
                                    {new Date(activity.start_date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-sm">
                                {(activity.distance / 1000).toFixed(2)} km
                            </span>
                            <span class="text-sm">
                                {Math.floor(activity.moving_time / 60)} min
                            </span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {:else if !isLoading}
        <div class="text-center py-8 text-gray-600">
            No activities found
        </div>
    {/if}
</div>