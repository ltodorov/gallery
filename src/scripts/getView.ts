import type { PathLike } from "node:fs";
import { readFile } from "node:fs/promises";

function getView(path: PathLike): Promise<string> {
    return readFile(path, {
        encoding: "utf-8"
    });
}

export {
    getView
};