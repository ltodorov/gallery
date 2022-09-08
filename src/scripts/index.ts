import { resolve } from "path";
import { writeFileSync } from "fs";
import { getDir } from "./getDir.js";
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
    getDir(assetsDir),
    getView(mainFile),
    getView(imageFile),
    getView(videoFile)
]).then(([files, main, image, video]) => {
    const filesHtml = files.reduce((acc, file) => {
        const views: Record<string, string> = {
            "jpg": image,
            "mp4": video
        };
        const fileExtension = file.split(".").pop();
        return fileExtension && Object.hasOwn(views, fileExtension) ?
            acc + views[fileExtension]?.replace(/{{file}}/g, file) :
            acc;
    }, "");
    const html = main.replace("{{root}}", filesHtml);
    import("html-minifier-terser").then(async ({ minify }) => {
        const result = await minify(html, {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        });
        try {
            writeFileSync(outputFile, result);
            console.log(result);
        } catch (err) {
            logError(err);
        }
    }).catch(logError);
}).catch(logError);