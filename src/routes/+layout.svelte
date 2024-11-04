<script>
  import "../app.css";
  import NavProfile from '../components/NavProfile.svelte';
</script>

<div class="bg-hero-pattern bg-cover bg-center bg-no-repeat min-h-screen">
    <header class="font-playfair bg-LG shadow-md">
        <nav class="container mx-auto flex justify-between items-center p-4">
            <h1 class="text-3xl font-bold">
                <i class="fa-solid fa-mountain"></i>
                <a href="/" class="hover:text-gray-300 text-Orange">Ethel's Challenge</a>
            </h1>
            <div class="flex gap-4 text-white items-center">
                <a href="/" class="hover:text-gray-300">Home</a>
                <a href="/about" class="hover:text-gray-300">About</a>
                <a href="/map" class="hover:text-gray-300">Map</a>
                <NavProfile />
            </div>
        </nav>
    </header>

    <main class="min-h-[calc(100vh-theme(space.32))]">
        <slot />
    </main>

    <footer class="bg-LG text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
            <p>&copy; 2024 Ethel's Challenge. All rights reserved.</p>
            <img 
                src="src\static\api_logo_pwrdBy_strava_stack_gray.png"
                alt="Powered by Strava"
                class="h-6"
            />
        </div>
    </footer>
</div>