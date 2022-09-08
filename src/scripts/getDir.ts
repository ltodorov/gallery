import { type PathLike, readdir } from "fs";

function getDir(path: PathLike): Promise<string[]> {
    return new Promise((resolve, reject) => {
        readdir(path, (err, files) => {
            if (err) {
                return reject(err);
            }
            return resolve(files);
        });
    });
}

export {
    getDir
};