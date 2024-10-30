<script>
    import { onMount } from 'svelte';
    import { stravaStore } from '$lib/stores/stravaStore';

    onMount(() => {
        stravaStore.refreshData();
    });

    function handleLogout() {
        stravaStore.clearCache();
        window.location.href = '/api/logout';
    }
</script>

<div class="relative group">
    {#if $stravaStore.athlete}
        <button 
            class="flex items-center gap-2 px-3 py-1 rounded hover:text-gray-300"
        >
            {#if $stravaStore.athlete.profile}
                <img 
                    src={$stravaStore.athlete.profile} 
                    alt="Profile" 
                    class="w-8 h-8 rounded-full border-2 border-Orange"
                />
            {:else}
                <div class="w-8 h-8 rounded-full bg-Orange flex items-center justify-center border-2 border-Orange text-white">
                    {$stravaStore.athlete.firstname?.[0] || 'U'}
                </div>
            {/if}
            <span>{$stravaStore.athlete.firstname}</span>
        </button>

        <div 
            class="absolute right-0 mt-2 w-48 bg-LG rounded-lg shadow-lg py-1 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out"
        >
            <div class="absolute h-2 w-full -top-2"></div>
            
            <a 
                href="/profile" 
                class="block px-4 py-2 text-white hover:bg-Orange hover:text-white transition-colors duration-150"
            >
                Profile
            </a>
            <button 
                on:click={handleLogout}
                class="block w-full text-left px-4 py-2 text-white hover:bg-Orange hover:text-white transition-colors duration-150"
            >
                Logout
            </button>
        </div>
    {:else}
        <a 
            href="/api/login"
            class="hover:text-gray-300 flex items-center gap-2"
        >
            <i class="fa-solid fa-right-to-bracket"></i>
            Login
        </a>
    {/if}
</div>

<style>
    .group:hover .group-hover\:visible {
        transition-delay: 0s;
    }

    .group:hover .group-hover\:opacity-100 {
        transition-delay: 0s;
    }
</style>