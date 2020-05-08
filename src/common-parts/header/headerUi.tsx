import { AppstoreOutlined, SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import React from 'react';

// const {Search} = Input;
// 可复用的UI 部分代码
class HeaderUI {
  renderLogoFn = (styles: any) => {
    return (
        <h3 className={styles.title}>
            <AppstoreOutlined />
            组件库
        </h3>
    );
  };
  renderContentFn = (styles: any) => {
    return (
        <div className={styles.headerContent}>
            <div style={{ textAlign: 'left' }}>
                <Input
                    placeholder="input search text"
                    size="large"
                    prefix={<SearchOutlined style={{ color: '#d9d9d9' }} />}
                    style={{ outline: 'none', border: 'none', width: '50%' }}
          />
            </div>
            <div />
        </div>
    );
  };
  renderFunction = (styles: any) => {
    return (
        <Row>
            <Col span={4}>{this.renderLogoFn(styles)}</Col>
            <Col span={20}>{this.renderContentFn(styles)}</Col>
        </Row>
    );
  };
}

const headerUIObject = new HeaderUI();
export default headerUIObject;
