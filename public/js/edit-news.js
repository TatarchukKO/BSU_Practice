const articleEdit = (function () {
  let id;

  function goToEditPage(currentNews) {
    document.querySelector('.detailed-view').style.display = 'none';
    document.querySelector('#edit-news-page').style.display = 'block';

    id = currentNews.dataset.id;
    articleModel.getArticleFromDb(id).then((response) => {
      const article = response;
      document.querySelector('#edit-news-title').textContent = article.title;
      document.querySelector('#edit-news-img').textContent = article.image;
      document.querySelector('#edit-news-content').textContent = article.content;
      document.querySelector('#edit-news-tags').textContent = article.tags;
    });
  }

  function editNews() {
    const newFields = {};

    const newTitle = document.querySelector('#edit-news-title').value;
    const newContent = document.querySelector('#edit-news-content').value;
    const newImage = document.querySelector('#edit-news-img').value;
    const newTags = document.querySelector('#edit-news-tags').value;

    if (!newTitle.trim() || !newContent.trim() || !newImage.trim() || !newTags.trim()){
      alert("fill all fields, please!");
      return false;
    }

    newFields.title = document.querySelector('#edit-news-title').value;
    newFields.content = document.querySelector('#edit-news-content').value;
    newFields.image = document.querySelector('#edit-news-img').value;
    newFields.tags = document.querySelector('#edit-news-tags').value;
    newFields.author = userName;
    newFields.id = id;

    articleModel.editArticleFromDb(newFields).then(() => {
      renderArticles(0, showMoreNews.getNewsAmountOnPage()).then(() => {
        goHomePage();
      });
    });
  }

  return {
    goToEditPage,
    editNews,
  };
}());
