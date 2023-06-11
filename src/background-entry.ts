const getGoogleMeetTabs = (sender: chrome.runtime.MessageSender) =>
  chrome.tabs.query({}, (res) => {
    const tabs = res.map((v) => ({
      id: String(v.id),
      title: v.title!,
      url: v.url!,
    }));

    chrome.runtime.sendMessage(sender.id!, {
      type: 'GET_TABS_RESULT',
      payload: {
        tabs,
      },
    } as GetTabsResult);
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
