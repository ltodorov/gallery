function getRootHtml(filesHtml: string) {
    return filesHtml.length ?
        filesHtml :
        "<p>No media files in the public folder.</p>";
}

export {
    getRootHtml
};