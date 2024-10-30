<script>
    import { onMount } from 'svelte';
    import { ethels } from '../lib/ethels.js';

    let activities = [];
    let loading = true;
    let error = null;
    let visitedPeaks = new Set();
    let unvisitedPeaks = [];

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

    function checkPeakVisit(activity) {
        const visitedInThisActivity = new Set();
        
        // Check start and end points
        if (activity.start_latlng && activity.end_latlng) {
            ethels.forEach(peak => {
                // Check start point
                let distanceStart = getDistanceFromLatLonInKm(
                    activity.start_latlng[0], activity.start_latlng[1],
                    peak.lat, peak.lng
                );
                
                // Check end point
                let distanceEnd = getDistanceFromLatLonInKm(
                    activity.end_latlng[0], activity.end_latlng[1],
                    peak.lat, peak.lng
                );

                if (distanceStart <= 0.2 || distanceEnd <= 0.2) { // Increased radius to 200m
                    visitedPeaks.add(peak.name);
                    visitedInThisActivity.add(peak.name);
                }
            });
        }

        // If available, also check the full route
        if (activity.map?.summary_polyline) {
            const coordinates = decodePolyline(activity.map.summary_polyline);
            coordinates.forEach(coord => {
                ethels.forEach(peak => {
                    const distance = getDistanceFromLatLonInKm(
                        coord[0], coord[1],
                        peak.lat, peak.lng
                    );
                    
                    if (distance <= 0.2) {
                        visitedPeaks.add(peak.name);
                        visitedInThisActivity.add(peak.name);
                    }
                });
            });
        }
        
        return Array.from(visitedInThisActivity);
    }

    function decodePolyline(encoded) {
        if (!encoded) return [];
        
        let points = [];
        let index = 0, len = encoded.length;
        let lat = 0, lng = 0;
        
        while (index < len) {
            let shift = 0, result = 0;
            
            do {
                let b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (result & 0x20);
            
            lat += ((result & 1) ? ~(result >> 1) : (result >> 1));
            
            shift = 0;
            result = 0;
            
            do {
                let b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (result & 0x20);
            
            lng += ((result & 1) ? ~(result >> 1) : (result >> 1));
            
            points.push([lat / 1e5, lng / 1e5]);
        }
        
        return points;
    }

    onMount(async () => {
        try {
            const response = await fetch('/api/activities');
            if (!response.ok) {
                throw new Error('Failed to fetch activities');
            }
            
            activities = await response.json();
            
            // Debug log
            console.log('First activity data:', activities[0]);
            
            // Process each activity
            activities.forEach(activity => {
                const peaksVisited = checkPeakVisit(activity);
                if (peaksVisited.length > 0) {
                    activity.peaksVisited = peaksVisited;
                    console.log(`Peaks visited in activity ${activity.name}:`, peaksVisited);
                }
            });

            // Update unvisited peaks
            unvisitedPeaks = ethels.filter(peak => !visitedPeaks.has(peak.name));
            
            console.log('Total visited peaks:', visitedPeaks.size);
            
            if (activities.length === 0) {
                error = "No activities found.";
            }
        } catch (err) {
            console.error('Error processing activities:', err);
            error = err.message;
        } finally {
            loading = false;
        }
    });
</script>

<div class="max-w-4xl mx-auto p-4">
    {#if loading}
        <p class="text-center py-4">Loading activities and analyzing peaks...</p>
    {:else if error}
        <p class="text-red-500">{error}</p>
    {:else}
        <!-- Debug info -->
        <div class="mb-4 p-4 bg-gray-100 rounded">
            <p>Total activities loaded: {activities.length}</p>
            <p>First activity coordinates: {activities[0]?.start_latlng ? JSON.stringify(activities[0].start_latlng) : 'No coordinates'}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <h2 class="text-xl font-bold">Visited Peaks ({visitedPeaks.size}/{ethels.length})</h2>
                <div class="bg-green-50 p-4 rounded-lg">
                    {#each Array.from(visitedPeaks) as peak}
                        <div class="flex items-center p-2">
                            <span class="text-green-600">✓</span>
                            <span class="ml-2">{peak}</span>
                        </div>
                    {/each}
                </div>
            </div>
            
            <div class="space-y-4">
                <h2 class="text-xl font-bold">Remaining Peaks ({unvisitedPeaks.length})</h2>
                <div class="bg-gray-50 p-4 rounded-lg">
                    {#each unvisitedPeaks as peak}
                        <div class="p-2">
                            <span>{peak.name}</span>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div class="mt-8">
            <h2 class="text-xl font-bold mb-4">Activities with Peak Visits</h2>
            <div class="space-y-2">
                {#each activities as activity}
                    {#if activity.peaksVisited?.length}
                        <div class="bg-white p-4 rounded-lg border">
                            <h3 class="font-medium">{activity.name}</h3>
                            <p class="text-sm text-gray-600">
                                Peaks visited: {activity.peaksVisited.join(', ')}
                            </p>
                            <p class="text-xs text-gray-500">
                                Start: {activity.start_latlng ? `${activity.start_latlng[0]}, ${activity.start_latlng[1]}` : 'No coordinates'}
                            </p>
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</div>