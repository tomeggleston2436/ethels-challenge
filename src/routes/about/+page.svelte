<script>
    import { peaks } from '$lib/ethels';
</script>

<div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto bg-LP rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-Orange mb-6">About Ethel's Challenge</h1>
        
        <div class="space-y-6 text-DG">
            <div>
                <h2 class="text-xl font-semibold mb-3">What is Ethel's Challenge?</h2>
                <p class="mb-4">
                    Ethel's Challenge involves climbing {peaks.length} peaks in the Peak District. These peaks, known as "Ethels",
                    are named in honor of Ethel Haythornthwaite who played a crucial role in protecting the Peak District landscape.
                </p>
            </div>

            <div>
                <h2 class="text-xl font-semibold mb-3">How it Works</h2>
                <ul class="list-disc pl-5 space-y-2">
                    <li>Connect your Strava account to track your progress</li>
                    <li>Your activities are automatically checked against the Ethels list</li>
                    <li>Peaks are marked as completed when you get within 200m of the summit</li>
                    <li>Track your progress on the interactive map</li>
                    <li>View your completion statistics on your profile</li>
                </ul>
            </div>

            <div>
                <h2 class="text-xl font-semibold mb-3">The Challenge Stats</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div class="bg-white p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-Orange">{peaks.length}</div>
                        <div class="text-sm">Total Peaks</div>
                    </div>
                    <div class="bg-white p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-Orange">200m</div>
                        <div class="text-sm">Summit Radius</div>
                    </div>
                    <div class="bg-white p-4 rounded-lg text-center">
                        <div class="text-2xl font-bold text-Orange">∞</div>
                        <div class="text-sm">Time Limit</div>
                    </div>
                </div>
            </div>

            <div>
                <h2 class="text-xl font-semibold mb-3">Resources</h2>
                <ul class="list-disc pl-5 space-y-2">
                    <li><a href="https://www.hill-bagging.co.uk/ethels.php" target="_blank" class="text-Orange hover:underline">Official Ethels List on Hill Bagging</a></li>
                    <li><a href="https://www.friendsofthepeak.org.uk/" target="_blank" class="text-Orange hover:underline">Friends of the Peak District</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>