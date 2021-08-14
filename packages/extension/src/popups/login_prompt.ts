import { browser } from 'webextension-polyfill-ts';

browser.runtime
  .sendMessage({ message: 'get_user' })
  .then((data) => {
    console.log(data);
    if (data.data) {
      console.log(window.location.pathname);
      window.location.replace('/popups/bookmark_popup.html');
    }
  })
  .catch((err) => console.log(err));
