import type { Writable } from "svelte/store";
/**
 * Download the image from the specified url
*/
export const download = async (url: string, filename: string): Promise<void> => {
   const res = await fetch(url);
   const blob = await res.blob();
   const a = document.createElement('a');
   a.href = URL.createObjectURL(blob);
   a.style.position = 'absolute';
   a.style.opacity = '0';
   a.download = filename;
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
};

export const hovered = (node: HTMLElement, state: Writable<boolean>): unknown => {
   const mouseenter = () => state.set(true)
   const mouseleave = () => state.set(false)

   node.addEventListener('mouseenter', mouseenter);
   node.addEventListener('mouseleave', mouseleave);

   return { 
      destroy: () => {
         node.removeEventListener('mouseenter', mouseenter);
         node.removeEventListener('mouseleave', mouseleave);
      } 
   }
}

export const capitalize = (str: string): string => {
   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const escapeRegex = (str: string): string => {
   return str.split('').map(char => {
      if (/[^\w\s]/i.test(char))
         return '\\' + char;

      return char;
   }).join('')
}

export const extract = <T, K extends keyof T>(array: T[], prop: K): T[K][] => {
   return array.map((item) => item[prop])
}