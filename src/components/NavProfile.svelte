<script>
    import { onMount } from 'svelte';
    let athlete = null;
    let showDropdown = false;

    async function fetchAthleteData() {
        try {
            const response = await fetch('/api/athlete');
            if (response.ok) {
                athlete = await response.json();
            }
        } catch (error) {
            console.error('Error fetching athlete data:', error);
        }
    }

    function handleLogout() {
        window.location.href = '/api/logout';
    }

    onMount(() => {
        fetchAthleteData();
    });
</script>

<div 
    class="relative group"
>
    {#if athlete}
        <button 
            class="flex items-center gap-2 px-3 py-1 rounded hover:text-gray-300"
        >
            {#if athlete.profile}
                <img 
                    src={athlete.profile} 
                    alt="Profile" 
                    class="w-8 h-8 rounded-full border-2 border-Orange"
                />
            {:else}
                <div class="w-8 h-8 rounded-full bg-Orange flex items-center justify-center border-2 border-Orange text-white">
                    {athlete.firstname?.[0] || 'U'}
                </div>
            {/if}
            <span>{athlete.firstname}</span>
        </button>

        <div 
            class="absolute right-0 mt-2 w-48 bg-LG rounded-lg shadow-lg py-1 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 ease-in-out"
        >
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
            href="/login"
            class="hover:text-gray-300 flex items-center gap-2"
        >
            <i class="fa-solid fa-right-to-bracket"></i>
            Login
        </a>
    {/if}
</div>

<style>
    /* Add a small buffer area between button and dropdown to prevent accidental closing */
    .group:hover .absolute::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 0;
        right: 0;
        height: 8px;
    }
</style>