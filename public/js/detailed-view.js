function openDetailedView(currentNews) {
  const id = currentNews.dataset.id;
  articleModel.getArticleFromDb(id).then((response) => {
    document.querySelector('.detailed-view').dataset.id = id;
    document.querySelector('.dv-title').textContent = response.title;
    document.querySelector('.dv-img').setAttribute('src', response.image);
    document.querySelector('.dv-content').textContent = response.content;
    document.querySelector('.dv-author').textContent = response.author;
    document.querySelector('.dv-date').textContent = response.createdAt;
    document.querySelector('.dv-tags').textContent = '';
    for (let j = 0; j < response.tags.length; j++) {
      document.querySelector('.dv-tags').textContent += (`#${response.tags[j].trim()} `);
    }
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.show-more-news').style.display = 'none';
    document.querySelector('.detailed-view').style.display = 'inline-block';
  });
}
