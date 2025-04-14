import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Space, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const Promotion: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const userMenu = (
    <Menu>
      <Menu.Item key="dashboard" onClick={() => navigate('/dashboard')}>

        用户中心
      </Menu.Item>
      <Menu.Item key="profile" onClick={() => navigate('/profile')}>
        账户设置
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      {/* 全局样式 */}
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
          }
          
          body {
            color: #333;
            line-height: 1.6;
            overflow-x: hidden;
          }
          
          .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }
          
          section {
            padding: 80px 0;
          }
          
          h1, h2, h3, h4 {
            font-weight: 600;
            line-height: 1.3;
          }
          
          h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
          }
          
          h2 {
            font-size: 2rem;
            margin-bottom: 40px;
            text-align: center;
          }
          
          h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
          }
          
          p {
            margin-bottom: 15px;
          }
          
          .btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: #1890ff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 16px;
          }
          
          .btn:hover {
            background-color: #0c7cd5;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          
          .text-center {
            text-align: center;
          }
        `}
      </style>

      {/* 导航栏 */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '16px 50px',
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
          天云聚合
        </div>
        <Space>
          {isLoggedIn ? (
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  src={user?.avatar}
                />
                <span>{user?.username}</span>
              </Space>
            </Dropdown>
          ) : (
            <>
              <Link to="/register">
                <Button type="primary">立即注册</Button>
              </Link>
              <Link to="/login">
                <Button>登录</Button>
              </Link>
            </>
          )}
        </Space>
      </header>

      {/* 英雄区域 */}
      <div style={{
        background: 'linear-gradient(135deg, #1c2280 0%, #050a30 100%)',
        padding: '160px 50px 80px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', marginBottom: '24px' }}>
          企业大脑 激活数据智能，驱动制造新未来
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '800px', margin: '0 auto 40px' }}>
          整合企业内外部数据与知识，利用大数据、AI等技术，提供洞察、预测、决策支持和自动化能力的智能化平台
        </p>
        <Space size="large">
          <Link to="/register">
            <Button type="primary" size="large">
              免费试用
            </Button>
          </Link>
          <Link to="/subscription">
            <Button size="large" ghost>
              查看套餐
            </Button>
          </Link>
        </Space>
      </div>

      {/* 主要内容区域 */}
      <div className="container">
        <section>
          <h2>为什么选择企业大脑？</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="feature-card" style={{ padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h3>数据智能</h3>
              <p>利用先进的AI技术，深度挖掘企业数据价值，提供精准的业务洞察和预测分析。</p>
            </div>
            <div className="feature-card" style={{ padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h3>流程优化</h3>
              <p>智能化流程再造，提升运营效率，降低成本，实现业务流程的持续优化。</p>
            </div>
            <div className="feature-card" style={{ padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h3>决策支持</h3>
              <p>基于数据和AI的智能决策支持系统，帮助企业做出更科学、更准确的商业决策。</p>
            </div>
          </div>
        </section>

        {/* 核心功能区域 */}
        <section style={{ background: '#f8f9fa' }}>
          <h2>核心功能</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h3>智能分析</h3>
              <p>多维度数据分析，深入洞察业务趋势</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h3>预测预警</h3>
              <p>智能预测潜在风险，提前预警处理</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h3>流程自动化</h3>
              <p>智能工作流，自动化业务处理</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h3>知识图谱</h3>
              <p>构建企业知识网络，助力智能决策</p>
            </div>
          </div>
        </section>

        {/* 客户价值区域 */}
        <section>
          <h2>客户价值</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div style={{ padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h3>效率提升</h3>
              <p>通过AI和自动化技术，显著提升运营效率，降低人力成本</p>
            </div>
            <div style={{ padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h3>决策优化</h3>
              <p>基于数据的智能决策支持，提高决策准确性和效率</p>
            </div>
            <div style={{ padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h3>创新驱动</h3>
              <p>激发数据价值，推动业务创新和转型升级</p>
            </div>
          </div>
        </section>

        {/* 立即开始区域 */}
        <section style={{ background: '#f8f9fa', textAlign: 'center' }}>
          <h2>立即开启智能制造之旅</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>选择适合您的套餐，开启数字化转型之路</p>
          <Space size="large">
            <Link to="/register">
              <Button type="primary" size="large">免费试用</Button>
            </Link>
            <Link to="/subscription">
              <Button size="large">查看套餐</Button>
            </Link>
          </Space>
        </section>

        <section className="text-center">
          <h2>开始使用企业大脑</h2>
          <p>立即注册，开启智能制造新征程</p>
          <Space size="large">
            <Link to="/register">
              <Button type="primary" size="large">
                免费注册
              </Button>
            </Link>
            <Link to="/subscription">
              <Button size="large">
                了解更多
              </Button>
            </Link>
          </Space>
        </section>
      </div>

      {/* 页脚 */}
      <footer style={{ background: '#f0f2f5', padding: '40px 0', marginTop: '40px' }}>
        <div className="container text-center">
          <p>© 2024 天云聚合. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Promotion;