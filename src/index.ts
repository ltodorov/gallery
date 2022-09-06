import { readdir, readFile, writeFileSync, type PathLike } from "fs";
import { resolve } from "path";

const assetsDir = resolve("public");
const sourceFile = resolve("src", "index.html");
const outputFile = resolve(assetsDir, "index.html");

function logError(err: any) {
    console.error(err);
}

function readDir(path: PathLike): Promise<string[]> {
    return new Promise((resolve, reject) => {
        readdir(path, (err, files) => {
            if (err) {
                return reject(err);
            }
            return resolve(files);
        });
    });
}

function readTemplate(path: PathLike): Promise<string> {
    return new Promise((resolve, reject) => {
        readFile(path, {
            encoding: "utf-8"
        }, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}

function getItem(file: string) {
    return `<a href="${file}" download>
        <img src="${file}" alt="" loading="lazy" />
    </a>`
}

Promise.all([
    readDir(assetsDir),
    readTemplate(sourceFile),
]).then(([files, data]) => {
    const filesHtml = files
        .reduce((acc, file) => file.toLowerCase().endsWith(".jpg") ?
            acc + getItem(file) : acc, "");
    const html = data.replace("{{root}}", filesHtml);
    import("html-minifier-terser").then(async ({ minify }) => {
        const result = await minify(html, {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
        });
        try {
            writeFileSync(outputFile, result);
            console.log(`${outputFile} has been generated successfully!`);
        } catch(err) {
            logError(err);
        }
    }).catch(logError);
}).catch(logError);