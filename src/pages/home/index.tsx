import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import CommonHeader from '@common-parts/header';
import { Col, Layout, Menu, Row } from 'antd';
import React, { useReducer } from 'react';
import styles from './assets/styles/home.module.css';

const { Content, Footer } = Layout;
const { SubMenu } = Menu;
const initialCount = { count: 0 };
function reducer(state: { count: number }, action: { type: string; payload?: number }) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };

    default:
      throw new Error('reduce 报错');
  }
}
export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialCount);
  return (
      <>
          <CommonHeader />
          <Layout style={{ height: 'calc(100vh - 64px)' }}>
              <Row style={{ height: '100%' }}>
                  <Col span={4}>
                      <div className="logo" />
                      <Menu
                          mode="inline"
                          defaultSelectedKeys={['1']}
                          defaultOpenKeys={['sub1']}
                          style={{ height: '100%', borderRight: 0 }}
            >
                          <SubMenu
                              key="sub1"
                              title={
                                  <span>
                                      <UserOutlined />
                                      subnav 1
                                  </span>
                }
              >
                              <Menu.Item key="1">option1</Menu.Item>
                              <Menu.Item key="2">option2</Menu.Item>
                              <Menu.Item key="3">option3</Menu.Item>
                              <Menu.Item key="4">option4</Menu.Item>
                          </SubMenu>
                          <SubMenu
                              key="sub2"
                              title={
                                  <span>
                                      <LaptopOutlined />
                                      subnav 2
                                  </span>
                }
              >
                              <Menu.Item key="5">option5</Menu.Item>
                              <Menu.Item key="6">option6</Menu.Item>
                              <Menu.Item key="7">option7</Menu.Item>
                              <Menu.Item key="8">option8</Menu.Item>
                          </SubMenu>
                          <SubMenu
                              key="sub3"
                              title={
                                  <span>
                                      <NotificationOutlined />
                                      subnav 3
                                  </span>
                }
              >
                              <Menu.Item key="9">option9</Menu.Item>
                              <Menu.Item key="10">option10</Menu.Item>
                              <Menu.Item key="11">option11</Menu.Item>
                              <Menu.Item key="12">option12</Menu.Item>
                          </SubMenu>
                      </Menu>
                  </Col>
                  <Col span={20}>
                      <Layout className="site-layout" style={{ marginLeft: 200 }}>
                          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                              <div
                                  className="site-layout-background"
                                  style={{ padding: 24, textAlign: 'center' }}
                >
                                  ...
                                  <br />
                                  Really
                                  <br />
                                  ...
                                  <br />
                                  ... content
                                  <br />
                                  <button
                                      type="button"
                                      className={styles.wrap}
                                      onClick={() => dispatch({ type: 'increment' })}
                  >
                                      home {state.count}
                                  </button>
                              </div>
                          </Content>
                          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                      </Layout>
                  </Col>
              </Row>
          </Layout>
      </>
  );
}
