import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftOutlined, 
  CheckCircleOutlined, 
  HomeOutlined,
  RightOutlined,
  CheckOutlined,
  CodeOutlined,
  DatabaseOutlined,
  ApiOutlined,
  CloudOutlined,
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
  Collapse,
  List,
  Modal,
  Form,
  Input,
  message
} from 'antd';
import { getDetailData } from '../../services/detailData';
import './FeatureDetail.css';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const FeatureDetail: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('architecture');
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [contactType, setContactType] = useState<'技术白皮书' | 'API文档' | '技术专家'>('技术白皮书');
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!itemId) {
          throw new Error('缺少必要参数');
        }
        const data = await getDetailData('features', itemId);
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

  // 处理按钮点击
  const handleContactExpert = () => {
    setContactType('技术专家');
    setIsContactModalVisible(true);
  };

  // 处理联系表单提交
  const handleContactSubmit = (values: any) => {
    console.log('收集的用户信息:', values);
    // 这里应该调用API提交用户信息
    message.success('您的咨询申请已提交，我们的技术专家将尽快与您联系！');
    setIsContactModalVisible(false);
    form.resetFields();
  };

  // 如果正在加载
  if (loading) {
    return (
      <div className="feature-page">
        <div className="feature-header">
          <div className="feature-header-content">
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
              返回
            </Button>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/"><HomeOutlined /> 首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>核心能力</Breadcrumb.Item>
              <Breadcrumb.Item>加载中...</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="feature-container feature-skeleton">
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
      <div className="feature-page">
        <div className="feature-header">
          <div className="feature-header-content">
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
              返回
            </Button>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/"><HomeOutlined /> 首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>核心能力</Breadcrumb.Item>
              <Breadcrumb.Item>出错了</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="feature-container">
          <div className="feature-not-found">
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

  // 获取功能图标映射
  const getFeatureIcon = () => {
    const iconMap: Record<string, string> = {
      'data-integration': '📡',
      'knowledge-graph': '🌐',
      'ai-prediction': '🧠'
    };
    
    return iconMap[itemId || ''] || '💡';
  };

  // 获取模拟技术图标
  const getTechIcon = (index: number) => {
    const icons = [
      <DatabaseOutlined />,
      <ApiOutlined />,
      <CloudOutlined />,
      <CodeOutlined />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="feature-page">
      {/* 页头 */}
      <div className="feature-header">
        <div className="feature-header-content">
          <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
            返回
          </Button>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/"><HomeOutlined /> 首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/">核心能力</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{detailData.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {/* 英雄区 */}
      <div className="feature-hero">
        <div className="feature-hero-particles"></div>
        <div className="feature-hero-overlay">
          <div className="feature-hero-content">
            <div className="feature-hero-icon">{getFeatureIcon()}</div>
            <Title level={1}>{detailData.title}</Title>
            <Title level={3} className="feature-subtitle">
              {detailData.subtitle}
            </Title>
            <div className="feature-tags">
              {detailData.benefits && detailData.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                <Tag color="blue" key={idx}>{benefit}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 能力详解 */}
      <div className="feature-section feature-deep-dive">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={22} lg={20}>
            <div className="section-header">
              <Title level={2}>能力详解与技术亮点</Title>
              <div className="section-header-line"></div>
            </div>
            
            <div className="feature-architecture">
              <Row gutter={[48, 48]} align="middle">
                <Col xs={24} lg={10}>
                  <div className="feature-tech-list">
                    <Title level={4}>核心技术特性</Title>
                    <List
                      itemLayout="horizontal"
                      dataSource={detailData.benefits || []}
                      renderItem={(item: string, index: number) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <div className="tech-icon">
                                {getTechIcon(index)}
                              </div>
                            }
                            title={<Text strong>{item}</Text>}
                            description={
                              <Text type="secondary">
                                {`利用先进的${item.split('与')[0] || item.split('与')[0] || item}技术，实现企业数据的${index % 2 === 0 ? '高效处理' : '智能分析'}`}
                              </Text>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                </Col>
                <Col xs={24} lg={14}>
                  <div className="feature-arch-diagram">
                    <div className="arch-diagram-container">
                      <div className="arch-title">
                        {detailData.title}架构
                      </div>
                      <div className="arch-layers">
                        <div className="arch-layer">
                          <div className="layer-title">应用层</div>
                          <div className="layer-modules">
                            <div className="layer-module">业务应用</div>
                            <div className="layer-module">决策支持</div>
                            <div className="layer-module">智能分析</div>
                          </div>
                        </div>
                        <div className="arch-layer">
                          <div className="layer-title">能力层</div>
                          <div className="layer-modules">
                            <div className="layer-module primary">{detailData.title}</div>
                          </div>
                        </div>
                        <div className="arch-layer">
                          <div className="layer-title">数据层</div>
                          <div className="layer-modules">
                            <div className="layer-module">数据仓库</div>
                            <div className="layer-module">知识库</div>
                            <div className="layer-module">模型库</div>
                          </div>
                        </div>
                        <div className="arch-layer">
                          <div className="layer-title">源数据层</div>
                          <div className="layer-modules">
                            <div className="layer-module">业务系统</div>
                            <div className="layer-module">物联网设备</div>
                            <div className="layer-module">外部数据</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      {/* 功能矩阵 */}
      <div className="feature-section feature-modules">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={22} lg={20}>
            <div className="section-header">
              <Title level={2}>功能矩阵与模块组成</Title>
              <div className="section-header-line"></div>
            </div>
            
            <div className="feature-modules-content">
              <Collapse defaultActiveKey={['0']} className="feature-collapse">
                {detailData.sections.map((section: any, index: number) => (
                  <Panel 
                    header={
                      <div className="collapse-header">
                        <div className="collapse-icon">{getFeatureIcon()}</div>
                        <div className="collapse-title">{section.title}</div>
                      </div>
                    } 
                    key={index}
                  >
                    <div className="collapse-content">
                      <Paragraph>{section.content}</Paragraph>
                      
                      {section.points && section.points.length > 0 && (
                        <div className="module-features">
                          <Title level={5}>核心功能点</Title>
                          <Row gutter={[16, 16]}>
                            {section.points.map((point: string, idx: number) => (
                              <Col xs={24} sm={12} md={8} key={idx}>
                                <div className="module-feature">
                                  <CheckCircleOutlined className="feature-check" />
                                  <span>{point}</span>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      )}
                      
                      {section.image && (
                        <div className="module-image">
                          <div className="module-image-placeholder">
                            <div className="image-icon">{getTechIcon(index)}</div>
                            <div className="image-title">{section.title}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Panel>
                ))}
              </Collapse>
            </div>
          </Col>
        </Row>
      </div>

      {/* 应用价值与赋能场景 */}
      <div className="feature-section feature-value">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={22} lg={20}>
            <div className="section-header">
              <Title level={2}>应用价值与赋能场景</Title>
              <div className="section-header-line"></div>
            </div>
            
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card className="value-card" title="业务价值" bordered={false}>
                  <List
                    itemLayout="horizontal"
                    dataSource={detailData.benefits || []}
                    renderItem={(item: string, index: number) => (
                      <List.Item>
                        <div className="value-item">
                          <div className="value-icon">
                            <div className="value-icon-inner">{String(index + 1)}</div>
                          </div>
                          <div className="value-content">
                            <Text strong>{item}</Text>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card className="value-card" title="赋能场景" bordered={false}>
                  <div className="enabled-scenarios">
                    <div className="scenario-item">
                      <RightOutlined className="scenario-icon" />
                      <span>智能制造场景：优化生产工艺，提升设备利用率</span>
                    </div>
                    <div className="scenario-item">
                      <RightOutlined className="scenario-icon" />
                      <span>供应链管理：提高库存管理效率，降低物流成本</span>
                    </div>
                    <div className="scenario-item">
                      <RightOutlined className="scenario-icon" />
                      <span>质量管控：预测潜在质量风险，追溯问题根源</span>
                    </div>
                    <div className="scenario-item">
                      <RightOutlined className="scenario-icon" />
                      <span>企业运营：优化决策流程，提高运营效率</span>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* 底部行动召唤 */}
      <div className="feature-section feature-cta">
        <div className="feature-cta-content">
          <Title level={2}>深入了解{detailData.title}</Title>
          <Paragraph>探索更多技术细节，了解如何应用这一核心能力提升业务绩效</Paragraph>
          <Space size="large">
            <Button type="primary" size="large" onClick={handleContactExpert}>
              与技术专家交流
            </Button>
          </Space>
        </div>
      </div>

      {/* 联系信息收集弹窗 */}
      <Modal
        title="技术专家咨询"
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
            label="咨询需求"
          >
            <Input.TextArea 
              placeholder="请简述您的技术咨询需求"
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

export default FeatureDetail; 