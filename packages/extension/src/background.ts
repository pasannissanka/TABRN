// eslint-disable-next-line import/no-unassigned-import
import { browser, Runtime } from 'webextension-polyfill-ts';

// const handleTabOnActivated = async (activeInfo) => {
//   console.log(await browser.tabs.get(activeInfo));
//   console.log(activeInfo);
// };
// browser.tabs.onUpdated.addListener(handleTabOnActivated);

// browser.webRequest.onBeforeSendHeaders.addListener(
//   (details) => {
//     console.log(details);
//   },
//   { urls: ['http://localhost:4001/*'] },
//   ['blocking', 'requestHeaders', 'extraHeaders']
// );

async function getUserDetails() {
  if (await getCookieConsent()) {
    const request = await fetch('http://localhost:4001/user', {
      method: 'GET',
      credentials: 'include',
    });
    return request.json();
  } else {
    return Promise.reject();
  }
}

async function setCookieConsent() {
  return browser.storage.local.set({ cookie_accept: true });
}

async function setUserId(id: string) {
  return browser.storage.local.set({ userId: id });
}

async function getUserId(): Promise<any> {
  const data = await browser.storage.local.get(['userId']);
  console.log(data);
  if (browser.runtime.lastError) {
    return Promise.reject(new Error(browser.runtime.lastError.message));
  }
  if (data.userId) {
    return Promise.resolve({ id: data.userId });
  }
  return Promise.resolve({ id: undefined });
}

async function getCookieConsent(): Promise<boolean> {
  const data = await browser.storage.local.get(['cookie_accept']);
  console.log(data);
  if (browser.runtime.lastError) {
    return Promise.reject(new Error(browser.runtime.lastError.message));
  }
  if (data.cookie_accept) {
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
}

browser.runtime.onMessage.addListener(
  async (data: any, sender: Runtime.MessageSender) => {
    console.log(data);
    if (data.message === 'cookie_consent_ok') {
      await setCookieConsent();
      return Promise.resolve(true);
    } else if (data.message === 'get_workspaces') {
    } else if (data.message === 'get_user') {
      const userData = await getUserDetails();
      console.log(userData);
      if (userData.data && userData.data._id) {
        await setUserId(userData.data._id);
        return Promise.resolve(userData);
      }
      return Promise.reject();
    } else if (data.message === 'create_bookmark') {
    } else if (data.message === 'get_cookie_consent') {
      return getCookieConsent();
    }
    return Promise.reject(false);
  }
);
