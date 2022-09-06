import { type PathLike, readdir } from "fs";

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

export {
    readDir
};