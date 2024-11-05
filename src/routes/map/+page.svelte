```svelte
<script>
    import Map from '../../components/Map.svelte';
    import { onMount } from 'svelte';
    import { peaks } from '$lib/ethels';
    import { stravaStore } from '$lib/stores/stravaStore';
    
    let error = null;
    let visitedPeaks = new Set();
    let isLoaded = false;

    function processVisitedPeaks(activities) {
        if (!activities) return new Set();
        
        const visited = new Set();
        activities.forEach(activity => {
            if (activity.start_latlng) {
                peaks.forEach(peak => {
                    const distance = getDistanceFromLatLonInKm(
                        activity.start_latlng[0],
                        activity.start_latlng[1],
                        peak.lat,
                        peak.lng
                    );
                    if (distance <= 0.2) {
                        visited.add(peak.name);
                    }
                });
            }
        });
        return visited;
    }

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    $: if ($stravaStore.activities && !isLoaded) {
        try {
            visitedPeaks = processVisitedPeaks($stravaStore.activities);
            isLoaded = true;
        } catch (err) {
            console.error('Error processing activities:', err);
            error = err.message;
        }
    }

    onMount(() => {
        stravaStore.refreshData();
    });
</script>

<div class="container mx-auto py-8 px-4">
    {#if error}
        <div class="bg-red-100 text-red-700 p-4 rounded mb-4">
            {error}
        </div>
    {/if}

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-LP p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-bold text-Orange mb-2">
                {visitedPeaks.size}
            </h3>
            <p class="text-DG">Peaks Completed</p>
        </div>
        <div class="bg-LP p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-bold text-Orange mb-2">
                {peaks.length - visitedPeaks.size}
            </h3>
            <p class="text-DG">Peaks Remaining</p>
        </div>
        <div class="bg-LP p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-bold text-Orange mb-2">
                {Math.round((visitedPeaks.size / peaks.length) * 100)}%
            </h3>
            <p class="text-DG">Challenge Progress</p>
        </div>
    </div>

    <!-- Map Container -->
    {#if isLoaded}
        <div class="bg-LG rounded-lg shadow-lg overflow-hidden">
            <Map stravaData={$stravaStore.activities} {visitedPeaks} />
        </div>
    {/if}
</div>
```