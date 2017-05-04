let userName = null;

const authorizationModel = (function () {
  function logIn(user) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('POST', '/login');
      request.setRequestHeader('content-type', 'application/json');
      request.onload = () => {
        if (request.status === 200) {
          resolve();
        } else {
          reject();
        }
      };
      request.onerror = () => {
        reject(new Error('post user error'));
      };
      request.send(JSON.stringify(user));
    });
  }

  function logOut() {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', '/logout');
      request.onload = () => {
        if (request.status === 200) {
          resolve();
        }
      };
      request.onerror = () => {
        reject(new Error('log out error'));
      };
      request.send();
    });
  }

  function getUsername() {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', '/username');
      request.onload = () => {
        if (request.status === 200) {
          resolve(request.responseText);
        } else {
          reject();
        }
      };
      request.onerror = () => {
        reject(new Error('getting username error'));
      };
      request.send();
    });
  }

  function doLogIn() {
    const username = document.getElementById('login').value;
    const password = document.getElementById('pass').value;
    if (!username) {
      return false;
    }
    if (!password) {
      return false;
    }
    logIn({username, password}).then(
      () => {
        getUsername().then((response) => {
          userName = response;
          goHomePage();
        });
      },
      () => {
        alert('Wrong login or password');
      }
    );
  }

  function pressLogInButton() {
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.detailed-view').style.display = 'none';
    document.querySelector('.show-more-news').style.display = 'none';
    document.querySelector('.sign-in-button').style.visibility = 'hidden';
    document.querySelector('.authorization').style.display = 'block';
  }

  function pressLogOutButton() {
    logOut().then(() => {
      document.querySelector('.sign-in-button').style.visibility = 'visible';
      document.querySelector('.sign-out-button').style.visibility = 'hidden';
      document.querySelector('.user-name').style.visibility = 'hidden';
      document.querySelector('.dv-edit-remove-buttons').style.visibility = 'hidden';
      document.querySelector('.user-name').innerHTML = '';
      document.querySelector('.add-button').style.visibility = 'hidden';
      userName = null;
    });
  }

  return {
    doLogIn,
    pressLogInButton,
    getUsername,
    pressLogOutButton,
    logOut,
  };
}());

