import browser from 'webextension-polyfill';

browser.runtime
  .sendMessage({ message: 'get_cookie_consent' })
  .then((data) => {
    console.log(data);
    if (data) {
      console.log(window.location.pathname);
      window.location.replace('/popups/login_prompt.html');
    }
  })
  .catch((err) => console.log(err));

document.getElementById('accept-btn').addEventListener('click', (e) => {
  browser.runtime
    .sendMessage({ message: 'cookie_consent_ok' })
    .then((data) => {
      console.log(data);
      if (data) {
        console.log(window.location.pathname);
        window.location.replace('/popups/login_prompt.html');
      }
    })
    .catch((err) => console.log(err));
});
