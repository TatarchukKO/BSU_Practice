function filterNews() {
  const inputTags = document.querySelector('.tags-filter').value.toLowerCase();
  const inputAuthor = document.querySelector('.author-filter').value.toLowerCase();
  const inputDate = document.querySelector('.date-filter').value;
  if (inputAuthor.trim()) {
    filterConf.author = inputAuthor;
  }
  if (inputTags.trim()) {
    filterConf.tags = inputTags.split(', ');
  }
  if (inputDate.trim()) {
    filterConf.date = new Date(inputDate).toDateString();
  }
  renderArticles(0, showMoreNews.getNewsAmountOnPage(), filterConf);
  document.querySelector('.show-more-news').style.visibility = 'hidden';
}

function resetFilter() {
  filterConf = {};
  document.querySelector('.tags-filter').value = '';
  document.querySelector('.author-filter').value = '';
  document.querySelector('.date-filter').value = '';
  document.querySelector('.show-more-news').style.visibility = 'visible';
  renderArticles(0, 6);
}