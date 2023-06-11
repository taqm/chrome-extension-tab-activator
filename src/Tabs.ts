export const getTabs = () =>
  new Promise<BrowserTabInfo[]>((resolve) => {
    chrome.runtime.onMessage.addListener(function listener(
      message: FromBackgroundMessage,
    ) {
      if (message.type === 'GET_TABS_RESULT') {
        resolve(message.payload.tabs);
      }
      chrome.runtime.onMessage.removeListener(listener);
    });

    chrome.runtime.sendMessage({ type: 'GET_TABS_REQUEST' });
  });
