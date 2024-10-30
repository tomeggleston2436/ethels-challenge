export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
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

export function processActivities(activities, peaks) {
    const visitedPeaks = new Set();

    if (!activities || !peaks) return visitedPeaks;

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
                    visitedPeaks.add(peak.name);
                }
            });
        }
    });

    return visitedPeaks;
}