import React, { Suspense } from 'react';

import TabList from './TabList';
import Message from './Message';
import { Loadable } from '../utils';
import { getTabs } from '../Tabs';

const App = () => {
  const [tabsLoadble] = React.useState(
    () => new Loadable<BrowserTabInfo[]>(getTabs()),
  );

  const applyFocus = (id: string) => {
    chrome.runtime.sendMessage({
      type: 'FOCUS_MEET_TAB_REQUEST',
      payload: { id },
    });
  };

  return (
    <div style={{ width: 300, maxHeight: 800 }}>
      <Suspense fallback={<Message>loading</Message>}>
        <TabList
          applyFocus={applyFocus}
          tabsLoadble={tabsLoadble}
          emptyElement={<Message>No Result</Message>}
        />
      </Suspense>
    </div>
  );
};

export default App;
