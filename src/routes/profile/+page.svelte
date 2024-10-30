<script>
    import { onMount } from 'svelte';
    import { ethels } from '$lib/ethels';
    import { stravaStore } from '$lib/stores/stravaStore';
    import { processActivities, formatDate } from '$lib/peakUtils';
    
    let visitedPeaks = new Map();
    let loading = true;
    let error = null;
    let showVisitedPeaks = false;
    let showRemainingPeaks = false;

    $: if ($stravaStore.activities) {
        visitedPeaks = processActivities($stravaStore.activities, ethels);
        loading = false;
    }

    onMount(() => {
        stravaStore.refreshData();
    });
</script>

<div class="max-w-4xl mx-auto p-4">
    {#if loading}
        <div class="flex justify-center items-center min-h-[60vh]">
            <div class="bg-white p-8 rounded-lg shadow-lg text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-Orange mx-auto mb-4"></div>
                <p class="text-lg text-DG">Loading your progress...</p>
            </div>
        </div>
    {:else if error}
        <div class="text-red-500 p-4 rounded bg-red-50">{error}</div>
    {:else}
        <div class="grid md:grid-cols-3 gap-6 mb-6">
            <!-- Profile Info -->
            <div class="bg-white rounded-lg shadow p-6">
                {#if $stravaStore.athlete}
                    {#if $stravaStore.athlete.profile}
                        <img 
                            src={$stravaStore.athlete.profile} 
                            alt="Profile" 
                            class="w-32 h-32 rounded-full mx-auto"
                        />
                    {:else}
                        <div class="w-32 h-32 rounded-full bg-Orange mx-auto flex items-center justify-center text-3xl text-white">
                            {$stravaStore.athlete.firstname?.[0] || 'U'}
                        </div>
                    {/if}
                    <h2 class="text-xl font-bold text-center mt-4">
                        {$stravaStore.athlete.firstname} {$stravaStore.athlete.lastname}
                    </h2>
                {/if}
            </div>

            <!-- Stats -->
            <div class="md:col-span-2 bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-bold mb-4">Ethels Challenge Progress</h2>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-gray-50 p-4 rounded-lg text-center">
                        <div class="text-3xl font-bold">{visitedPeaks.size}</div>
                        <div class="text-gray-600">Peaks Visited</div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg text-center">
                        <div class="text-3xl font-bold">
                            {Math.round((visitedPeaks.size / ethels.length) * 100)}%
                        </div>
                        <div class="text-gray-600">Complete</div>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="h-4 bg-gray-200 rounded-full overflow-hidden mb-6">
                    <div 
                        class="h-full bg-Orange rounded-full transition-all duration-500"
                        style="width: {(visitedPeaks.size / ethels.length) * 100}%"
                    ></div>
                </div>

                <!-- Peak Lists -->
                <div class="space-y-4">
                    <!-- Visited Peaks -->
                    <div class="bg-gray-50 rounded-lg overflow-hidden">
                        <button 
                            class="w-full px-4 py-3 text-left font-semibold flex justify-between items-center hover:bg-gray-100"
                            on:click={() => showVisitedPeaks = !showVisitedPeaks}
                        >
                            <span>Completed Peaks ({visitedPeaks.size})</span>
                            <i class="fas fa-chevron-{showVisitedPeaks ? 'up' : 'down'}"></i>
                        </button>
                        {#if showVisitedPeaks}
                            <div class="p-4 space-y-2">
                                {#each Array.from(visitedPeaks.entries()) as [peakName, info]}
                                    <div class="flex items-center justify-between p-3 bg-green-50 rounded hover:bg-green-100 transition-colors">
                                        <div class="flex items-center">
                                            <span class="text-green-600 mr-2">✓</span>
                                            <span>{peakName}</span>
                                        </div>
                                        <div class="text-sm text-gray-600">
                                            {formatDate(info.date)}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>

                    <!-- Remaining Peaks -->
                    <div class="bg-gray-50 rounded-lg overflow-hidden">
                        <button 
                            class="w-full px-4 py-3 text-left font-semibold flex justify-between items-center hover:bg-gray-100"
                            on:click={() => showRemainingPeaks = !showRemainingPeaks}
                        >
                            <span>Peaks To Do ({ethels.length - visitedPeaks.size})</span>
                            <i class="fas fa-chevron-{showRemainingPeaks ? 'up' : 'down'}"></i>
                        </button>
                        {#if showRemainingPeaks}
                            <div class="p-4 space-y-2">
                                {#each ethels.filter(peak => !visitedPeaks.has(peak.name)) as peak}
                                    <div class="p-3 bg-gray-50 rounded border border-gray-200">
                                        {peak.name}
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activities -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-bold mb-4">Recent Activities</h3>
            <div class="space-y-2">
                {#each $stravaStore.activities?.slice(0, 5) || [] as activity}
                    <div class="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                        <div class="font-medium">{activity.name}</div>
                        <div class="text-sm text-gray-600">
                            {formatDate(activity.start_date)}
                            - {(activity.distance / 1000).toFixed(2)} km
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>