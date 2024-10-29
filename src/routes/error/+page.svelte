<script>
    export let error;
  </script>
  
  <h1>Something went wrong</h1>
  <p>{error?.message || 'An unknown error occurred.'}</p>
  