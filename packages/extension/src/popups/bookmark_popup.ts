import { browser } from 'webextension-polyfill-ts';

let text = '';
let workspacesData: any[];
let tagsData: any[];

browser.tabs.query({ currentWindow: true, active: true }).then((tab) => {
  text = `# ${tab[0].title}\n\n`;
  (document.getElementById('bookmark_data') as HTMLTextAreaElement).value =
    text;
});

browser.runtime
  .sendMessage({ message: 'get_create_bookmark_data' })
  .then((data) => {
    console.log(data);
    if (data) {
      workspacesData = data.data.workspaces;
      tagsData = data.tags;

      const options = workspacesData.map((workspace) => {
        const elem = document.createElement('option');
        elem.text = workspace.value;
        elem.value = workspace.key;
        return elem as Node;
      });

      options.forEach((option) => {
        (
          document.getElementById('workspace_select') as HTMLSelectElement
        ).appendChild(option);
      });
    }
  })
  .catch((err) => console.log(err));

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const tab = await browser.tabs.query({ currentWindow: true, active: true });

  const content = (
    document.querySelector('#bookmark_data') as HTMLTextAreaElement
  ).value;

  const workspace = (
    document.getElementById('workspace_select') as HTMLSelectElement
  ).value;

  const bookmark = {
    url: tab[0].url,
    workspaceId: workspace,
    content: content,
    linkData: {
      title: tab[0].title,
      faviconUrl: tab[0].favIconUrl,
      hostname: new URL(tab[0].url).hostname,
    },
  };

  console.log(bookmark);

  // const doc = document.getElementById('form').innerHTML;

  let response: any;
  try {
    response = await browser.runtime.sendMessage({
      message: 'create_new_bookmark',
      payload: bookmark,
    });
  } catch (error) {
    console.log(error);
  }
  // document.getElementById('form').innerHTML = content;
  if (response.message === 'SUCCESS') {
    window.close();
  }

  console.log(response);
});
