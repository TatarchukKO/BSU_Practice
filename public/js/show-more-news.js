const showMoreNews = (function () {
  let newsAmountOnPage = 6;

  function startApp() {
    newsAmountOnPage += 6;
    articleRenderer.init();
    renderArticles(0, newsAmountOnPage);
    document.querySelector('.show-more-news').style.visibility = 'visible';
  }

  function showMore() {
    articleModel.getArticlesSizeFromDb().then((response) => {
      const size = response;
      if (newsAmountOnPage < size) {
        startApp();
      }
      if (newsAmountOnPage >= size) {
        document.querySelector('.show-more-news').style.visibility = 'hidden';
      }
    });
  }

  function setNewsAmountOnPage(amount) {
    newsAmountOnPage = amount;
  }
  function getNewsAmountOnPage() {
    return newsAmountOnPage;
  }

  return {
    showMore,
    setNewsAmountOnPage,
    getNewsAmountOnPage,
  };
}());
