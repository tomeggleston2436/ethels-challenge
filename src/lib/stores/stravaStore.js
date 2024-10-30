import { writable } from 'svelte/store';

function createStravaStore() {
    // Initialize store with data from localStorage if it exists
    const storedData = localStorage.getItem('stravaData');
    const storedTimestamp = localStorage.getItem('stravaDataTimestamp');
    
    const initialData = storedData ? JSON.parse(storedData) : null;
    
    const { subscribe, set, update } = writable({
        activities: initialData?.activities || [],
        athlete: initialData?.athlete || null,
        lastUpdated: storedTimestamp ? parseInt(storedTimestamp) : 0
    });

    return {
        subscribe,
        
        async refreshData() {
            const currentTime = Date.now();
            const ONE_HOUR = 3600000; // 1 hour in milliseconds
            
            try {
                // Check if we have recent data
                const storedTimestamp = localStorage.getItem('stravaDataTimestamp');
                if (storedTimestamp && (currentTime - parseInt(storedTimestamp)) < ONE_HOUR) {
                    // Use cached data if less than 1 hour old
                    const storedData = localStorage.getItem('stravaData');
                    if (storedData) {
                        const data = JSON.parse(storedData);
                        set({ activities: data.activities, athlete: data.athlete, lastUpdated: parseInt(storedTimestamp) });
                        return;
                    }
                }

                // Fetch new data if cache is old or doesn't exist
                const [athleteResponse, activitiesResponse] = await Promise.all([
                    fetch('/api/athlete'),
                    fetch('/api/activities')
                ]);

                if (!athleteResponse.ok || !activitiesResponse.ok) {
                    throw new Error('Failed to fetch Strava data');
                }

                const athlete = await athleteResponse.json();
                const activities = await activitiesResponse.json();

                // Update store and localStorage
                const newData = { activities, athlete, lastUpdated: currentTime };
                localStorage.setItem('stravaData', JSON.stringify({ activities, athlete }));
                localStorage.setItem('stravaDataTimestamp', currentTime.toString());
                set(newData);
                
            } catch (error) {
                console.error('Error fetching Strava data:', error);
                // If fetch fails, try to use cached data regardless of age
                const storedData = localStorage.getItem('stravaData');
                if (storedData) {
                    const data = JSON.parse(storedData);
                    set({ 
                        activities: data.activities, 
                        athlete: data.athlete, 
                        lastUpdated: parseInt(localStorage.getItem('stravaDataTimestamp') || '0')
                    });
                }
            }
        },

        clearCache() {
            localStorage.removeItem('stravaData');
            localStorage.removeItem('stravaDataTimestamp');
            set({ activities: [], athlete: null, lastUpdated: 0 });
        }
    };
}

export const stravaStore = createStravaStore();