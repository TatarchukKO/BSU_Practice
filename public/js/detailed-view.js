function openDetailedView(currentNews) {
  document.querySelector('.wrapper').style.display = 'none';
  document.querySelector('.show-more-news').style.display = 'none';
  document.querySelector('.detailed-view').style.display = 'inline-block';
  const id = currentNews.dataset.id;
  articleModel.getArticleFromDb(id).then((response) => {
    const article = response;
    document.querySelector('.detailed-view').dataset.id = id;
    document.querySelector('.dv-title').textContent = article.title;
    document.querySelector('.dv-img').setAttribute('src', article.image);
    document.querySelector('.dv-content').textContent = article.content;
    document.querySelector('.dv-author').textContent = article.author;
    document.querySelector('.dv-date').textContent = article.createdAt.toDateString();
    document.querySelector('.dv-tags').textContent = '';
    for (let j = 0; j < article.tags.length; j++) {
      document.querySelector('.dv-tags').textContent += (`#${article.tags[j].trim()} `);
    }
  });
}
