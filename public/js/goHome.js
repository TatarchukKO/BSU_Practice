function goHomePage() {
  articleModel.getArticlesSizeFromDb().then((response) => {
    const size = response;
    const onPage = showMoreNews.getNewsAmountOnPage();
    renderArticles(0, onPage).then(() => {
      if (size <= onPage) {
        document.querySelector('.show-more-news').style.display = 'none';
      } else {
        document.querySelector('.show-more-news').style.display = 'block';
      }
      if (!userName) {
        document.querySelector('.sign-in-button').style.visibility = 'visible';
        document.querySelector('.sign-out-button').style.visibility = 'hidden';
        document.querySelector('.user-name').style.visibility = 'hidden';
      } else {
        document.querySelector('.sign-in-button').style.visibility = 'hidden';
        document.querySelector('.sign-out-button').style.visibility = 'visible';
        document.querySelector('.dv-edit-remove-buttons').style.visibility = 'visible';
        document.querySelector('.add-button').style.visibility = 'visible';
        document.querySelector('.user-name').style.visibility = 'visible';
        document.querySelector('.user-name').innerHTML = userName;
      }
      document.querySelector('.detailed-view').style.display = 'none';
      document.querySelector('.authorization').style.display = 'none';
      document.querySelector('#add-news-page').style.display = 'none';
      document.querySelector('#edit-news-page').style.display = 'none';
      document.querySelector('.wrapper').style.display = 'block';
    });
  });
}
