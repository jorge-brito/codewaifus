import { writable } from 'svelte/store'

const darkModeStore = () => {
   const { subscribe, set } = writable(false);

   const setDarkMode = (value: boolean) => {
      const root = document.documentElement
      if (value) {
         root.classList.add('dark')
         root.style.colorScheme = 'dark'
         localStorage.setItem('theme', 'dark')
      }
      else {
         root.classList.remove('dark')
         root.style.colorScheme = 'light'
         localStorage.setItem('theme', 'light')
      }
      set(value)
   }
   
   return {
      subscribe,
      set: setDarkMode,
   }
}

export const darkMode = darkModeStore()