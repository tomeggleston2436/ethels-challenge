export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily:{
        'playfair': ['Playfair Display', 'serif']
      },
      colors: {
        'DG': '#294F50',
        'LG': '#6C8685',
        'HG': '#384a49',
        'LP': '#F8ECEC',
        'Orange': '#D8A861',
        'hover-orange': '#ac864d',
        'Brown': '#382A1F',
      },
      backgroundImage:{
        'hero-pattern': "url('/src/assets/bg.jpg')",
      },
    },
  },
  plugins: [],
}
