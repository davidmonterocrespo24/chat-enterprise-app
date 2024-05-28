

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
      extend: {
          // Configuraciones personalizadas de Tailwind
      },
  },
  plugins: [
      require('@tailwindcss/forms'), // Añade el plugin forms
      // Añade otros plugins que necesites
  ],
};
