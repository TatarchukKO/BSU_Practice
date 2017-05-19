const showMoreNews = (function () {
  let newsAmountOnPage = 6;

  function showMore() {
    newsAmountOnPage += 6;
    renderArticles(0, newsAmountOnPage, filterConf).then(() => {
      if (newsAmountOnPage >= totalArticlesAmount)
        document.querySelector('.show-more-news').style.visibility = 'hidden';
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
