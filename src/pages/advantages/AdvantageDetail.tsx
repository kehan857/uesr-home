import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftOutlined, 
  CheckCircleOutlined, 
  HomeOutlined,
  RightOutlined,
  CheckOutlined,
  PhoneOutlined,
  BankOutlined,
  UserOutlined
} from '@ant-design/icons';
import { 
  Button, 
  Spin, 
  Typography, 
  Breadcrumb, 
  Row, 
  Col, 
  Card, 
  Divider, 
  Alert,
  Tag,
  Space,
  List,
  Avatar,
  Modal,
  Form,
  Input,
  message
} from 'antd';
import { getDetailData } from '../../services/detailData';
import './AdvantageDetail.css';

const { Title, Paragraph, Text } = Typography;

const AdvantageDetail: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [contactType, setContactType] = useState<'演示' | '方案'>('演示');
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!itemId) {
          throw new Error('缺少必要参数');
        }
        const data = await getDetailData('advantages', itemId);
        setDetailData(data);
        setError(null);
        // 滚动到页面顶部
        window.scrollTo(0, 0);
      } catch (err) {
        setError('数据加载失败，请稍后再试');
        console.error('获取详情数据出错:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  // 返回上一页
  const handleBack = () => {
    navigate(-1);
  };

  // 处理免费试用按钮点击
  const handleTrialClick = () => {
    navigate('/login');
  };

  // 处理预约演示按钮点击
  const handleDemoClick = () => {
    setContactType('演示');
    setIsContactModalVisible(true);
  };

  // 处理获取定制方案按钮点击
  const handleSolutionClick = () => {
    setContactType('方案');
    setIsContactModalVisible(true);
  };

  // 处理联系表单提交
  const handleContactSubmit = (values: any) => {
    console.log('收集的用户信息:', values);
    // 这里应该调用API提交用户信息
    message.success(`您的${contactType}申请已提交，我们的顾问将尽快与您联系！`);
    setIsContactModalVisible(false);
    form.resetFields();
  };

  // 如果正在加载
  if (loading) {
    return (
      <div className="advantage-page">
        <div className="advantage-header">
          <div className="advantage-header-content">
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
              返回
            </Button>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/"><HomeOutlined /> 首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>产品优势</Breadcrumb.Item>
              <Breadcrumb.Item>加载中...</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="advantage-container advantage-skeleton">
          <Spin size="large" tip="加载内容中...">
            <div style={{ height: '70vh' }}></div>
          </Spin>
        </div>
      </div>
    );
  }

  // 如果加载出错
  if (error || !detailData) {
    return (
      <div className="advantage-page">
        <div className="advantage-header">
          <div className="advantage-header-content">
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
              返回
            </Button>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/"><HomeOutlined /> 首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>产品优势</Breadcrumb.Item>
              <Breadcrumb.Item>出错了</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="advantage-container">
          <div className="advantage-not-found">
            <Alert
              message="内容未找到"
              description="抱歉，您请求的内容不存在或暂时无法访问。"
              type="error"
              showIcon
            />
            <Button type="primary" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
              返回首页
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 获取优势图标映射
  const getAdvantageIcon = () => {
    const iconMap: Record<string, string> = {
      'data-fusion': '🔄',
      'intelligent-analysis': '📊',
      'prediction-warning': '⚠️',
      'auto-decision': '🤖'
    };
    
    return iconMap[itemId || ''] || '📑';
  };

  return (
    <div className="advantage-page">
      {/* 页头 */}
      <div className="advantage-header">
        <div className="advantage-header-content">
          <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
            返回
          </Button>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/"><HomeOutlined /> 首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/">产品优势</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{detailData.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {/* 英雄区 */}
      <div className="advantage-hero">
        <div className="advantage-hero-overlay">
          <div className="advantage-hero-content">
            <div className="advantage-hero-icon">{getAdvantageIcon()}</div>
            <Title level={1}>{detailData.title}</Title>
            <Title level={3} className="advantage-subtitle">
              {detailData.subtitle}
            </Title>
            
            <div className="advantage-tags">
              {detailData.benefits && detailData.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                <Tag color="blue" key={idx}>{benefit}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 为什么重要 */}
      <div className="advantage-section advantage-why-matters">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={20} lg={18}>
            <div className="section-header">
              <Title level={2}>为什么{detailData.title}至关重要？</Title>
              <div className="section-header-line"></div>
            </div>
            <Row gutter={[24, 24]}>
              {detailData.benefits && detailData.benefits.map((benefit: string, idx: number) => (
                <Col xs={24} sm={12} md={12} lg={6} key={idx}>
                  <Card className="why-matters-card" bordered={false}>
                    <div className="why-matters-icon">
                      <CheckCircleOutlined />
                    </div>
                    <div className="why-matters-content">
                      <Text strong>{benefit}</Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            <Paragraph className="why-matters-description">
              {detailData.description}
            </Paragraph>
          </Col>
        </Row>
      </div>

      {/* 解决方案与核心功能 */}
      <div className="advantage-section advantage-solutions">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={20} lg={18}>
            <div className="section-header">
              <Title level={2}>我们的解决方案与核心功能</Title>
              <div className="section-header-line"></div>
            </div>
            <div className="advantage-features">
              {detailData.sections.map((section: any, index: number) => (
                <div className="advantage-feature-block" key={index}>
                  <Card 
                    className={`feature-card ${index % 2 === 1 ? 'reverse' : ''}`} 
                    bordered={false}
                  >
                    <Row gutter={[32, 32]} align="middle" className="feature-row">
                      <Col xs={24} md={section.image ? 12 : 24} className="feature-content">
                        <Title level={3}>{section.title}</Title>
                        <Paragraph>{section.content}</Paragraph>
                        {section.points && section.points.length > 0 && (
                          <div className="feature-points">
                            {section.points.map((point: string, idx: number) => (
                              <div className="feature-point" key={idx}>
                                <CheckOutlined className="point-icon" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </Col>
                      {section.image && (
                        <Col xs={24} md={12} className="feature-image-col">
                          <div className="feature-image">
                            <div className="feature-image-placeholder">
                              <div className="image-icon">
                                {index % 4 === 0 && '📊'}
                                {index % 4 === 1 && '⚙️'}
                                {index % 4 === 2 && '📱'}
                                {index % 4 === 3 && '📈'}
                              </div>
                              <div className="image-title">{section.title}</div>
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </Card>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>

      {/* 底部行动召唤 */}
      <div className="advantage-section advantage-cta">
        <div className="advantage-cta-content">
          <Title level={2}>体验{detailData.title}的强大能力</Title>
          <Paragraph>立即探索企业大脑如何帮助您的业务创新增长</Paragraph>
          <Space size="large">
            <Button type="primary" size="large" onClick={handleTrialClick}>
              免费试用
            </Button>
            <Button size="large" onClick={handleDemoClick}>
              预约演示
            </Button>
            <Button size="large" onClick={handleSolutionClick}>
              获取定制方案
            </Button>
          </Space>
        </div>
      </div>

      {/* 联系信息收集弹窗 */}
      <Modal
        title={`申请${contactType}`}
        open={isContactModalVisible}
        onCancel={() => setIsContactModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleContactSubmit}
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入您的姓名' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入您的姓名" />
          </Form.Item>
          
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[
              { required: true, message: '请输入您的联系电话' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码格式' }
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="请输入您的联系电话" />
          </Form.Item>
          
          <Form.Item
            name="company"
            label="企业名称"
            rules={[{ required: true, message: '请输入您的企业名称' }]}
          >
            <Input prefix={<BankOutlined />} placeholder="请输入您的企业名称" />
          </Form.Item>
          
          <Form.Item
            name="needs"
            label={`${contactType}需求`}
          >
            <Input.TextArea 
              placeholder={contactType === '演示' ? "请简述您希望了解的产品功能" : "请简述您的业务场景与需求"} 
              rows={4}
            />
          </Form.Item>
          
          <Form.Item>
            <div style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={() => setIsContactModalVisible(false)}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Space>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdvantageDetail; 