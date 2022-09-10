import { resolve } from "node:path";
import { readdir } from "node:fs/promises";
import { getView } from "./getView.js";
import { logError } from "./logError.js";

const assetsDir = resolve("public");
const sourceDir = resolve("src");
const viewDir = resolve(sourceDir, "views");
const mainFile = resolve(viewDir, "index.html");
const imageFile = resolve(viewDir, "image.html");
const videoFile = resolve(viewDir, "video.html");
const outputFile = resolve(assetsDir, "index.html");

Promise.all([
    readdir(assetsDir),
    getView(mainFile),
    getView(imageFile),
    getView(videoFile)
]).then(([files, main, image, video]) => {
    const views: Record<string, string> = {
        "jpeg": image,
        "jpg": image,
        "mp4": video
    };
    const filesHtml = files.reduce((acc, file) => {
        const fileExtension = file.split(".").pop();
        const view = fileExtension && views[fileExtension];
        return view ?
            acc + view.replace(/{{file}}/g, file) :
            acc;
    }, "");
    const html = main.replace(/{{root}}/g, filesHtml);
    import("html-minifier-terser").then(async ({ minify }) => {
        try {
            const result = await minify(html, {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true
            });
            const { writeFileSync } = await import("node:fs");
            writeFileSync(outputFile, result);
            console.log(result);
        } catch (err) {
            logError(err);
        }
    }).catch(logError);
}).catch(logError);