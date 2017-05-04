function findArticles(event) {
  const filterConf = {};
  if (event.keyCode === 13) {
    const inputText = document.getElementById('search-input').value.toLowerCase();
    if (inputText) {
      filterConf.search = inputText;
      renderArticles(0, 6, filterConf);
      return false;
    }
  }
}
