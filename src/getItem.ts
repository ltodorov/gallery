function getItem(file: string) {
    return `<a href="${file}" download>
        <img src="${file}" alt="" loading="lazy" />
    </a>`
}

export {
    getItem
};