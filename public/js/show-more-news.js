const showMoreNews = (function () {
  let newsAmountOnPage = 6;

  function showMore() {
      if (newsAmountOnPage < 10)
      {
        newsAmountOnPage += 6;
        renderArticles(0, newsAmountOnPage, filterConf);
      }
      if (newsAmountOnPage >= 10)
        document.querySelector('.show-more-news').style.visibility = 'hidden';
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
