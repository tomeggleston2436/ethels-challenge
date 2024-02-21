<script>
    import { goto } from '$app/navigation';
  
    let email = '';
    let password = '';
    let isLogin = true;
    let confirmPassword = '';
    let firstName = '';
    let lastName = '';
  
    async function login() {
      try {
        const response = await fetch('/supabase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({ action: 'login', email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Success! Handle Supabase login success accordingly
          console.log('Logged in user:', data);
          goto('/profile'); // Example redirect
        } else {
          const errorData = await response.json();
          // Handle errors coming from your API route
          console.error('Error logging in:', errorData);
        }
      } catch (error) {
        console.error('Error logging in (frontend):', error); // Network issues
      }
    }
  
    async function signup() {
      try {
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
  
        const response = await fetch('/supabase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({
            action: 'signup',
            email,
            password,
            firstName,
            lastName,
          }),
        });
  
        if (response.ok) {
          // Success! Handle signup and redirect
          console.log('Signup successful!');
          goto('/profile'); // Example redirect
        } else {
          const errorData = await response.json();
          // Handle errors from the API route
          console.error('Error signing up:', errorData);
        }
      } catch (error) {
        console.error('Error signing up (frontend):', error); // Network issues
      }
    }
  
    function toggleForm() {
      isLogin = !isLogin;
    }
  </script>




