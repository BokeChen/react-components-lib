import store from '@utils/store';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ConfigProvider>
    </Provider>,
  document.querySelector('#root'),
);
serviceWorker.unregister();
