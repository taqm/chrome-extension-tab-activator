import * as React from 'react';
import { Loadable } from '../utils';

type Props = {
  applyFocus: (id: string) => void;
  tabsLoadble: Loadable<BrowserTabInfo[]>;
  emptyElement: React.ReactElement;
};

const TabList: React.FC<Props> = (props) => {
  const [text, setText] = React.useState('');

  const onClickHandler = (id: string) => () => props.applyFocus(id);
  const tabs = props.tabsLoadble.getOrThrow();
  const filtered = tabs.filter((tab) => tab.title.includes(text));

  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    ref.current?.focus();
  }, [ref]);

  return (
    <div>
      <div className="pure-form" style={{ padding: '8px 8px 4px' }}>
        <input
          ref={ref}
          type="text"
          value={text}
          style={{ width: '100%' }}
          onChange={(ev) => {
            setText(ev.target.value);
          }}
        />
      </div>
      {filtered.length === 0 && props.emptyElement}
      {filtered.length > 0 && (
        <ul className="pure-menu-list" style={{ overflowY: 'auto' }}>
          {filtered.map((tab) => (
            <li
              key={tab.id}
              className="pure-menu-item"
              onClick={onClickHandler(tab.id)}
            >
              <div
                className="pure-menu-link"
                style={{
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.title}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TabList;
