<script>
  import { onMount } from 'svelte';
  import { ethels } from '../lib/ethels.js';
  import CtaBox from '../components/CTABox.svelte';
  import ChallengeBox from '../components/ChallengeBox.svelte';
  import LoginButton from '../components/LoginButton.svelte';
  import PeakList from '../components/PeakList.svelte';
  
    import { goto } from '$app/navigation';

    async function handleCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code) {
            try {
                const response = await fetch('/api/callback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ code })
                });

                if (response.ok) {
                    // Redirect to profile or dashboard after successful auth
                    goto('/profile');
                } else {
                    console.error('Auth failed:', await response.text());
                }
            } catch (error) {
                console.error('Error handling callback:', error);
            }
        }
    }

    onMount(() => {
        handleCallback();
    });

</script>




<main>
  <div>
    
    
    <ChallengeBox />
    <CtaBox />
  </div>
</main>
