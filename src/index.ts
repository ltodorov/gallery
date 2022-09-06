import { writeFileSync } from "fs";
import { resolve } from "path";
import { readDir } from "./readDir.js";
import { readTemplate } from "./readTemplate.js";
import { getItem } from "./getItem.js";
import { logError } from "./logError.js";

const assetsDir = resolve("public");
const sourceFile = resolve("src", "index.html");
const outputFile = resolve(assetsDir, "index.html");

Promise.all([
    readDir(assetsDir),
    readTemplate(sourceFile)
]).then(([files, data]) => {
    const filesHtml = files.reduce((acc, file) =>
        file.toLowerCase().endsWith(".jpg") ?
            acc + getItem(file) : acc, "");
    const html = data.replace("{{root}}", filesHtml);
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
            console.log(`${outputFile} has been generated successfully!`);
        } catch (err) {
            logError(err);
        }
    }).catch(logError);
}).catch(logError);