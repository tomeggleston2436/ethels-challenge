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

export function checkPeakVisit(activity, peak) {
    if (!activity.map?.summary_polyline) return false;
    
    // Check start/end points if available
    if (activity.start_latlng) {
        const startDist = getDistanceFromLatLonInKm(
            activity.start_latlng[0],
            activity.start_latlng[1],
            peak.lat,
            peak.lng
        );
        if (startDist <= 0.2) return true;
    }

    if (activity.end_latlng) {
        const endDist = getDistanceFromLatLonInKm(
            activity.end_latlng[0],
            activity.end_latlng[1],
            peak.lat,
            peak.lng
        );
        if (endDist <= 0.2) return true;
    }

    // Check route points
    const points = decodePolyline(activity.map.summary_polyline);
    return points.some(point => {
        const dist = getDistanceFromLatLonInKm(
            point[0],
            point[1],
            peak.lat,
            peak.lng
        );
        return dist <= 0.2;
    });
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

export function processActivities(activities, peaks) {
    const visitedPeaks = new Map();

    if (!activities || !peaks) return visitedPeaks;

    activities.forEach(activity => {
        peaks.forEach(peak => {
            if (checkPeakVisit(activity, peak)) {
                // Only update if this is the earliest completion
                if (!visitedPeaks.has(peak.name) ||
                    new Date(activity.start_date) < new Date(visitedPeaks.get(peak.name).date)) {
                    visitedPeaks.set(peak.name, {
                        date: activity.start_date,
                        activityName: activity.name,
                        activityId: activity.id // Add the activity ID
                    });
                }
            }
        });
    });
    
    return visitedPeaks;
}

export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}