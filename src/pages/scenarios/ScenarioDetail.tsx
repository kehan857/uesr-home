import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftOutlined, 
  CheckCircleOutlined, 
  HomeOutlined,
  RightOutlined,
  CheckOutlined,
  BarChartOutlined,
  FieldTimeOutlined,
  DollarOutlined,
  SettingOutlined,
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
  Timeline,
  Statistic,
  Modal,
  Form,
  Input,
  message
} from 'antd';
import { getDetailData } from '../../services/detailData';
import './ScenarioDetail.css';

const { Title, Paragraph, Text } = Typography;

const ScenarioDetail: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [contactType, setContactType] = useState<'演示' | '方案' | '顾问'>('演示');
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!itemId) {
          throw new Error('缺少必要参数');
        }
        const data = await getDetailData('scenarios', itemId);
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

  // 如果正在加载
  if (loading) {
    return (
      <div className="scenario-page">
        <div className="scenario-header">
          <div className="scenario-header-content">
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
              返回
            </Button>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/"><HomeOutlined /> 首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>应用场景</Breadcrumb.Item>
              <Breadcrumb.Item>加载中...</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="scenario-container scenario-skeleton">
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
      <div className="scenario-page">
        <div className="scenario-header">
          <div className="scenario-header-content">
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
              返回
            </Button>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/"><HomeOutlined /> 首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>应用场景</Breadcrumb.Item>
              <Breadcrumb.Item>出错了</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="scenario-container">
          <div className="scenario-not-found">
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

  // 获取场景图标映射
  const getScenarioIcon = () => {
    const iconMap: Record<string, string> = {
      'intelligent-manufacturing': '🏭',
      'smart-supply-chain': '🔗',
      'quality-control': '✅'
    };
    
    return iconMap[itemId || ''] || '🔍';
  };

  // 获取统计图标
  const getStatIcon = (index: number) => {
    const icons = [
      <BarChartOutlined />,
      <FieldTimeOutlined />,
      <DollarOutlined />,
      <SettingOutlined />
    ];
    return icons[index % icons.length];
  };

  // 获取模拟流程步骤
  const getProcessSteps = () => {
    if (itemId === 'intelligent-manufacturing') {
      return [
        '生产数据采集',
        '实时监控分析',
        '异常识别预警',
        '工艺参数优化',
        '自动化生产调度'
      ];
    } else if (itemId === 'smart-supply-chain') {
      return [
        '多源数据融合',
        '需求智能预测',
        '库存自动优化',
        '智能调度分配',
        '供应链风险预警'
      ];
    } else if (itemId === 'quality-control') {
      return [
        '质量数据采集',
        '参数关联分析',
        '缺陷模式识别',
        '质量风险预测',
        '根源自动追溯'
      ];
    } else {
      return [
        '数据采集整合',
        '智能分析处理',
        '业务问题识别',
        '优化方案生成',
        '自动化执行与反馈'
      ];
    }
  };

  // 处理按钮点击
  const handleDemoClick = () => {
    setContactType('演示');
    setIsContactModalVisible(true);
  };

  const handleSolutionClick = () => {
    setContactType('方案');
    setIsContactModalVisible(true);
  };

  const handleConsultantClick = () => {
    setContactType('顾问');
    setIsContactModalVisible(true);
  };

  // 处理联系表单提交
  const handleContactSubmit = (values: any) => {
    console.log('收集的用户信息:', values);
    // 这里应该调用API提交用户信息
    let successMessage = '';
    
    switch (contactType) {
      case '演示':
        successMessage = '您的演示申请已提交，我们将尽快安排行业场景演示！';
        break;
      case '方案':
        successMessage = '您的申请已提交，解决方案手册获取链接已发送到您的手机！';
        break;
      case '顾问':
        successMessage = '您的咨询申请已提交，行业顾问将尽快与您联系！';
        break;
    }
    
    message.success(successMessage);
    setIsContactModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="scenario-page">
      {/* 页头 */}
      <div className="scenario-header">
        <div className="scenario-header-content">
          <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
            返回
          </Button>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/"><HomeOutlined /> 首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/">应用场景</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{detailData.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {/* 英雄区 */}
      <div className="scenario-hero">
        <div className="scenario-hero-content">
          <div className="scenario-hero-icon">{getScenarioIcon()}</div>
          <Title level={1}>{detailData.title}</Title>
          <div className="scenario-subtitle">
            <Title level={3}>{detailData.subtitle}</Title>
          </div>
          <div className="scenario-pain-points">
            <Card className="pain-points-card">
              <Paragraph className="pain-points-text">
                {detailData.description}
              </Paragraph>
            </Card>
          </div>
        </div>
      </div>

      {/* 场景挑战深度剖析 */}
      <div className="scenario-section scenario-challenges">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={20} lg={18}>
            <div className="section-header">
              <Title level={2}>场景挑战深度剖析</Title>
              <div className="section-header-line"></div>
            </div>
            
            <div className="challenges-content">
              <div className="challenges-image">
                <div className="image-placeholder">
                  <div className="image-icon">{getScenarioIcon()}</div>
                  <div className="image-title">{detailData.title}流程图</div>
                </div>
              </div>
              
              <div className="challenges-timeline">
                <Timeline mode="left">
                  {detailData.benefits && detailData.benefits.map((benefit: string, index: number) => (
                    <Timeline.Item 
                      key={index}
                      color="#1677ff"
                      label={<div className="timeline-label">挑战 {index + 1}</div>}
                    >
                      <div className="timeline-content">
                        <Paragraph className="timeline-description">
                          {benefit.includes('提升') ? 
                            `${benefit.split('提升')[0]}提升不足，影响业务发展` : 
                            benefit}
                        </Paragraph>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* 企业大脑赋能 */}
      <div className="scenario-section scenario-solution">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={20} lg={18}>
            <div className="section-header">
              <Title level={2}>企业大脑如何赋能{detailData.title.replace(/场景$/, '')}</Title>
              <div className="section-header-line"></div>
            </div>
            
            <div className="solution-flow">
              <div className="flow-diagram">
                <div className="flow-header">
                  <div className="flow-title">{detailData.title}解决方案流程</div>
                </div>
                <div className="flow-steps">
                  {getProcessSteps().map((step, index) => (
                    <div key={index} className="flow-step">
                      <div className="step-number">{index + 1}</div>
                      <div className="step-content">{step}</div>
                      {index < getProcessSteps().length - 1 && (
                        <div className="step-arrow">
                          <RightOutlined />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="solution-features">
                <Row gutter={[24, 24]}>
                  {detailData.sections.map((section: any, index: number) => (
                    <Col xs={24} md={12} key={index}>
                      <Card className="feature-card" bordered={false}>
                        <div className="feature-icon">{index % 4 === 0 ? '📊' : index % 4 === 1 ? '⚙️' : index % 4 === 2 ? '📱' : '📈'}</div>
                        <Title level={4}>{section.title}</Title>
                        <Paragraph>{section.content}</Paragraph>
                        {section.points && section.points.length > 0 && (
                          <div className="feature-points">
                            {section.points.slice(0, 3).map((point: string, idx: number) => (
                              <div className="feature-point" key={idx}>
                                <CheckOutlined className="point-icon" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* 底部行动召唤 */}
      <div className="scenario-section scenario-cta">
        <div className="scenario-cta-content">
          <Title level={2}>开始您的{detailData.title.replace(/场景$/, '')}智能化转型</Title>
          <Paragraph>立即探索企业大脑如何为您的业务赋能，提升竞争优势</Paragraph>
          <Space size="large">
            <Button type="primary" size="large" onClick={handleDemoClick}>
              预约行业场景演示
            </Button>
            <Button size="large" onClick={handleSolutionClick}>
              获取解决方案手册
            </Button>
            <Button size="large" onClick={handleConsultantClick}>
              联系行业顾问
            </Button>
          </Space>
        </div>
      </div>

      {/* 联系信息收集弹窗 */}
      <Modal
        title={contactType === '演示' ? '预约行业场景演示' : 
              contactType === '方案' ? '获取解决方案手册' : '联系行业顾问'}
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
            name="industry"
            label="所属行业"
            rules={[{ required: true, message: '请输入您的所属行业' }]}
          >
            <Input placeholder="如：制造业、金融业、零售业等" />
          </Form.Item>
          
          <Form.Item
            name="needs"
            label="业务需求"
          >
            <Input.TextArea 
              placeholder={`请简述您在${detailData?.title || '该场景'}中的具体需求`}
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

export default ScenarioDetail; 