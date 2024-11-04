<script>
    import Map from '../../components/Map.svelte';
    import { onMount } from 'svelte';
    import { peaks } from '$lib/ethels';
    import { stravaStore } from '$lib/stores/stravaStore';
    import { processActivities } from '$lib/peakUtils';
    
    let error = null;
    let visitedPeaks = new Map();

    $: if ($stravaStore.activities) {
        try {
            visitedPeaks = processActivities($stravaStore.activities, peaks);
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

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-LP p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-bold text-Orange mb-2">
                {visitedPeaks?.size || 0}
            </h3>
            <p class="text-DG">Peaks Completed</p>
        </div>
        <div class="bg-LP p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-bold text-Orange mb-2">
                {peaks.length - (visitedPeaks?.size || 0)}
            </h3>
            <p class="text-DG">Peaks Remaining</p>
        </div>
        <div class="bg-LP p-6 rounded-lg shadow-lg text-center">
            <h3 class="text-2xl font-bold text-Orange mb-2">
                {Math.round(((visitedPeaks?.size || 0) / peaks.length) * 100)}%
            </h3>
            <p class="text-DG">Challenge Progress</p>
        </div>
    </div>

    <div class="bg-LG rounded-lg shadow-lg overflow-hidden">
        <Map stravaData={$stravaStore.activities} {visitedPeaks} />
    </div>
</div>