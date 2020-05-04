import styles from '@assets/styles/App.module.css';
import Home from '@pages/home';
import getSlotPageRoutingConfig from '@utils/router';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
      <div className={styles.App}>
          <Switch>
              <Route path="/" component={Home} />
              <Route path="/home" component={Home} />
              {/*  // 子路由的写法
              <Route path="/home" 
                  render={() => (
                      <>
                          <Route path="/home/page1" component={Home} />
                          <Route path="/home/page2" />
                      </>
                )} 
                /> */}
              {getSlotPageRoutingConfig()}
              <Redirect from="/*" to="/home" />
              {/* 路由 */}
          </Switch>
      </div>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
