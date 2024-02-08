<script>
    import "../app.css";
  </script>


  <div class="bg-[url(src/assets/bg.jpg)] bg-cover bg-center bg-no-repeat">
  <header class="font-playfair bg-LG shadow-md">
    <nav class="container mx-auto flex justify-between items-center p-4 ">
      <h1 class="text-3xl font-bold">
        <i class="fa-solid fa-mountain"></i>
        <a href="/" class="hover:text-gray-300 text-Orange">Ethel's Challenge</a>
      </h1>
      <div class="flex gap-4 text-white">
        <a href="/" class="hover:text-gray-300">Home</a>
        <a href="/about" class="hover:text-gray-300">About</a>
        <a href="/map" class="hover:text-gray-300">Map</a>
        <a href="/login" class="hover:text-gray-300">Login</a>
      </div>
    </nav>
  </header>

  <main>
    <div>
     <slot />
    </div>  
  </main>

  <footer class="bg-LG text-white p-4 text-center">
    <p>&copy; 2024 Ethel's Challenge. All rights reserved.</p>
  </footer>
</div>