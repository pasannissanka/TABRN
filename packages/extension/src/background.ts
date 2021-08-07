// eslint-disable-next-line import/no-unassigned-import
// Don't forget to import this wherever you use it
import { browser } from 'webextension-polyfill-ts';

const handleTabOnActivated = async (activeInfo) => {
  console.log(await browser.tabs.get(activeInfo));
  console.log(activeInfo);
};

browser.tabs.onUpdated.addListener(handleTabOnActivated);

browser.runtime.onMessage.addListener(async (data, _) => {
  console.log(data);
  if (data.message === 'login') {
    try {
      const res = await loginUser();

      if (browser.runtime.lastError) {
        return Promise.reject(browser.runtime.lastError);
      }
      return Promise.resolve({
        response: res,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  } else if (data.message === 'SiteInfo-loggedIn') {
    try {
      const status = await isLoggedIn();
      console.log(status);
      return Promise.resolve(status);
    } catch (error) {
      return Promise.reject(error);
    }
  } else if (data.message === 'logout') {
    try {
      const status = await isLoggedIn();
      if (!status.status) {
        return Promise.reject(false);
      }
      await logoutUser();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  } else if (data.message === 'createBookmark') {
    try {
      const status = await isLoggedIn();
      const res = await newBookmark(data.payload, status.userInfo);
      console.log(res);
      return Promise.resolve(res);
    } catch (error) {
      Promise.reject(error);
    }
  }
  return Promise.reject(false);
});

async function loginUser() {
  const cookie = await browser.cookies.get({
    url: 'http://localhost:3000',
    name: 'express:sess',
  });

  if (cookie) {
    console.log(cookie.value);
  }
}

async function isLoggedIn() {
  const cookie = await browser.cookies.get({
    url: 'http://localhost:3000',
    name: 'express:sess',
  });

  if (cookie) {
    console.log(cookie.value);
    return Promise.resolve(cookie.)
  }

  const userInfo = await browser.storage.local.get(['token', 'userId']);
  if (browser.runtime.lastError) {
    return Promise.resolve({ status: false, userInfo: undefined });
  }
  console.log(userInfo);
  if (userInfo.token && userInfo.userId) {
    console.log('user info', userInfo.token, userInfo.userId);
    return Promise.resolve({ status: true, userInfo: userInfo });
  }
  return Promise.resolve({ status: false, userInfo: undefined });
}

async function logoutUser() {
  await browser.storage.local.remove(['token', 'userId']);
  if (browser.runtime.lastError) {
    return Promise.reject();
  }
  return Promise.resolve('ok');
}

async function newBookmark(data, userInfo) {
  const response = await fetch('http://localhost:4000/bookmark/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${userInfo.token}`,
    },
    mode: 'cors',
    body: JSON.stringify(data),
  });
  return response.json();
}
