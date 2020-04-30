import React from 'react';
import { Route } from 'react-router-dom';

export interface RoutingConfigItem {
  path: string;
  component: React.FunctionComponent;
}

function getSlotPageRoutingConfig() {
  const routers = require.context('@slot-pages', true, /route-config\.ts/);
  const importAll: RoutingConfigItem[] = [];
  routers.keys().forEach((key: string) => {
    importAll.push(routers(key).default);
  });
  return (
      <>
          {importAll.map((v: RoutingConfigItem) => {
        return (
            <Route path={v.path} component={v.component} key={Math.ceil(Math.random() * 1000)} />
        );
      })}
      </>
  );
}

export default getSlotPageRoutingConfig;
