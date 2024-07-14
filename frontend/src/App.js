import './App.css';
import React, { useState } from 'react';
import { Layout, Menu, Select, Typography,  } from 'antd';
import Transactions from './components/Transactions';
import Stats from './components/Stats';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import {  BarChartOutlined, TransactionOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const navItems = [
  {
    key: 1,
    icon: <TransactionOutlined />,
    label: (<NavLink to="/">Transactions</NavLink>)
  },
  {
    key: 2,
    icon: <BarChartOutlined />,
    label: (<NavLink to="/stats">Stats</NavLink>)
  }
];

const options = [
  "All Months", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const App = () => {
  const [month, setMonth] = useState(3);
  const [collapsed, setCollapsed] = useState(false);

  const handleMonthChange = (value) => {
    setMonth(parseInt(value));
  };

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{
            background: '#1a237e',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
          width={250}
        >
          <div style={{
            padding: '24px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
            
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={navItems}
            style={{
              background: 'transparent',
              borderRight: 0
            }}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
          <Header style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%'
          }}>
            <Title level={3} style={{ margin: 0, color: '#1a237e' }}>Dashboard</Title>
            <Select
              size="large"
              defaultValue={options[month]}
              onChange={handleMonthChange}
              style={{
                width: 200,
              }}
              options={options.map((text, i) => ({ value: i, label: text }))}
            />
          </Header>
          <Content style={{ margin: '24px', overflow: 'initial' }}>
            <div style={{
              padding: 24,
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <Routes>
                <Route path="/" element={
                  <Transactions month={month} monthText={options[month]} />
                } />
                <Route path="/stats" element={
                  <Stats month={month} monthText={options[month]} />
                } />
              </Routes>
            </div>
          </Content>
          <Footer style={{
            textAlign: 'center',
            background: '#f5f5f5',
            color: '#1a237e'
          }}>
            Developer <strong>Madhur Choudhari</strong>
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;