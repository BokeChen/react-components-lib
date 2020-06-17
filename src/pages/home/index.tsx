import { MinusCircleOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ModuleConfigItem } from '@utils/router';
import { Card, Layout, Menu, Modal, Pagination, Popover } from 'antd';
import * as _ from 'lodash';
import React, { useMemo, useState } from 'react';
import styles from './index.module.scss';

const { Sider, Content } = Layout;
enum ZooMType {
  in,
  out,
}
const routers = require.context('@slot-pages', true, /module-config\.ts/);
export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState<number>(520);
  const [selectedModule, setSeletedModule] = useState<ModuleConfigItem | null>(null);
  const [menuFilter, setMenuFilter] = useState<string | undefined>('');
  const [subMenuFilter, setSubMenuFilter] = useState<string | undefined>('');
  const [curPage, setCurPage] = useState<number>(1);
  const pageSize = 9;
  const subappInfo = useMemo(() => {
    const importAll: ModuleConfigItem[] = [];
    routers.keys().forEach((key: string) => {
      importAll.push(routers(key).default);
    });
    return importAll;
  }, []);
  const menuArr = useMemo(() => {
    return _.orderBy(_.groupBy(subappInfo, 'cateGory'), 'key', 'asc') || '';
  }, [subappInfo]);

  const height = selectedModule
    ? (modalWidth / selectedModule.designWidth) * selectedModule.designHeight
    : 0;
  const zoomFn = (zoom: ZooMType) => {
    if (zoom === ZooMType.in && modalWidth * 1.1 < window.innerWidth * 0.8) {
      setModalWidth(modalWidth * 1.1);
    } else if (zoom === ZooMType.out && modalWidth * 0.9 >= 520) {
      setModalWidth(modalWidth * 0.9);
    }
  };
  const content = (
      <dl className={styles.moduleDesWin}>
          {selectedModule &&
        selectedModule.moduleDes.map((v) => {
          return (
              <React.Fragment key={`moduleDes${v.id}`}>
                  <dt>
                      模块名称：{v.name}({v.filename})
                  </dt>
                  <dd>模块文件路径：{v.path}</dd>
              </React.Fragment>
          );
        })}
      </dl>
  );

  const filterData = menuFilter
    ? _.filter(subappInfo, function (o) {
        return o.cateGory.includes(menuFilter);
      })
    : subappInfo;
  const subFilterData = subMenuFilter
    ? _.filter(filterData, function (o) {
        return o.subCateGory.includes(subMenuFilter);
      })
    : filterData;
  const scale = selectedModule ? modalWidth / selectedModule.designWidth : 1;
  return (
      <div className={styles.home}>
          <div className={styles.header}>
              <div className={styles.homeSystemTitle}>常用UI组件库</div>
          </div>
          <Layout className={styles.container}>
              <Sider width={376} className={styles.sider}>
                  <Menu className={styles.menu} mode="inline" defaultSelectedKeys={['1']}>
                      <Menu.Item
                          key="1"
                          onClick={() => {
                setCurPage(1);
                setMenuFilter('');
                setSubMenuFilter('');
              }}
            >
                          组件总览
                      </Menu.Item>
                      {menuArr &&
              menuArr.map((v) => {
                return (
                    <Menu.ItemGroup
                        key={v[0].cateGory}
                        title={v[0].cateGory}
                        className={styles.menuModule}
                  >
                        {_.uniqBy(v, 'subCateGory').map((value) => {
                      return (
                          <Menu.Item
                              key={`${value.cateGory}${value.subCateGory}itemGroup`}
                              onClick={() => {
                            setCurPage(1);
                            setMenuFilter(value.cateGory);
                            setSubMenuFilter(value.subCateGory);
                          }}
                        >
                              {value.subCateGory || value.cateGory}
                          </Menu.Item>
                      );
                    })}
                    </Menu.ItemGroup>
                );
              })}
                  </Menu>
              </Sider>
              <Content className={styles.content}>
                  <div className={styles.cardsContent}>
                      {subFilterData &&
              subFilterData
                .slice((curPage - 1 < 0 ? 0 : curPage - 1) * pageSize, curPage * pageSize)
                .map((v) => {
                  return (
                      <Card
                          hoverable
                          className={styles.cards}
                          onClick={() => {
                        setShowModal(true);
                        setSeletedModule(v);
                      }}
                          key={`${Math.random() * 1000}card`}
                    >
                          <div key={`${Math.random()}component`} className={styles.cardContent}>
                              <div style={{ height: `${(376 / v.designWidth) * v.designHeight}px` }}>
                                  <v.component width={376} />
                              </div>
                          </div>
                      </Card>
                  );
                })}
                  </div>
                  <div className={styles.pagination}>
                      <Pagination
                          defaultCurrent={1}
                          current={curPage}
                          defaultPageSize={pageSize}
                          total={subFilterData.length || 0}
                          onChange={(page) => {
                setCurPage(page);
              }}
            />
                  </div>
                  <Modal
                      visible={showModal}
                      centered
                      footer={null}
                      onCancel={() => {
              setShowModal(false);
              setModalWidth(520);
            }}
                      width="auto"
          >
                      <div className={styles.tools}>
                          <MinusCircleOutlined
                              style={{ color: '#1890ff', marginRight: '5px' }}
                              onClick={() => {
                  zoomFn(ZooMType.out);
                }}
              />
                          {Math.floor((modalWidth / 520) * 100)}%
                          <PlusCircleOutlined
                              style={{ color: '#1890ff', marginLeft: '5px' }}
                              onClick={() => {
                  zoomFn(ZooMType.in);
                }}
              />
                          <Popover placement="rightTop" title="模块说明" content={content} trigger="click">
                              <QuestionCircleOutlined style={{ color: '#1890ff', marginLeft: '20px' }} />
                          </Popover>
                      </div>
                      {selectedModule && selectedModule.isAjust && (
                      <div
                          className={styles.modalContent}
                          style={{ width: `${modalWidth}px`, height: `${height}px` }}
              >
                          <selectedModule.component width={modalWidth} />
                      </div>
            )}
                      {selectedModule && !selectedModule.isAjust && (
                      <div
                          className={styles.modalContent}
                          style={{
                  width: `${selectedModule.designWidth * scale}px`,
                  height: `${selectedModule.designHeight * scale}px`,
                }}
              >
                          <selectedModule.component />
                      </div>
            )}
                  </Modal>
              </Content>
          </Layout>
      </div>
  );
}
