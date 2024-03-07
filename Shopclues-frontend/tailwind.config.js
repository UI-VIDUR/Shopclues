/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
        // Primary
        white: '#ffffff',
        black: '#000000',
        dark: '#363738',

        // Secondary
        secondaryOne: '#F5F5F5',
        secondaryTwo: '#FEFAF1',

        // Text
        textOne: '#FAFAFA',
        textTwo: '#7D8184',

        // Button
        btnPrimary: '#DB4444',
        btnPrimaryHover: '#E07575',
        btnSecondaryHover: '#A0BCE0',
        
        // Colors
        success: '#47B486',
    }
  },
  plugins: [],
}

