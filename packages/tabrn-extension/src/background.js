async function getCookieConsent() {
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

async function setCookieConsent() {
  return browser.storage.local.set({ cookie_accept: true });
}

async function removeCookieConsent() {
  browser.storage.local.remove('cookie_accept');
  if (browser.runtime.lastError) {
    return Promise.reject(new Error(browser.runtime.lastError.message));
  }
  return Promise.resolve(true);
}

async function setUserId(id) {
  return browser.storage.local.set({ userId: id });
}

async function getUserId() {
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

async function getViewData(workspaceId) {
  const cookieOk = await getCookieConsent();
  const userId = await getUserId();
  if (cookieOk && userId.id !== undefined) {
    const request = await fetch(
      `http://localhost:4001/extension/${workspaceId}/views`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    return request.json();
  } else {
    return Promise.reject(new Error('Unauthorized'));
  }
}

async function createNewBookmark(payload) {
  const cookieOk = await getCookieConsent();
  const userId = await getUserId();
  if (cookieOk && userId.id !== undefined) {
    const request = await fetch('http://localhost:4001/bookmark/create', {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return request.json();
  } else {
    return Promise.reject(new Error('Unauthorized'));
  }
}

async function getBookmarkData() {
  const cookieOk = await getCookieConsent();
  const userId = await getUserId();
  if (cookieOk && userId.id !== undefined) {
    const request = await fetch('http://localhost:4001/extension/data', {
      method: 'GET',
      credentials: 'include',
    });
    return request.json();
  } else {
    return Promise.reject(new Error('Unauthorized'));
  }
}

browser.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  console.log(request);
  if (request.message === 'cookie_consent_ok') {
    await setCookieConsent();
    return Promise.resolve(true);
  } else if (request.message === 'get_create_bookmark_data') {
    return getBookmarkData();
  } else if (request.message === 'get_user') {
    const userData = await getUserDetails();
    console.log(userData);
    if (userData.data && userData.data._id) {
      await setUserId(userData.data._id);
      return Promise.resolve(userData);
    }
    return Promise.reject();
  } else if (request.message === 'create_new_bookmark') {
    return createNewBookmark(request.payload);
  } else if (request.message === 'get_cookie_consent') {
    return getCookieConsent();
  } else if (request.message === 'get_workspace_views') {
    return getViewData(request.payload.workspaceId);
  } else if (request.message === 'remove_cookie_consent') {
    return removeCookieConsent();
  }
  return Promise.reject(false);
});
