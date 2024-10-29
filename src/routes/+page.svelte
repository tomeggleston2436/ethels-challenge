<script>
  import { onMount } from 'svelte';
  import { ethels } from '$lib/ethels';
  import CtaBox from '../components/CTABox.svelte';
  import ChallengeBox from '../components/ChallengeBox.svelte';
  import LoginButton from '../components/LoginButton.svelte';
  import PeakList from '../components/PeakList.svelte';


</script>




<main>
  <div>
    <LoginButton />
    <PeakList />
    <ChallengeBox />
    <CtaBox />
  </div>
</main>
