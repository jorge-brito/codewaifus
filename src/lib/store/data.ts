import { page } from '$app/stores'
import { derived, writable } from 'svelte/store'

export interface Waifu {
   url: string
   name: string
   width: number
   height: number
   category: string
}

export interface Category {
   title: string;
   count: number;
   link: string;
}

export const waifus = writable([] as Waifu[])
export const categories = writable([] as Category[])
export const search = derived(page, (page) => page.params.search);
export const category = derived(page, (page) => page.params.category?.toLowerCase());

export const getWaifus = async (): Promise<void> => {
   const res = await fetch('/waifus.json')
   const body = await res.json()
   waifus.set(body.waifus)
   categories.set(body.categories)
}