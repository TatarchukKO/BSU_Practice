const eventListeners = (function () {
  function addListeners() {
    let item = document.querySelector('.home-img');
    item.addEventListener('click', goHomePage);

    item = document.querySelector('.sign-out-button');
    item.addEventListener('click', authoModel.pressLogOutButton);

    item = document.querySelector('.sign-in-button');
    item.addEventListener('click', authoModel.pressLogInButton);

    item = document.querySelector('.find-button');
    item.addEventListener('click', filterNews);

    item = document.querySelector('.add-button');
    item.addEventListener('click', goToAddPage);

    item = document.querySelector('.show-more-news');
    item.addEventListener('click', showMoreNews.showMore);

    item = document.querySelector('.dv-edit-news-button');
    item.addEventListener('click', articleEdit.goToEditPage);
  }

  return {
    addListeners,
  };
}());

