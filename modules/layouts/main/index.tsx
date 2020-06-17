import React from 'react';
import { useRouter } from 'next/router';

import { AppBar, Tabs, Tab, Box } from '@material-ui/core';

const MainLayout: React.FC = ({ children }) => {
  const router = useRouter();

  const [, currentPage] = router.pathname.split('/');

  return (
    <div key="main">
      <AppBar>
        <Tabs
          value={currentPage}
          onChange={(e, value) => {
            router.push(`/${value}/1`);
          }}>
          <Tab label="Characters" value="characters" />
          <Tab label="Episodes" value="episodes" />
          <Tab label="Locations" value="locations" />
        </Tabs>
      </AppBar>
      <Box p={5}>{children}</Box>
    </div>
  );
};

export default MainLayout;
