function validateArticle(article) {
    let imgRegExp = /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i;
    if (article.id && article.createdAt && article.tags && article.author &&
        article.content && article.title && article.image &&
        typeof article.id === "string" && typeof  article.createdAt === "object" &&
        typeof article.tags === "object" && typeof  article.author === "string" &&
        typeof  article.content === "string" && typeof  article.title === "string" &&
        article.title.length > 0 && article.image.search(imgRegExp) !== -1 &&
        article.tags.length > 0 && article.tags.length < 6 &&
        article.content.length > 0 && article.author.length > 0) {
        return true;
    } else {
        return false;
    }
}
function validateTags(tagsStr) {
    if (tagsStr.length > 0)
        return true;
    else
        return false;
}

module.exports = {
    validateArticle,
    validateTags,
};