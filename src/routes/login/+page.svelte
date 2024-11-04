<script>
    function handleStravaLogin() {
        window.location.href = '/api/login';
    }
</script>

<div class="max-w-md mx-auto my-16 p-8 bg-LP rounded-lg shadow-lg text-center">
    <h1 class="text-2xl font-bold text-DG mb-6">Welcome to Ethel's Challenge</h1>
    
    <p class="mb-8 text-gray-600">
        Track your progress climbing the Peak District's Ethels using your Strava activities.
    </p>

    <button 
        on:click={handleStravaLogin}
        class="inline-block transition-opacity hover:opacity-90"
    >
        <img 
            src="/btn_strava_connectwith_orange.svg" 
            alt="Connect with Strava"
            class="h-12"
        />
    </button>

    <div class="mt-8">
        <img 
            src="/api_logo_pwrdBy_strava_stack_gray.png"
            alt="Powered by Strava"
            class="h-8 mx-auto"
        />
    </div>
</div>