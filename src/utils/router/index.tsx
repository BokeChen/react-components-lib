import React from 'react';
import { Route } from 'react-router-dom';

export interface RoutingConfigItem {
  path: string;
  component: React.FunctionComponent<any>;
}
export interface ModuleConfigItem {
  title?: string;
  path?: string;
  Key?: string;
  component: React.FunctionComponent<any>;
  designWidth: number;
  designHeight: number;
  isAjust: boolean;
  moduleDes: ModuleDesType[];
  cateGory: string;
  subCateGory: string;
}
interface ModuleDesType {
  id: number;
  name: string;
  filename: string;
  path: string;
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
