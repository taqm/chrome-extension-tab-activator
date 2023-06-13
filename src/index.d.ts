type BrowserTabInfo = {
  id: string;
  title: string;
  url: string;
  faviconUrl: string;
};

type GetTabsRequest = {
  type: 'GET_TABS_REQUEST';
};

type GetTabsResult = {
  type: 'GET_TABS_RESULT';
  payload: {
    tabs: BrowserTabInfo[];
  };
};

type FocusMeetTabRequest = {
  type: 'FOCUS_MEET_TAB_REQUEST';
  payload: {
    id: string;
  };
};

type ToBackendMessage = GetTabsRequest | FocusMeetTabRequest;
type FromBackgroundMessage = GetTabsResult;
