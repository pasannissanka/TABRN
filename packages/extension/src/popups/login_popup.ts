import { browser } from 'webextension-polyfill-ts';
const button = document.querySelector('button');

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  var redirectURL = browser.identity.getRedirectURL();

  console.log(redirectURL);

  // TODO validation and error handling

  browser.runtime
    .sendMessage({
      message: 'login',
    })
    .then((res) => {
      console.log(res);
      // window.location.replace('/popups/bookmark_popup.html');
    });
});
