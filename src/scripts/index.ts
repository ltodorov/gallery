import { readdir, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { getRootHtml } from "./getRootHtml.js"
import { getView } from "./getView.js"
import { logError } from "./logError.js"

const assetsDir = resolve("public")
const sourceDir = resolve("src")
const viewDir = resolve(sourceDir, "views")
const mainFile = resolve(viewDir, "index.html")
const imageFile = resolve(viewDir, "image.html")
const videoFile = resolve(viewDir, "video.html")
const outputFile = resolve(assetsDir, "index.html")

Promise.all([
    readdir(assetsDir),
    getView(mainFile),
    getView(imageFile),
    getView(videoFile),
])
    .then(async ([files, main, image, video]) => {
        const views: Record<string, string> = {
            jpeg: image,
            jpg: image,
            mp4: video,
        }
        const filesHtml = files.reduce((acc, file) => {
            const fileExtension = file.split(".").pop()
            const view = fileExtension && views[fileExtension.toLowerCase()]
            return view ? acc + view.replace(/{{file}}/g, file) : acc
        }, "")
        const html = main.replace(/{{root}}/g, getRootHtml(filesHtml))
        const { minify } = await import("html-minifier-terser")
        const result = await minify(html, {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
        })
        await writeFile(outputFile, result)
        console.log(result)
    })
    .catch(logError)
