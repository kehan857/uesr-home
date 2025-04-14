import React from 'react';
import { Button, Space, Typography, Card, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import {
  RocketOutlined,
  ApiOutlined,
  CloudServerOutlined,
  SafetyCertificateOutlined,
  DashboardOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Landing: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
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
          <Link to="/register">
            <Button type="primary">立即注册</Button>
          </Link>
          <Link to="/register">
            <Button>登录</Button>
          </Link>
        </Space>
      </header>

      {/* 英雄区域 */}
      <div style={{
        background: 'linear-gradient(135deg, #1c2280 0%, #050a30 100%)',
        padding: '160px 50px 80px',
        color: 'white',
        textAlign: 'center'
      }}>
        <Title level={1} style={{ color: 'white', marginBottom: 24 }}>
          企业大脑：激活数据智能，驱动制造新未来
        </Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', maxWidth: '800px', margin: '0 auto 40px' }}>
          整合企业内外部数据与知识，利用大数据、AI等技术，提供洞察、预测、决策支持和自动化能力的智能化平台
        </Paragraph>
        <Space size="large">
          <Link to="/register">
            <Button type="primary" size="large" icon={<RocketOutlined />}>
              免费试用
            </Button>
          </Link>
          <Button size="large" ghost>
            查看套餐
          </Button>
        </Space>
      </div>

      {/* 核心功能 */}
      <div style={{ padding: '80px 50px', background: 'white' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 60 }}>
          核心功能
        </Title>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <ApiOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                <Title level={4}>数据融合</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  打通企业内外部数据孤岛，构建统一数据视图
                </Paragraph>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <CloudServerOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                <Title level={4}>智能分析</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  深度学习算法，挖掘数据价值，提供业务洞察
                </Paragraph>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <DashboardOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                <Title level={4}>预测预警</Title>
                <Paragraph style={{ textAlign: 'center' }}>
                  实时监控关键指标，提前预警潜在风险
                </Paragraph>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      {/* 套餐展示 */}
      <div style={{ padding: '80px 50px', background: '#f7f9fc' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 60 }}>
          选择适合您的套餐
        </Title>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card
              title={<div style={{ textAlign: 'center', fontSize: '20px' }}>基础版</div>}
              hoverable
              style={{ textAlign: 'center' }}
            >
              <Title level={3} style={{ color: '#1890ff', margin: '24px 0' }}>
                ¥999<small>/月</small>
              </Title>
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0' }}>
                <li>数据接入：3个数据源</li>
                <li>存储空间：100GB</li>
                <li>分析模型：5个</li>
                <li>用户数量：10个</li>
              </ul>
              <Link to="/register">
                <Button type="primary" block>
                  立即开通
                </Button>
              </Link>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              title={<div style={{ textAlign: 'center', fontSize: '20px' }}>企业版</div>}
              hoverable
              style={{
                textAlign: 'center',
                transform: 'scale(1.05)',
                borderColor: '#1890ff'
              }}
            >
              <Title level={3} style={{ color: '#1890ff', margin: '24px 0' }}>
                ¥2999<small>/月</small>
              </Title>
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0' }}>
                <li>数据接入：10个数据源</li>
                <li>存储空间：500GB</li>
                <li>分析模型：20个</li>
                <li>用户数量：50个</li>
              </ul>
              <Link to="/register">
                <Button type="primary" block>
                  立即开通
                </Button>
              </Link>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              title={<div style={{ textAlign: 'center', fontSize: '20px' }}>旗舰版</div>}
              hoverable
              style={{ textAlign: 'center' }}
            >
              <Title level={3} style={{ color: '#1890ff', margin: '24px 0' }}>
                ¥9999<small>/月</small>
              </Title>
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0' }}>
                <li>数据接入：不限</li>
                <li>存储空间：2TB</li>
                <li>分析模型：不限</li>
                <li>用户数量：200个</li>
              </ul>
              <Link to="/register">
                <Button type="primary" block>
                  立即开通
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>

      {/* 页脚 */}
      <footer style={{ background: '#001529', padding: '50px', color: 'rgba(255,255,255,0.65)' }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={8}>
            <Title level={4} style={{ color: 'white' }}>关于我们</Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.65)' }}>
              天云聚合致力于为制造业企业提供智能化解决方案，助力企业数字化转型升级。
            </Paragraph>
          </Col>
          <Col xs={24} sm={8}>
            <Title level={4} style={{ color: 'white' }}>联系方式</Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.65)' }}>
              电话：400-888-8888<br />
              邮箱：contact@example.com<br />
              地址：北京市朝阳区科技园区
            </Paragraph>
          </Col>
          <Col xs={24} sm={8}>
            <Title level={4} style={{ color: 'white' }}>快速链接</Title>
            <Space direction="vertical">
              <Link to="/register" style={{ color: 'rgba(255,255,255,0.65)' }}>注册账号</Link>
              <Link to="/register" style={{ color: 'rgba(255,255,255,0.65)' }}>登录</Link>
              <a href="#" style={{ color: 'rgba(255,255,255,0.65)' }}>帮助中心</a>
            </Space>
          </Col>
        </Row>
        <Divider style={{ background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)' }}>
          © 2024 天云聚合. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;