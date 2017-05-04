function removeNews(currentNews) {
  const id = currentNews.dataset.id;
  articleModel.removeArticleFromDb(id).then(() => {
    renderArticles(0, 6);
  });
  document.querySelector('.detailed-view').style.display = 'none';
  document.querySelector('.wrapper').style.display = 'block';
}
