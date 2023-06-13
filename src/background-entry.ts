const getGoogleMeetTabs = (sender: chrome.runtime.MessageSender) =>
  chrome.tabs.query({}, (res) => {
    const tabs = res.map<BrowserTabInfo>((v) => ({
      id: String(v.id),
      title: v.title!,
      url: v.url!,
      faviconUrl:
        v.favIconUrl ||
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOUqwcAAMEAnwarUJAAAAAASUVORK5CYII=',
    }));

    const result: GetTabsResult = {
      type: 'GET_TABS_RESULT',
      payload: {
        tabs,
      },
    };

    chrome.runtime.sendMessage(sender.id!, result);
  });

chrome.runtime.onMessage.addListener(
  (message: ToBackendMessage, sender, sendResponse) => {
    if (message.type === 'GET_TABS_REQUEST') {
      getGoogleMeetTabs(sender);
    }
    if (message.type === 'FOCUS_MEET_TAB_REQUEST') {
      chrome.tabs.update(
        Number(message.payload.id),
        { active: true },
        (tab) => {
          chrome.windows.update(tab!.windowId, { focused: true });
        },
      );
    }
    return true;
  },
);
