import styles from '@assets/styles/App.module.css';
import Home from '@pages/home/home';
import getSlotPageRoutingConfig from '@utils/router';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
      <div className={styles.App}>
          <Switch>
              <Router>
                  <Route path="/home" component={Home} />
                  {getSlotPageRoutingConfig()}
                  <Redirect from="/*" to="/home" />
              </Router>
              {/* 路由 */}
          </Switch>
      </div>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
