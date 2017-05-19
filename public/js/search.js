function findArticles(event) {
  if (event.keyCode === 13) {
    const inputText = document.getElementById('search-input').value;
    if (inputText) {
      filterConf.searchTitle = inputText;
      showMoreNews.setNewsAmountOnPage(6);
      document.querySelector('.show-more-news').style.visibility = 'visible';
      renderArticles(0, showMoreNews.getNewsAmountOnPage(), filterConf).then(() => {
        if (showMoreNews.getNewsAmountOnPage() >= totalArticlesAmount)
          document.querySelector('.show-more-news').style.visibility = 'hidden';
      });
      return false;
    }
  }
}
