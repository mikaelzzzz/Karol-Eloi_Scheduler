import React from 'react';
import { Header, Title } from '../scheduler/StyledComponents';

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <Title>Karol Eloi Conversation Scheduler</Title>
      </Header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
