function filterNews() {
  const filterConf = {};
  const inputTags = document.querySelector('.tags-filter').value.toLowerCase();
  const inputAuthor = document.querySelector('.author-filter').value.toLowerCase();
  const inputDate = document.querySelector('.date-filter').value;

  if (inputAuthor) {
    filterConf.author = inputAuthor;
  }
  if (inputTags.length !== 0) {
    filterConf.tags = inputTags.split(',');
  }
  if (inputDate) {
    filterConf.date = new Date(inputDate).toDateString();
  }

  renderArticles(0, 6, filterConf);
}
