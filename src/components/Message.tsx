import * as React from 'react';

const Message = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default Message;
