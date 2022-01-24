const color = require('color')
const plugin = require('tailwindcss/plugin')

const colors = {
   light: '#fff',
   dark: '#212529',
   primary: '#4361EE',
   secondary: '#F72585',
}

module.exports = {
   mode: "jit",
   content: ["./src/**/*.{html,js,svelte,ts}"],
   darkMode: 'class',
   theme: {
      colors,
      extend: {},
   },
   // Only add this if you installed the TailwindCSS-plugins:
   plugins: [
      require('@tailwindcss/typography'), 
      require('@tailwindcss/forms'),
      plugin(({ addUtilities, matchUtilities, theme }) => {
         addUtilities({
            '.row': {
               display: 'flex',
               flexDirection: 'row'
            },
            '.col': {
               display: 'flex',
               flexDirection: 'column'
            },
            '.center': {
               justifyContent: 'center',
               alignItems: 'center'
            },
            '.centered': {
               position: 'absolute',
               top: '50%',
               left: '50%',
               transform: 'translate(-50%, -50%)'
            },
            '.bg-theme': {
               background: theme('colors.light'),
               'html.dark &': {
                  background: theme('colors.dark'),
               }
            }
         })

         matchUtilities({
            scrollbar: (style) => ({
               'scrollbar-width': 'thin',
               'scrollbar-color': `${style} ${style}`,
               '&:hover': {
                  'scrollbar-color': `${color(style).lighten(.2)} ${style}`,
               },
               '&::-webkit-scrollbar': {
                  width: '8px',
                  background: style,
               },
               '&:hover::-webkit-scrollbar-thumb': {
                  background: color(style).lighten(.2).string()
               }
            })
         }, { values: theme('colors') })

         matchUtilities({
            btn: (value) => ({
               background: value,
               color: color(value).isDark() ? colors.light : colors.dark,
               transition: 'all .2s ease',
               '&:focus': {
                  boxShadow: `var(--tw-ring-inset) 0 0 0 3px ${color(value).fade(.7).string()}`,
               },
               '&:hover': {
                  background: color(value).lighten(.1).string()
               },
               '&:active': {
                  background: color(value).darken(.02).string()
               },
            })
         }, { values: theme('colors') })

         matchUtilities({
            'btn-alt': (value) => ({
               color: value,
               transition: 'all .2s ease',
               '&:focus': {
                  boxShadow: `var(--tw-ring-inset) 0 0 0 2px ${color(value).fade(.8).string()}`,
               },
               '&:hover': {
                  background: color(value).fade(.9).string()
               },
               '&:active': {
                  color: color(value).darken(.02).string()
               },
            })
         }, { values: theme('colors') })
      })
   ],
}