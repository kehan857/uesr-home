import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftOutlined, 
  CheckCircleOutlined, 
  HomeOutlined,
  RightOutlined,
  CheckOutlined,
  LineChartOutlined,
  ClockCircleOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  PhoneOutlined,
  BankOutlined,
  UserOutlined,
  FileTextOutlined
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
  Tabs,
  List,
  Avatar,
  Modal,
  Form,
  Input,
  message
} from 'antd';
import { getDetailData } from '../../services/detailData';
import './SolutionDetail.css';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const SolutionDetail: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('1');
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [contactType, setContactType] = useState<'方案' | '专家' | '案例'>('方案');
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!itemId) {
          throw new Error('缺少必要参数');
        }
        const data = await getDetailData('solutions', itemId);
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
      <div className="solution-page">
        <div className="solution-header">
          <div className="solution-header-content">
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
              返回
            </Button>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/"><HomeOutlined /> 首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>解决方案</Breadcrumb.Item>
              <Breadcrumb.Item>加载中...</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="solution-container solution-skeleton">
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
      <div className="solution-page">
        <div className="solution-header">
          <div className="solution-header-content">
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
              返回
            </Button>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/"><HomeOutlined /> 首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>解决方案</Breadcrumb.Item>
              <Breadcrumb.Item>出错了</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="solution-container">
          <div className="solution-not-found">
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

  // 获取解决方案图标映射
  const getSolutionIcon = () => {
    const iconMap: Record<string, string> = {
      'automotive': '🚗',
      'electronics': '💻',
      'equipment': '⚙️',
      'food': '🍽️'
    };
    
    return iconMap[itemId || ''] || '🏭';
  };

  // 获取解决方案对应的行业名称
  const getIndustryName = () => {
    const nameMap: Record<string, string> = {
      'automotive': '汽车制造',
      'electronics': '电子制造',
      'equipment': '装备制造',
      'food': '食品生产'
    };
    
    return nameMap[itemId || ''] || '制造业';
  };

  // 处理按钮点击
  const handleSolutionDetailClick = () => {
    setContactType('方案');
    setIsContactModalVisible(true);
  };

  const handleExpertConsultClick = () => {
    setContactType('专家');
    setIsContactModalVisible(true);
  };

  // 处理联系表单提交
  const handleContactSubmit = (values: any) => {
    console.log('收集的用户信息:', values);
    // 这里应该调用API提交用户信息
    let successMessage = '';
    
    if (contactType === '方案') {
      successMessage = '解决方案详情获取申请已提交，我们将尽快发送到您的手机！';
    } else {
      successMessage = '您的咨询申请已提交，我们的行业专家将尽快与您联系！';
    }
    
    message.success(successMessage);
    setIsContactModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="solution-page">
      {/* 页头 */}
      <div className="solution-header">
        <div className="solution-header-content">
          <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
            返回
          </Button>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/"><HomeOutlined /> 首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/">解决方案</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{detailData.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {/* 英雄区 */}
      <div className="solution-hero">
        <div className="solution-hero-bg"></div>
        <div className="solution-hero-content">
          <div className="solution-hero-icon">{getSolutionIcon()}</div>
          <Title level={1}>{detailData.title}</Title>
          <Title level={3} className="solution-subtitle">
            {detailData.subtitle}
          </Title>
          <Paragraph className="solution-description">
            {detailData.description}
          </Paragraph>
          <div className="solution-hero-badges">
            <div className="solution-badge">
              <LineChartOutlined />
              <span>提升生产效率</span>
            </div>
            <div className="solution-badge">
              <ClockCircleOutlined />
              <span>缩短交付周期</span>
            </div>
            <div className="solution-badge">
              <BulbOutlined />
              <span>智能化转型</span>
            </div>
            <div className="solution-badge">
              <ThunderboltOutlined />
              <span>数字驱动决策</span>
            </div>
          </div>
        </div>
      </div>

      {/* 行业痛点与转型机遇 */}
      <div className="solution-section solution-challenges">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={20} lg={18}>
            <div className="section-header">
              <Title level={2}>行业痛点与转型机遇</Title>
              <div className="section-header-line"></div>
            </div>
            
            <div className="industry-infographic">
              <div className="infographic-header">
                <Title level={3}>{getIndustryName()}行业现状</Title>
              </div>
              
              <Row gutter={[24, 24]}>
                <Col xs={24} md={12}>
                  <Card className="industry-trend-card" title="行业趋势" bordered={false}>
                    <div className="trend-item">
                      <div className="trend-icon">📊</div>
                      <div className="trend-content">
                        <div className="trend-title">数字化转型浪潮</div>
                        <div className="trend-desc">行业正经历全面的数字化变革，企业需要加速适应</div>
                      </div>
                    </div>
                    <div className="trend-item">
                      <div className="trend-icon">🔄</div>
                      <div className="trend-content">
                        <div className="trend-title">柔性生产需求上升</div>
                        <div className="trend-desc">产品个性化定制趋势要求更灵活的生产方式</div>
                      </div>
                    </div>
                    <div className="trend-item">
                      <div className="trend-icon">🌐</div>
                      <div className="trend-content">
                        <div className="trend-title">全球供应链重构</div>
                        <div className="trend-desc">区域化、多元化的供应链结构正在形成</div>
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card className="industry-pain-card" title="典型痛点" bordered={false}>
                    {detailData.benefits && detailData.benefits.map((benefit: string, index: number) => (
                      <div className="pain-item" key={index}>
                        <div className="pain-number">{index + 1}</div>
                        <div className="pain-content">{benefit}</div>
                      </div>
                    ))}
                  </Card>
                </Col>
              </Row>
              
              <Card className="industry-opportunity-card" bordered={false}>
                <Title level={4}>数字智能化转型机遇</Title>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <div className="opportunity-item">
                      <div className="opportunity-icon">🚀</div>
                      <div className="opportunity-title">效率提升30%+</div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <div className="opportunity-item">
                      <div className="opportunity-icon">💰</div>
                      <div className="opportunity-title">成本降低25%+</div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <div className="opportunity-item">
                      <div className="opportunity-icon">⏱️</div>
                      <div className="opportunity-title">交付周期缩短40%</div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <div className="opportunity-item">
                      <div className="opportunity-icon">✅</div>
                      <div className="opportunity-title">质量提升15%+</div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </div>
          </Col>
        </Row>
      </div>

      {/* 解决方案架构 */}
      <div className="solution-section solution-architecture">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={20} lg={18}>
            <div className="section-header">
              <Title level={2}>企业大脑{getIndustryName()}解决方案架构</Title>
              <div className="section-header-line"></div>
            </div>
            
            <div className="architecture-diagram">
              <div className="architecture-layers">
                <div className="arch-layer business-layer">
                  <div className="layer-title">业务应用层</div>
                  <div className="layer-modules">
                    <div className="layer-module">生产计划</div>
                    <div className="layer-module">质量管理</div>
                    <div className="layer-module">设备监控</div>
                    <div className="layer-module">供应链管理</div>
                    <div className="layer-module">能耗管理</div>
                  </div>
                </div>
                
                <div className="arch-layer platform-layer">
                  <div className="layer-title">企业大脑平台层</div>
                  <div className="layer-modules">
                    <div className="layer-module">数据融合与分析</div>
                    <div className="layer-module">AI预测与决策支持</div>
                    <div className="layer-module">行业专用模型库</div>
                  </div>
                </div>
                
                <div className="arch-layer data-layer">
                  <div className="layer-title">数据源层</div>
                  <div className="layer-modules">
                    <div className="layer-module">ERP/MES/PLM</div>
                    <div className="layer-module">IoT设备数据</div>
                    <div className="layer-module">质检系统</div>
                    <div className="layer-module">供应商数据</div>
                  </div>
                </div>
                
                <div className="arch-arrows">
                  <div className="arch-arrow up-arrow"></div>
                  <div className="arch-arrow down-arrow"></div>
                </div>
              </div>
              
              <div className="industry-adapters">
                <Title level={4}>{getIndustryName()}行业专属适配器</Title>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} md={8}>
                    <div className="adapter-item">
                      <div className="adapter-icon">🔌</div>
                      <div className="adapter-name">行业设备数据接口</div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <div className="adapter-item">
                      <div className="adapter-icon">📊</div>
                      <div className="adapter-name">行业分析模型</div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <div className="adapter-item">
                      <div className="adapter-icon">🔍</div>
                      <div className="adapter-name">行业质量预测</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* 核心应用模块与价值实现 */}
      <div className="solution-section solution-modules">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={20} lg={18}>
            <div className="section-header">
              <Title level={2}>核心应用模块与价值实现</Title>
              <div className="section-header-line"></div>
            </div>
            
            <div className="module-cards">
              <Tabs activeKey={activeTab} onChange={setActiveTab} type="card" className="solution-tabs">
                {detailData.sections.map((section: any, index: number) => (
                  <TabPane 
                    tab={
                      <div className="tab-label">
                        <span className="tab-icon">{index % 4 === 0 ? '📊' : index % 4 === 1 ? '⚙️' : index % 4 === 2 ? '📱' : '📈'}</span>
                        <span>{section.title}</span>
                      </div>
                    } 
                    key={String(index + 1)}
                  >
                    <div className="module-content">
                      <Row gutter={[32, 32]} align="middle">
                        <Col xs={24} md={14}>
                          <div className="module-info">
                            <Title level={3}>{section.title}</Title>
                            <div className="module-description">
                              <Paragraph>{section.content}</Paragraph>
                              
                              {section.points && section.points.length > 0 && (
                                <div className="module-features">
                                  <Title level={5}>核心功能</Title>
                                  <Row gutter={[16, 16]}>
                                    {section.points.map((point: string, idx: number) => (
                                      <Col xs={24} md={12} key={idx}>
                                        <div className="module-feature">
                                          <CheckCircleOutlined className="feature-icon" />
                                          <span>{point}</span>
                                        </div>
                                      </Col>
                                    ))}
                                  </Row>
                                </div>
                              )}
                              
                              <div className="module-benefits">
                                <Title level={5}>业务价值</Title>
                                <div className="benefit-tags">
                                  <Tag color="blue">效率提升30%</Tag>
                                  <Tag color="blue">决策更精准</Tag>
                                  <Tag color="blue">降低运营成本</Tag>
                                  <Tag color="blue">提高响应速度</Tag>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} md={10}>
                          <div className="module-image">
                            <div className="module-image-placeholder">
                              <div className="image-icon">{index % 4 === 0 ? '📊' : index % 4 === 1 ? '⚙️' : index % 4 === 2 ? '📱' : '📈'}</div>
                              <div className="image-title">{section.title}</div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                ))}
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>

      {/* 底部行动召唤 */}
      <div className="solution-section solution-cta">
        <div className="solution-cta-content">
          <Title level={2}>携手企业大脑，共创{getIndustryName()}智能未来</Title>
          <Paragraph>立即开启数字化转型，构建智能化生产和管理体系</Paragraph>
          <Space size="large">
            <Button type="primary" size="large" onClick={handleSolutionDetailClick}>
              获取解决方案详情
            </Button>
            <Button size="large" onClick={handleExpertConsultClick}>
              预约行业专家咨询
            </Button>
          </Space>
        </div>
      </div>

      {/* 联系信息收集弹窗 */}
      <Modal
        title={contactType === '方案' ? '获取解决方案详情' : '预约行业专家咨询'}
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
            <Input placeholder={`默认: ${getIndustryName()}`} defaultValue={getIndustryName()} />
          </Form.Item>
          
          {contactType === '专家' && (
            <Form.Item
              name="consultTopics"
              label="咨询主题"
              rules={[{ required: true, message: '请简要描述您需要咨询的内容' }]}
            >
              <Input.TextArea 
                placeholder="请简要描述您的业务痛点和需求"
                rows={4}
              />
            </Form.Item>
          )}
          
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

export default SolutionDetail; 