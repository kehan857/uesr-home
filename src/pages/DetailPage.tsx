import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftOutlined, 
  CheckCircleOutlined, 
  HomeOutlined, 
  RightOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { 
  Button, 
  Spin, 
  Typography, 
  Breadcrumb, 
  Row, 
  Col, 
  Card, 
  List, 
  Divider, 
  Alert,
  Tag,
  Space
} from 'antd';
import { getDetailData } from '../services/detailData';
import './DetailPage.css';

const { Title, Paragraph, Text } = Typography;

// 页面名称映射
const sectionNames: Record<string, string> = {
  advantages: '企业大脑优势',
  features: '核心能力',
  scenarios: '应用场景',
  solutions: '解决方案'
};

// 图标映射
const sectionIcons: Record<string, Record<string, string>> = {
  advantages: {
    'data-fusion': '🔄',
    'intelligent-analysis': '📊',
    'prediction-warning': '⚠️',
    'auto-decision': '🤖'
  },
  features: {
    'data-integration': '📡',
    'knowledge-graph': '🌐',
    'ai-prediction': '🧠'
  },
  scenarios: {
    'intelligent-manufacturing': '🏭',
    'smart-supply-chain': '🔗',
    'quality-control': '✅'
  },
  solutions: {
    'automotive': '🚗',
    'electronics': '💻',
    'equipment': '⚙️',
    'food': '🍽️'
  }
};

const DetailPage: React.FC = () => {
  const { section, itemId } = useParams<{ section: string; itemId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!section || !itemId) {
          throw new Error('缺少必要参数');
        }
        const data = await getDetailData(section, itemId);
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
  }, [section, itemId]);

  // 返回上一页
  const handleBack = () => {
    navigate(-1);
  };

  // 如果正在加载
  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-header">
          <div className="detail-header-content">
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
              返回
            </Button>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/"><HomeOutlined /> 首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>加载中...</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="detail-container detail-skeleton">
          <Spin size="large" tip="加载详情内容中...">
            <div style={{ height: '70vh' }}></div>
          </Spin>
        </div>
      </div>
    );
  }

  // 如果加载出错
  if (error || !detailData) {
    return (
      <div className="detail-page">
        <div className="detail-header">
          <div className="detail-header-content">
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
              返回
            </Button>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/"><HomeOutlined /> 首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>出错了</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="detail-container">
          <div className="detail-not-found">
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

  // 获取当前部分和项目的图标
  const getIcon = () => {
    if (section && itemId && sectionIcons[section] && sectionIcons[section][itemId]) {
      return sectionIcons[section][itemId];
    }
    return '📑';
  };

  return (
    <div className="detail-page">
      {/* 页头 */}
      <div className="detail-header">
        <div className="detail-header-content">
          <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} className="back-button">
            返回
          </Button>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/"><HomeOutlined /> 首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/">{sectionNames[section || ''] || '详情'}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{detailData.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="detail-container">
        {/* 详情头部 - 英雄区 */}
        <div className="detail-hero-banner">
          <div className="detail-hero-overlay">
            <div className="detail-hero-content">
              <div className="detail-hero-icon">{getIcon()}</div>
              <Title level={1}>{detailData.title}</Title>
              <Title level={3} className="detail-subtitle">
                {detailData.subtitle}
              </Title>
              <div className="detail-tags">
                {detailData.benefits && detailData.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                  <Tag color="blue" key={idx}>{benefit}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 详情描述 */}
        <div className="detail-section detail-description-section">
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} md={20} lg={18}>
              <Card bordered={false} className="detail-card">
                <Paragraph className="detail-description">
                  {detailData.description}
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* 核心优势 */}
        {detailData.benefits && detailData.benefits.length > 0 && (
          <div className="detail-section detail-benefits-section">
            <Row gutter={[32, 32]} justify="center">
              <Col xs={24} md={20} lg={18}>
                <div className="section-header">
                  <Title level={2}>核心优势</Title>
                  <div className="section-header-line"></div>
                </div>
                <Row gutter={[24, 24]}>
                  {detailData.benefits.map((benefit: string, idx: number) => (
                    <Col xs={24} sm={12} md={12} lg={6} key={idx}>
                      <Card className="benefit-card" bordered={false}>
                        <div className="benefit-card-icon">
                          <CheckCircleOutlined />
                        </div>
                        <div className="benefit-card-content">
                          <Text strong>{benefit}</Text>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </div>
        )}

        {/* 功能板块 */}
        <div className="detail-section detail-functions-section">
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} md={20} lg={18}>
              <div className="section-header">
                <Title level={2}>功能板块</Title>
                <div className="section-header-line"></div>
              </div>
              <div className="detail-sections">
                {detailData.sections.map((section: any, index: number) => (
                  <div className="detail-function-block" key={index}>
                    <Card 
                      className={`function-card ${index % 2 === 1 ? 'reverse' : ''}`} 
                      bordered={false}
                    >
                      <Row gutter={[32, 32]} align="middle" className="function-row">
                        <Col xs={24} md={section.image ? 12 : 24} className="function-content">
                          <div className="function-index">{String(index + 1).padStart(2, '0')}</div>
                          <Title level={3}>{section.title}</Title>
                          <Paragraph>{section.content}</Paragraph>
                          {section.points && section.points.length > 0 && (
                            <div className="function-points">
                              {section.points.map((point: string, idx: number) => (
                                <div className="function-point" key={idx}>
                                  <CheckOutlined className="point-icon" />
                                  <span>{point}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </Col>
                        {section.image && (
                          <Col xs={24} md={12} className="function-image-col">
                            <div className="function-image">
                              <div className="function-image-placeholder">
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

        {/* 客户案例 */}
        {detailData.caseStudies && detailData.caseStudies.length > 0 && (
          <div className="detail-section detail-cases-section">
            <Row gutter={[32, 32]} justify="center">
              <Col xs={24} md={20} lg={18}>
                <div className="section-header">
                  <Title level={2}>客户案例</Title>
                  <div className="section-header-line"></div>
                </div>
                <Row gutter={[24, 24]}>
                  {detailData.caseStudies.map((caseStudy: any, index: number) => (
                    <Col xs={24} md={12} key={index}>
                      <Card className="case-study-card" bordered={false}>
                        <div className="case-header">
                          <div className="case-company">
                            <Title level={4}>{caseStudy.company}</Title>
                            <Tag color="blue">{caseStudy.industry}</Tag>
                          </div>
                        </div>
                        <Divider style={{ margin: '12px 0' }} />
                        <div className="case-section">
                          <Title level={5}>
                            <span className="case-section-icon">🔍</span> 挑战
                          </Title>
                          <Paragraph>{caseStudy.challenge}</Paragraph>
                        </div>
                        <div className="case-section">
                          <Title level={5}>
                            <span className="case-section-icon">💡</span> 解决方案
                          </Title>
                          <Paragraph>{caseStudy.solution}</Paragraph>
                        </div>
                        <div className="case-section">
                          <Title level={5}>
                            <span className="case-section-icon">🏆</span> 成果
                          </Title>
                          <div className="case-results">
                            {caseStudy.results.map((result: string, idx: number) => (
                              <div className="case-result" key={idx}>
                                <CheckCircleOutlined className="result-icon" />
                                <span>{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </div>
        )}

        {/* 底部CTA */}
        <div className="detail-section detail-cta-section">
          <div className="detail-cta">
            <Title level={2}>开始使用企业大脑，激发数据潜能</Title>
            <Paragraph>联系我们，获取专业顾问一对一咨询服务</Paragraph>
            <Space size="large">
              <Button type="primary" size="large" onClick={() => navigate('/')}>
                返回首页
              </Button>
              <Button size="large">
                预约演示
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
 