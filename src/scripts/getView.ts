import { type PathLike, readFile } from "node:fs";

function getView(path: PathLike): Promise<string> {
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
    getView
};