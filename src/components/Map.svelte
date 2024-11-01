<script>
  import { onMount } from 'svelte';
  import { peaks } from '$lib/ethels';
  export let stravaData = null;
  export let visitedPeaks = new Set();

  let mapElement;
  let map;
  let markers = [];
  let infowindow;
  let legend;

  function initMap() {
      if (typeof google !== 'undefined') {
          map = new google.maps.Map(mapElement, {
              zoom: 9,
              center: { lat: 53.346, lng: -1.815 },
              mapTypeId: 'terrain',
              mapTypeControl: true,
              fullscreenControl: true,
              streetViewControl: false
          });

          infowindow = new google.maps.InfoWindow();
          addMarkers();
          createLegend();
      }
  }

  function updateLegend() {
      if (legend && map) {
          legend.innerHTML = `
              <div class="text-sm font-bold mb-2">Peak Status</div>
              <div class="flex items-center mb-1">
                  <div class="w-4 h-4 rounded-full bg-[#44FF44] mr-2"></div>
                  <span class="text-sm">Completed (${visitedPeaks.size})</span>
              </div>
              <div class="flex items-center">
                  <div class="w-4 h-4 rounded-full bg-[#FF4444] mr-2"></div>
                  <span class="text-sm">Not visited (${peaks.length - visitedPeaks.size})</span>
              </div>
          `;
      }
  }

  function createLegend() {
      legend = document.createElement('div');
      legend.className = 'bg-white p-3 rounded shadow-lg m-2';
      updateLegend();
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legend);
  }

  function addMarkers() {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      markers = [];

      // Custom marker icons
      const uncompletedIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#FF4444',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#FFFFFF',
          scale: 8
      };

      const completedIcon = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#44FF44',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#FFFFFF',
          scale: 8
      };

      peaks.forEach((peak, index) => {
          const isCompleted = visitedPeaks.has(peak.name);

          const marker = new google.maps.Marker({
              position: { lat: peak.lat, lng: peak.lng },
              map: map,
              title: peak.name,
              icon: isCompleted ? completedIcon : uncompletedIcon,
              animation: google.maps.Animation.DROP,
              optimized: true,
              zIndex: peaks.length - index
          });

          marker.addListener('click', () => {
              const content = `
                  <div class="p-3">
                      <h3 class="font-bold mb-2">${peak.name}</h3>
                      <p class="text-sm mb-1">Status: ${isCompleted ? '✅ Completed' : '⏳ Not visited yet'}</p>
                      <p class="text-sm">Location: ${peak.lat.toFixed(4)}, ${peak.lng.toFixed(4)}</p>
                  </div>
              `;
              infowindow.setContent(content);
              infowindow.open(map, marker);
          });

          markers.push(marker);
      });
  }

  // Watch for changes in visitedPeaks
  $: if (visitedPeaks && map) {
      addMarkers();
      updateLegend();
  }

  onMount(() => {
      initMap();
  });
</script>

<div bind:this={mapElement} id="map"></div>

<style>
  #map {
      width: 100%;
      height: 900px;
      border-radius: 0.5rem;
  }

  :global(.gm-style-iw) {
      padding: 0 !important;
  }
  
  :global(.gm-style-iw-d) {
      overflow: hidden !important;
  }
</style>