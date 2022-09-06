import { type PathLike, readFile } from "fs";

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

export {
    readTemplate
};