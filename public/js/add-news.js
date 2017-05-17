function goToAddPage() {
  document.querySelector('.wrapper').style.display = 'none';
  document.querySelector('.show-more-news').style.display = 'none';
  document.querySelector('#add-news-page').style.display = 'block';
}
function addNewsOnButton() {
  const article = {
    title: document.querySelector('#add-news-title').value,
    image: document.querySelector('#add-news-img').value,
    author: userName,
    content: document.querySelector('#add-news-content').value,
    tags: document.querySelector('#add-news-tags').value.toLowerCase(),
  };
  if (articleModel.validateArticle(article))
    articleModel.addArticleInDb(article).then(() => {
      location.reload();
    });
  else
    alert('Article was not added, make sure your fields filled correctly');
}
