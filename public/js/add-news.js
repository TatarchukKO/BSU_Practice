function goToAddPage() {
  document.querySelector('.wrapper').style.display = 'none';
  document.querySelector('.show-more-news').style.display = 'none';
  document.querySelector('#add-news-page').style.display = 'block';
}
function addNewsOnButton() {
  const article = {
    id: userName + new Date().toString(),
    title: document.querySelector('#add-news-title').value,
    image: document.querySelector('#add-news-img').value,
    author: userName,
    content: document.querySelector('#add-news-content').value,
    tags: document.querySelector('#add-news-tags').value.toLowerCase(),
  };

  articleModel.addArticleInDb(article).then(() => {
    renderArticles(0, 6);
  });

  document.querySelector('.wrapper').style.display = 'block';
  document.querySelector('.show-more-news').style.display = 'block';
  document.querySelector('#add-news-page').style.display = 'none';
}
