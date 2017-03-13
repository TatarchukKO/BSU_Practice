/**
 * Created by Kanstantsin on 06.03.2017.
 */
var news = [
    {
        id: 1,
        title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
        summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
        createdAt: new Date('2017-02-28T23:00:00'),
        author: 'Костя Труш',
        content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
        tags: [
            "Спорт", "Жизнь"
        ]
    },
    {
        id: 2,
        title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
        summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
        createdAt: new Date('2017-02-27T23:00:00'),
        author: 'Иванов Иван',
        content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
        tags: [
            "Спорт", "Жизнь"
        ]
    },
    {
        id: 3,
        title: 'Минское «Динамо» обыграло ярославский «Локомотив»',
        summary: 'Минское «Динамо» обыграло ярославский «Локомотив» в четвертом матче первого раунда плей-офф КХЛ — 4:2',
        createdAt: new Date('2017-02-27T23:00:00'),
        author: 'Иванов Иван',
        content: 'Гости создали больше опасных моментов и в два раза перебросали минчан, но «зубры» на этот раз очень эффективно использовали свои моменты.',
        tags: [
            "Спорт", "Жизнь"
        ]
    }];

var tags = ["Музыка", "Спорт", "Искусство"];

function containsTags(tagList, news) {
    for (var i = 0; i < tagList.tags.length; i++) {
        if (news.tags.indexOf(tagList.tags[i]) === -1) {
            return false;
        }
    }
    return true;
}

function getArticles(skip, top, filterconfig) {
    if (skip > news.length) {
        return null;
    } else {
        var newArr = [];
        var j = 0;
        for (var i = skip; i < news.length, i - skip < top; i++) {
            if (filterconfig === undefined) {
                newArr[i - skip] = news[i];
            } else {
                if (filterconfig.author === undefined) {
                    if (filterconfig.dateBefore === undefined && filterconfig.dateAfter === undefined) {
                        if (containsTags(filterconfig, news[i])) {
                            newArr[i - skip] = news[i];
                        }
                    } else if (filterconfig.dateBefore === undefined && filterconfig.dateAfter != undefined) {
                        if (filterconfig.dateAfter <= news[i].createdAt) {
                            if (filterconfig.tags != undefined) {
                                if (containsTags(filterConfig, news[i])) {
                                    newArr[i - skip] = news[i];
                                }
                            } else if (filterconfig.tags === undefined) {
                                newArr[i - skip] = news[i];
                            }
                        }
                    } else if (filterconfig.dateBefore != undefined && filterconfig.dateAfter === undefined) {
                        if (filterconfig.dateBefore >= news[i].createdAt) {
                            if (filterconfig.tags != undefined) {
                                if (containsTags(filterConfig, news[i])) {
                                    newArr[i - skip] = news[i];
                                }
                            } else if (filterconfig.tags === undefined) {
                                newArr[i - skip] = news[i];
                            }
                        }
                    } else if (filterconfig.dateBefore != undefined && filterconfig.dateAfter != undefined) {
                        if (filterconfig.dateBefore >= news[i].createdAt && filterconfig.dateAfter <= news[i].createdAt) {
                            if (filterconfig.tags != undefined) {
                                if (containsTags(filterconfig, news[i])) {
                                    newArr[i - skip] = news[i];
                                }
                            } else if (filterconfig.tags === undefined) {
                                newArr[i - skip] = news[i];
                            }
                        }
                    }
                } else if (filterconfig.author != undefined) {
                    if (filterconfig.dateBefore === undefined && filterconfig.dateAfter === undefined) {
                        if (filterconfig.tags != undefined) {
                            if (containsTags(filterconfig, news[i]) && filterconfig.author === news[i].author) {
                                newArr[i - skip] = news[i];
                            }
                        } else if (filterconfig.author === news[i].author) {
                            newArr[i - skip] = news[i];
                        }
                    } else if (filterconfig.dateBefore === undefined && filterconfig.dateAfter != undefined) {
                        if (filterconfig.dateAfter <= news[i].createdAt && filterconfig.author === news[i].author) {
                            if (filterconfig.tags != undefined) {
                                if (containsTags(filterConfig, news[i])) {
                                    newArr[i - skip] = news[i];
                                }
                            } else if (filterconfig.tags === undefined) {
                                newArr[i - skip] = news[i];
                            }
                        }
                    } else if (filterconfig.dateBefore != undefined && filterconfig.dateAfter === undefined) {
                        if (filterconfig.dateBefore >= news[i].createdAt && filterconfig.author === news[i].author) {
                            if (filterconfig.tags != undefined) {
                                if (containsTags(filterconfig, news[i])) {
                                    newArr[i - skip] = news[i];
                                }
                            } else if (filterconfig.tags === undefined) {
                                newArr[i - skip] = news[i];
                            }
                        }
                    } else if (filterconfig.dateBefore != undefined && filterconfig.dateAfter != undefined) {
                        if (filterconfig.dateBefore >= news[i].createdAt && filterconfig.dateAfter <= news[i].createdAt && filterconfig.author === news[i].author) {
                            if (filterconfig.tags != undefined) {
                                if (containsTags(filterconfig, news[i])) {
                                    newArr[i - skip] = news[i];
                                }
                            } else if (filterconfig.tags === undefined) {
                                newArr[i - skip] = news[i];
                            }
                        }
                    }
                }

            }

        }
        return newArr;
    }
}

function getArticle(id) {
    for (var i = 0; i < news.length; i++) {
        if (news[i].id === id) {
            return news[i];
        }
    }
}

function validateArticle(obj) {
    if (
        (obj.id != undefined && typeof obj.id == "number") &&
        (obj.title != undefined && typeof obj.title == "string" ) &&
        (obj.author != undefined && typeof obj.author == "string") &&
        (obj.content != undefined && typeof obj.content == "string" ) &&
        (obj.summary != undefined && typeof obj.summary == "string") &&
        (obj.createdAt != undefined && typeof obj.createdAt == "object") &&
        (obj.tags != undefined && typeof obj.tags == "object") &&
        (obj.tags.length > 0 && obj.title.length < 100 && obj.summary.length < 200)
    ) {
        return true;
    }
    return false;
}

function addArticle(obj) {
    if (validateArticle(obj)) {
        for (var i = 0; i < obj.tags.length; i++) {
            if (tags.indexOf(obj.tags[i]) === -1) {
                tags.push(obj.tags[i]);
            }
        }
        news.push(obj);
        return true;
    }
    return false;
}

function removeArticle(id) {
    for (var i = 0; i < news.length; i++) {
        if (news[i].id === id) {
            news.splice(i, 1);
        }
    }
}

function editArticle(id, obj) {
    if (obj.author != undefined || obj.id != undefined || obj.createdAt != undefined || obj.tags != undefined) {
        return false;
    }
    for (var i = 0; i < news.length; i++) {
        if (id === news[i].id) {
            if (validateArticle(news[i])) {
                if (obj.title != undefined && obj.content != undefined && obj.summary != undefined) {
                    news[i].title = obj.title;
                    news[i].content = obj.content;
                    news[i].summary = obj.summary;
                    return true;
                } else if (obj.title === undefined && obj.content != undefined && obj.summary === undefined) {
                    news[i].content = obj.content;
                    return true;
                } else if (obj.title != undefined && obj.content === undefined && obj.summary === undefined) {
                    news[i].title = obj.title;
                    return true;
                } else if (obj.title === undefined && obj.content === undefined && obj.summary != undefined) {
                    news[i].summary = obj.summary;
                    return true;
                } else if (obj.title != undefined && obj.content === undefined && obj.summary != undefined) {
                    news[i].summary = obj.summary;
                    news[i].title = obj.title;
                    return true;
                } else if (obj.title === undefined && obj.content != undefined && obj.summary != undefined) {
                    news[i].summary = obj.summary;
                    news[i].content = obj.content;
                    return true;
                } else if (obj.title != undefined && obj.content != undefined && obj.summary === undefined) {
                    news[i].title = obj.title;
                    news[i].content = obj.content;
                    return true;
                }
            }
        }
    }
}
