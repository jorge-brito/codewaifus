/*

Script for downloading our waifus

*/

import sizeof from 'image-size'
import fs from 'fs'
import degit from 'degit'
import { join } from 'path'

const result = {
   waifus: [],
   categories: [],
}

const imgDir = join('static', 'images')
const repo = 'cat-milk/Anime-Girls-Holding-Programming-Books'
const imgURL = `https://raw.githubusercontent.com/${repo}/master`

const emitter = degit(repo, { force: true, cache: true })
const encodeURL = (...paths) => paths.map(encodeURIComponent).join('/')

try {
   console.log("Downloading waifus...")
   await emitter.clone("static/images")

   for (const dir of fs.readdirSync(imgDir)) {
      const path = join(imgDir, dir)
      const isDir = fs.statSync(path).isDirectory()
      
      if (isDir) {
         const category = dir
         const images = fs.readdirSync(path)

         console.log(`Downloading waifus with ${category} books...`)

         const list = [];
         
         for (const name of images) {
            const url = `${imgURL}/${encodeURL(category, name)}`
            const buffer = fs.readFileSync(join(path, name))
            const { width, height } = sizeof(buffer)

            list.push({
               url,
               name,
               width,
               height,
               category,
            })
         }

         result.waifus.push(...list);
         result.categories.push({
            title: category,
            link: '/' + encodeURIComponent(category.toLowerCase()),
            count: list.length,
         });
      }

   }

   result.categories.unshift({
      title: 'All',
      link: '/',
      count: result.waifus.length,
   });

} catch (e) {
   console.error("Failed to download waifus")
   console.error(e)
} finally {
   if (result.waifus)
      fs.writeFileSync(
         join('static', 'waifus.json'),
         JSON.stringify(result, null, 3) 
      )
   fs.rmSync(imgDir, { recursive: true })
   console.log("Done!")
}
