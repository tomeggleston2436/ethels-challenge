<script>
    import { onMount } from 'svelte';
    let athlete = null;
    let showDropdown = false;

    async function checkAuth() {
        try {
            const response = await fetch('/api/athlete');
            if (response.ok) {
                athlete = await response.json();
            }
        } catch (error) {
            console.error('Error fetching athlete:', error);
        }
    }

    function handleLogout() {
        window.location.href = '/api/logout';
    }

    onMount(() => {
        checkAuth();
    });
</script>

<div 
    class="relative"
    on:mouseenter={() => showDropdown = true}
    on:mouseleave={() => showDropdown = false}
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

        {#if showDropdown}
            <div 
                class="absolute right-0 mt-2 w-48 bg-LG rounded-lg shadow-lg py-1 z-50 transition-opacity duration-150 ease-in-out"
                style="opacity: {showDropdown ? '1' : '0'}"
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
        {/if}
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