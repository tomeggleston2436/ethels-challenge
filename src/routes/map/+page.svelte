<script>
  import Map from '../../components/Map.svelte';
  import { onMount } from 'svelte';
  import { peaks } from '$lib/ethels';
  import { processActivities } from '$lib/peakUtils';
  
  let stravaData = null;
  let error = null;
  let visitedPeaks = new Set();

  async function fetchStravaData() {
      try {
          const response = await fetch('/api/activities');
          if (response.ok) {
              stravaData = await response.json();
              visitedPeaks = processActivities(stravaData, peaks);
              console.log('Visited peaks:', Array.from(visitedPeaks)); // Debug log
          }
      } catch (err) {
          error = err.message;
          console.error('Error fetching Strava data:', err);
      }
  }

  onMount(() => {
      fetchStravaData();
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
  <div class="bg-LG rounded-lg shadow-lg overflow-hidden">
      <Map {stravaData} {visitedPeaks} />
  </div>
</div>