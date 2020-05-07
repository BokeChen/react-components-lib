import { AppstoreOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
// 可复用的UI 部分代码
class HeaderUI {
  renderLogoFn = (styles: any) => {
    return (
        <h3 className={styles.title}>
            <AppstoreOutlined />
            title
        </h3>
    );
  };
  renderContentFn = () => {
    return '右侧内容';
  };
  renderFunction = (styles: any) => {
    return (
        <Row>
            <Col span={6}>{this.renderLogoFn(styles)}</Col>
            <Col span={18}>{this.renderContentFn()}</Col>
        </Row>
    );
  };
}

const headerUIObject = new HeaderUI();
export default headerUIObject;
