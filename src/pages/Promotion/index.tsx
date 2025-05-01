import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Space, Avatar, Dropdown, Menu, Card, Row, Col, Tag, Carousel, Divider, Typography, Progress, Input, Modal, Table, message, Checkbox, Tooltip } from 'antd';
import { 
  UserOutlined, 
  RocketOutlined, 
  TeamOutlined, 
  ApiOutlined, 
  CloudServerOutlined, 
  BarChartOutlined, 
  SafetyCertificateOutlined,
  RobotOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
  CheckOutlined, 
  CloseOutlined, 
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Title, Text, Paragraph } = Typography;

// 添加示例套餐数据（与Dashboard保持一致）
const availablePlans = [
  {
    id: 'free',
    name: '免费限期试用版',
    price: '免费',
    period: '一个月',
    features: ['知识问答助手（通用/私域）', '智慧软件 - 辅助操作', '社区支持'],
    tokens: 800000,
    users: 3
  },
  {
    id: 'basic',
    name: '基础版',
    price: 5000,
    period: '年',
    features: ['知识问答助手（通用/私域）', '智慧软件 - 辅助操作', '标准客户支持'],
    tokens: 10000000,
    users: 10
  },
  {
    id: 'standard',
    name: '标准版',
    price: 18000,
    period: '年',
    features: ['行业知识问答', '智能推荐', '预测预警', '可视化看板', '智能分析'],
    tokens: 30000000,
    recommended: true,
    users: 30
  },
  {
    id: 'professional',
    name: '专业版',
    price: 48000,
    period: '年',
    features: ['自定义Agent', '企业诊断', '数据问答', 'Office助手', '7*24支持'],
    tokens: 80000000,
    users: 100
  },
  {
    id: 'enterprise',
    name: '旗舰版',
    price: '120000起',
    period: '年',
    features: ['专属模型定制', '专属安全体系', '专属顾问服务', '不限用户', '定制化开发'],
    tokens: 200000000,
    users: '不限'
  }
];

// 添加套餐特性类型定义
interface PlanFeature {
  key: string;
  name: string;
  category: string;
  description: string;
  plans: Record<string, FeatureSupport>;
}

// 添加特性支持程度类型定义
type FeatureSupport = boolean | 'limited' | 'full' | 'custom' | string;

// 添加套餐特性数据
const features: PlanFeature[] = [
  // 基础功能
  {
    key: 'token',
    name: 'Token配额',
    category: '基础配置',
    description: '每年可使用的计算资源数量',
    plans: {
      free: '800,000/月',
      basic: '10,000,000/年',
      standard: '30,000,000/年',
      professional: '80,000,000/年',
      enterprise: '200,000,000+/年'
    }
  },
  {
    key: 'users',
    name: '用户数量',
    category: '基础配置',
    description: '可创建的用户数量',
    plans: {
      free: '3名',
      basic: '10名',
      standard: '30名',
      professional: '100名',
      enterprise: '不限'
    }
  },
  {
    key: 'tenant',
    name: '多租户支持',
    category: '基础配置',
    description: '支持创建多个租户（部门/子公司等）',
    plans: {
      free: false,
      basic: false,
      standard: 'limited',
      professional: true,
      enterprise: true
    }
  },
  {
    key: 'support',
    name: '技术支持',
    category: '基础配置',
    description: '技术支持响应级别',
    plans: {
      free: '社区支持',
      basic: '工作时间支持',
      standard: '8*5支持',
      professional: '7*24支持',
      enterprise: '专属顾问'
    }
  },
  // 标准化产品
  {
    key: 'qa_general',
    name: '通用问答助手',
    category: '标准化产品',
    description: '基于大语言模型的通用知识问答',
    plans: {
      free: true,
      basic: true,
      standard: true,
      professional: true,
      enterprise: true
    }
  },
  {
    key: 'qa_private',
    name: '私域知识问答助手',
    category: '标准化产品',
    description: '基于企业私有知识库的智能问答',
    plans: {
      free: true,
      basic: true,
      standard: true,
      professional: true,
      enterprise: true
    }
  },
  {
    key: 'qa_industry',
    name: '行业知识问答',
    category: '标准化产品',
    description: '针对特定行业的专业知识问答',
    plans: {
      free: false,
      basic: false,
      standard: true,
      professional: true,
      enterprise: true
    }
  },
  // 智慧软件
  {
    key: 'assist_operation',
    name: '辅助操作',
    category: '智慧软件',
    description: '智能辅助完成常规操作',
    plans: {
      free: true,
      basic: true,
      standard: true,
      professional: true,
      enterprise: true
    }
  },
  {
    key: 'smart_recommend',
    name: '智能推荐',
    category: '智慧软件',
    description: '基于数据分析的智能推荐系统',
    plans: {
      free: false,
      basic: false,
      standard: true,
      professional: true,
      enterprise: true
    }
  },
  {
    key: 'prediction',
    name: '预测预警',
    category: '智慧软件',
    description: '数据趋势预测与异常预警功能',
    plans: {
      free: false,
      basic: false,
      standard: true,
      professional: true,
      enterprise: true
    }
  },
  // 更多功能可以添加...
];

// 添加渲染支持状态函数
const renderSupportStatus = (support: FeatureSupport) => {
  if (typeof support === 'boolean') {
    return support ? (
      <CheckOutlined style={{ color: '#52c41a', fontSize: 16 }} />
    ) : (
      <CloseOutlined style={{ color: '#f5222d', fontSize: 16 }} />
    );
  } else if (support === 'limited') {
    return (
      <Tooltip title="有限支持，可能有功能或数量限制">
        <Tag color="orange">有限</Tag>
      </Tooltip>
    );
  } else if (support === 'full') {
    return (
      <Tooltip title="完全支持，无任何限制">
        <Tag color="green">完全</Tag>
      </Tooltip>
    );
  } else if (support === 'custom') {
    return (
      <Tooltip title="可根据需求定制">
        <Tag color="blue">定制</Tag>
      </Tooltip>
    );
  } else {
    return <span>{support}</span>;
  }
};

const Promotion: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  
  // 添加状态管理弹窗
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [compareModalVisible, setCompareModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    '基础配置', '标准化产品', '智慧软件'
  ]);
  
  // 根据选中的类别过滤特性
  const filteredFeatures = features.filter(feature => 
    selectedCategories.includes(feature.category)
  );
  
  // 所有可用类别
  const allCategories = Array.from(new Set(features.map(f => f.category)));
  
  // 切换类别筛选
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // 处理订阅按钮点击
  const handleSubscribe = (plan: any) => {
    if (!isLoggedIn) {
      Modal.confirm({
        title: '需要登录',
        content: '请先登录后再订阅套餐',
        okText: '去登录',
        cancelText: '取消',
        onOk: () => {
          navigate('/login');
        }
      });
      return;
    }
    
    // 假设需要检查用户是否认证，但目前User类型中没有certified属性
    // 这里使用简化的检查方式，实际项目中应该根据后端API返回的用户信息来判断
    const userCertified = user && Object.prototype.hasOwnProperty.call(user, 'certified') 
      ? (user as any).certified 
      : false;
    
    if (!userCertified) {
      Modal.confirm({
        title: '需要完成企业认证',
        content: '请先完成企业认证后再订阅套餐',
        okText: '去认证',
        cancelText: '取消',
        onOk: () => {
          navigate('/enterprise');
        }
      });
      return;
    }
    
    // 认证用户可以直接跳转到订阅页面
    navigate(`/subscription?plan=${plan.id}`);
  };

  // 处理查看详情按钮点击
  const handleViewDetail = (plan: any) => {
    setSelectedPlan(plan);
    setDetailModalVisible(true);
  };
  
  // 表格列配置
  const getCompareColumns = () => {
    return [
      {
        title: '功能特性',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left' as 'left',
        width: 180,
        render: (text: string, record: PlanFeature) => (
          <Tooltip title={record.description}>
            <div>
              <Text strong>{text}</Text>
              <InfoCircleOutlined style={{ marginLeft: 8, color: '#1890ff' }} />
            </div>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.category}</Text>
          </Tooltip>
        ),
      },
      ...availablePlans.map(plan => ({
        title: (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: plan.recommended ? 'bold' : 'normal', color: plan.recommended ? '#1890ff' : 'inherit' }}>
              {plan.name}
              {plan.recommended && <Tag color="blue" style={{ marginLeft: 4 }}>推荐</Tag>}
            </div>
            <div style={{ fontSize: 14, fontWeight: 'bold' }}>
              {typeof plan.price === 'number' ? `¥${plan.price}` : plan.price}
              <span style={{ fontSize: 12, fontWeight: 'normal' }}>/{plan.period}</span>
            </div>
          </div>
        ),
        dataIndex: ['plans', plan.id],
        key: plan.id,
        width: 110,
        align: 'center' as 'center',
        render: (text: FeatureSupport) => renderSupportStatus(text),
      })),
    ];
  };

  // 添加轮播引用
  const carouselRef = useRef<any>(null);

  // 轮播控制函数
  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

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

          .plan-card {
            height: 100%;
            transition: all 0.3s ease;
            border: 2px solid transparent;
          }
          
          .plan-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }
          
          .plan-card.recommended {
            border-color: #1890ff;
          }
          
          .feature-item {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }
          
          .feature-icon {
            margin-right: 10px;
            color: #52c41a;
          }
          
          .plan-price {
            font-size: 24px;
            font-weight: bold;
            color: #1890ff;
            margin: 16px 0;
          }
          
          .carousel-container {
            padding: 20px 50px;
          }
          
          .carousel-card {
            margin: 10px;
            padding: 20px;
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
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 添加背景图形元素 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)',
          opacity: 0.1,
          backgroundSize: '100%',
          zIndex: 0
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', marginBottom: '24px', fontSize: '3rem', fontWeight: 'bold' }}>
            企业大脑 — 激活数据智能，驱动制造新未来
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem', maxWidth: '900px', margin: '0 auto 40px', lineHeight: 1.8 }}>
            整合企业内外部数据与知识，利用大语言模型与AI技术，为制造业企业提供洞察、预测、决策支持和自动化能力的智能化平台
          </p>
          <Space size="large">
            <Link to="/register">
              <Button type="primary" size="large" icon={<RocketOutlined />} style={{ height: '48px', fontSize: '16px', padding: '0 32px' }}>
                免费试用30天
              </Button>
            </Link>
            <Link to="/subscription">
              <Button size="large" ghost style={{ height: '48px', fontSize: '16px', padding: '0 32px' }}>
                查看套餐详情
              </Button>
            </Link>
          </Space>
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SafetyCertificateOutlined style={{ fontSize: '24px', marginRight: '8px', color: '#52c41a' }} />
              <span>安全合规</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TeamOutlined style={{ fontSize: '24px', marginRight: '8px', color: '#52c41a' }} />
              <span>超过1000+企业选择</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CloudServerOutlined style={{ fontSize: '24px', marginRight: '8px', color: '#52c41a' }} />
              <span>7×24小时服务</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="container">
        <section>
          <h2 style={{ marginBottom: '20px' }}>为什么选择企业大脑？</h2>
          <p className="text-center" style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 40px', color: '#666' }}>
            基于大语言模型与人工智能技术，企业大脑帮助制造业企业提升效率、降低成本、增强决策能力
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="feature-card" style={{ padding: '40px 30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }}>
                <RobotOutlined />
              </div>
              <h3>数据智能</h3>
              <p>利用先进的AI技术，深度挖掘企业数据价值，提供精准的业务洞察和预测分析。</p>
              <div style={{ marginTop: '20px', color: '#1890ff', fontWeight: 'bold' }}>
                <span style={{ fontSize: '36px' }}>40%</span>
                <span style={{ marginLeft: '10px', fontSize: '16px' }}>数据利用率提升</span>
              </div>
            </div>
            <div className="feature-card" style={{ padding: '40px 30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }}>
                <ThunderboltOutlined />
              </div>
              <h3>流程优化</h3>
              <p>智能化流程再造，提升运营效率，降低成本，实现业务流程的持续优化。</p>
              <div style={{ marginTop: '20px', color: '#1890ff', fontWeight: 'bold' }}>
                <span style={{ fontSize: '36px' }}>30%</span>
                <span style={{ marginLeft: '10px', fontSize: '16px' }}>运营成本降低</span>
              </div>
            </div>
            <div className="feature-card" style={{ padding: '40px 30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }}>
                <BarChartOutlined />
              </div>
              <h3>决策支持</h3>
              <p>基于数据和AI的智能决策支持系统，帮助企业做出更科学、更准确的商业决策。</p>
              <div style={{ marginTop: '20px', color: '#1890ff', fontWeight: 'bold' }}>
                <span style={{ fontSize: '36px' }}>60%</span>
                <span style={{ marginLeft: '10px', fontSize: '16px' }}>决策效率提升</span>
              </div>
            </div>
          </div>
        </section>

        {/* 套餐展示区域 - 修改为滑动样式 */}
        <section style={{ background: '#f7f9fc', padding: '80px 0' }}>
          <div className="container">
            <h2 style={{ marginBottom: '20px' }}>灵活多样的套餐选择</h2>
            <p className="text-center" style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 40px', color: '#666' }}>
              从免费试用到企业定制，企业大脑提供多种套餐选择，满足不同规模企业的智能化需求
            </p>
            
            <div style={{ position: 'relative', maxWidth: '100%', overflow: 'hidden' }}>
              {/* 滑动提示覆盖层 */}
              <div 
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: 'none',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0) 80%, rgba(247,249,252,0.8) 95%, rgba(247,249,252,1) 100%), linear-gradient(270deg, rgba(255,255,255,0) 80%, rgba(247,249,252,0.8) 95%, rgba(247,249,252,1) 100%)',
                  zIndex: 2
                }}
              />
              
              <Carousel
                ref={carouselRef}
                dots={true}
                infinite={true}
                slidesToShow={window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : window.innerWidth < 1200 ? 3 : 4}
                slidesToScroll={1}
                draggable={true}
                swipeToSlide={true}
                autoplay={false}
                arrows={false}
                responsive={[
                  {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 3,
                    }
                  },
                  {
                    breakpoint: 992,
                    settings: {
                      slidesToShow: 2,
                    }
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                    }
                  }
                ]}
                dotPosition="bottom"
              >
                {availablePlans.map(plan => (
                  <div key={plan.id} style={{ padding: '4px 8px' }}>
                    <Card
                      hoverable
                      className={`plan-card ${plan.recommended ? 'recommended' : ''}`}
                      style={{
                        height: '100%',
                        borderColor: plan.recommended ? '#1890ff' : '#d9d9d9',
                        borderWidth: plan.recommended ? '2px' : '1px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      {plan.recommended && (
                        <div style={{ 
                          position: 'absolute', 
                          top: 0, 
                          right: 0, 
                          background: '#1890ff', 
                          color: 'white', 
                          padding: '5px 15px',
                          transform: 'rotate(45deg) translate(15px, -15px)',
                          transformOrigin: 'top right',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          zIndex: 1
                        }}>
                          推荐
                        </div>
                      )}
                      
                      <div style={{ padding: '20px', flex: 1 }}>
                        <Title level={4} style={{ color: plan.recommended ? '#1890ff' : 'inherit', marginBottom: '16px', textAlign: 'center' }}>
                          {plan.name}
                        </Title>
                        
                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                          <div className="plan-price" style={{ fontSize: '28px', fontWeight: 'bold', color: '#1890ff' }}>
                            {typeof plan.price === 'number' ? `¥${plan.price.toLocaleString()}` : plan.price}
                            <span style={{ fontSize: '14px', color: '#666' }}>/{plan.period}</span>
                          </div>
                          
                          <div style={{ margin: '10px 0' }}>
                            <Tag color="#108ee9" style={{ padding: '4px 8px' }}>
                              适合{plan.id === 'free' ? '初次体验' : plan.id === 'basic' ? '小微企业' : 
                                  plan.id === 'standard' ? '中小企业' : plan.id === 'professional' ? '中型企业' : '大型企业'}
                            </Tag>
                          </div>
                        </div>
                        
                        <div style={{ marginBottom: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <Text style={{ fontSize: '14px' }}>Token额度</Text>
                            <Text strong style={{ fontSize: '14px' }}>{(plan.tokens / 10000).toLocaleString()}万</Text>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: '14px' }}>用户数量</Text>
                            <Text strong style={{ fontSize: '14px' }}>{plan.users}</Text>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ padding: '0 20px 20px' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Button 
                            type="primary" 
                            block
                            onClick={() => handleSubscribe(plan)}
                          >
                            {plan.id === 'free' ? '免费试用' : '订阅套餐'}
                          </Button>
                          <Button 
                            type="link" 
                            block
                            onClick={() => handleViewDetail(plan)}
                          >
                            查看详情
                          </Button>
                        </Space>
                      </div>
                    </Card>
                  </div>
                ))}
              </Carousel>
              
              {/* 导航控制区 */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '30px' }}>
                <Button 
                  onClick={handlePrev}
                  type="primary" 
                  shape="circle"
                  size="large"
                  icon={<LeftOutlined />}
                  style={{ boxShadow: '0 4px 12px rgba(24,144,255,0.2)' }}
                />
                <Button 
                  onClick={handleNext}
                  type="primary" 
                  shape="circle"
                  size="large"
                  icon={<RightOutlined />}
                  style={{ boxShadow: '0 4px 12px rgba(24,144,255,0.2)' }}
                />
              </div>
            </div>
            
            <div className="text-center" style={{ marginTop: '40px' }}>
              <Button 
                type="primary" 
                size="large" 
                style={{ padding: '0 32px', height: '48px', fontSize: '16px' }}
                onClick={() => setCompareModalVisible(true)}
              >
                查看套餐详细对比
              </Button>
            </div>
          </div>
        </section>

        {/* 添加套餐详情弹窗 */}
        <Modal
          title="套餐详情"
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailModalVisible(false)}>
              关闭
            </Button>,
            <Button 
              key="subscribe" 
              type="primary" 
              onClick={() => {
                setDetailModalVisible(false);
                if (selectedPlan) handleSubscribe(selectedPlan);
              }}
            >
              {selectedPlan?.id === 'free' ? '免费试用' : '订阅此套餐'}
            </Button>
          ]}
          width={800}
        >
          {selectedPlan && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Title level={3} style={{ color: selectedPlan.recommended ? '#1890ff' : 'inherit' }}>
                  {selectedPlan.name}
                  {selectedPlan.recommended && <Tag color="blue" style={{ marginLeft: 8 }}>推荐</Tag>}
                </Title>
                <div className="plan-price" style={{ fontSize: '30px', fontWeight: 'bold', color: '#1890ff', margin: '10px 0' }}>
                  {typeof selectedPlan.price === 'number' ? `¥${selectedPlan.price.toLocaleString()}` : selectedPlan.price}
                  <span style={{ fontSize: '16px', color: '#666' }}>/{selectedPlan.period}</span>
                </div>
              </div>
              
              <Divider />
              
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Title level={5}>基本信息</Title>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                      <span>适用对象:</span>
                      <span>
                        {selectedPlan.id === 'free' ? '初次体验' : selectedPlan.id === 'basic' ? '小微企业' : 
                        selectedPlan.id === 'standard' ? '中小企业' : selectedPlan.id === 'professional' ? '中型企业' : '大型企业'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                      <span>Token额度:</span>
                      <span>{(selectedPlan.tokens / 10000).toLocaleString()}万</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                      <span>用户限制:</span>
                      <span>{selectedPlan.users}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                      <span>计费周期:</span>
                      <span>{selectedPlan.period}</span>
                    </div>
                  </div>
                </Col>
                
                <Col span={12}>
                  <Title level={5}>包含功能</Title>
                  <div>
                    {selectedPlan.features.map((feature: string, index: number) => (
                      <div key={index} className="feature-item" style={{ margin: '10px 0' }}>
                        <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
              
              <Divider />
              
              <div>
                <Title level={5}>套餐说明</Title>
                <p>
                  {selectedPlan.id === 'free' 
                    ? '免费试用套餐为您提供30天的企业大脑全功能体验，包含知识问答助手和智慧软件辅助操作等核心功能。限期结束后可升级为付费套餐继续使用。' 
                    : selectedPlan.id === 'basic'
                    ? '基础版套餐适合小规模企业使用，提供核心功能的同时，为您的小团队提供标准客户支持。'
                    : selectedPlan.id === 'standard'
                    ? '标准版套餐为最受欢迎的企业选择，在基础版基础上增加了行业知识问答、智能推荐、预测预警等更多高级功能。'
                    : selectedPlan.id === 'professional'
                    ? '专业版套餐提供企业级应用，包括自定义Agent、企业诊断、数据问答等功能，并提供7*24小时支持服务。'
                    : '旗舰版套餐为大型企业提供最全面的功能与服务，包括专属模型定制、专属安全体系、专属顾问服务等高级功能，不限用户数量。'
                  }
                </p>
              </div>
            </div>
          )}
        </Modal>

        {/* 添加套餐对比弹窗 */}
        <Modal
          title="套餐功能对比"
          open={compareModalVisible}
          onCancel={() => setCompareModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setCompareModalVisible(false)}>
              关闭
            </Button>
          ]}
          width={1000}
          style={{ top: 20 }}
        >
          <div>
            <div style={{ marginBottom: 16 }}>
              <Text strong>筛选类别：</Text>
              <div style={{ marginTop: 8 }}>
                {allCategories.map(category => (
                  <Checkbox
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    style={{ marginRight: 16, marginBottom: 8 }}
                  >
                    {category}
                  </Checkbox>
                ))}
              </div>
            </div>
            
            <Table
              columns={getCompareColumns()}
              dataSource={filteredFeatures}
              rowKey="key"
              pagination={false}
              scroll={{ x: 'max-content' }}
              bordered
              size="middle"
              style={{ overflowX: 'auto' }}
            />
            
            <Divider />
            
            <Row gutter={[16, 16]} justify="center">
              {availablePlans.map(plan => (
                <Col key={plan.id}>
                  <Button 
                    type={plan.recommended ? "primary" : "default"}
                    size="large"
                    onClick={() => {
                      setCompareModalVisible(false);
                      handleSubscribe(plan);
                    }}
                  >
                    {plan.id === 'free' ? '免费试用' : '订阅'} {plan.name}
                  </Button>
                </Col>
              ))}
            </Row>
          </div>
        </Modal>

        {/* 核心功能区域 */}
        <section style={{ background: 'white', padding: '80px 0' }}>
          <div className="container">
            <h2 style={{ marginBottom: '20px' }}>面向企业的核心能力</h2>
            <p className="text-center" style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 40px', color: '#666' }}>
              企业大脑为各行业企业提供全方位智能解决方案，赋能企业数字化转型
            </p>
            
            <Row gutter={[32, 32]}>
              <Col xs={24} sm={12} md={6}>
                <Card 
                  hoverable 
                  style={{ height: '100%', borderRadius: '8px', textAlign: 'center' }}
                  bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 20px' }}
                >
                  <div style={{ fontSize: '40px', color: '#1890ff', marginBottom: '20px' }}>
                    <CloudServerOutlined />
                  </div>
                  <Title level={4} style={{ marginBottom: '16px' }}>智能分析</Title>
                  <p style={{ flex: 1 }}>多维度数据分析，深入洞察业务趋势，为管理决策提供有力支持</p>
                  <div style={{ background: '#f5f5f5', width: '100%', padding: '10px', borderRadius: '4px', marginTop: '20px' }}>
                    <Text type="secondary" style={{ fontSize: '13px' }}>设备效率分析 · 产能规划 · 产品质量分析</Text>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} sm={12} md={6}>
                <Card 
                  hoverable 
                  style={{ height: '100%', borderRadius: '8px', textAlign: 'center' }}
                  bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 20px' }}
                >
                  <div style={{ fontSize: '40px', color: '#1890ff', marginBottom: '20px' }}>
                    <SafetyCertificateOutlined />
                  </div>
                  <Title level={4} style={{ marginBottom: '16px' }}>预测预警</Title>
                  <p style={{ flex: 1 }}>智能预测潜在风险，提前预警处理，降低生产事故和损失</p>
                  <div style={{ background: '#f5f5f5', width: '100%', padding: '10px', borderRadius: '4px', marginTop: '20px' }}>
                    <Text type="secondary" style={{ fontSize: '13px' }}>设备故障预警 · 库存预警 · 质量异常预警</Text>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} sm={12} md={6}>
                <Card 
                  hoverable 
                  style={{ height: '100%', borderRadius: '8px', textAlign: 'center' }}
                  bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 20px' }}
                >
                  <div style={{ fontSize: '40px', color: '#1890ff', marginBottom: '20px' }}>
                    <ApiOutlined />
                  </div>
                  <Title level={4} style={{ marginBottom: '16px' }}>流程自动化</Title>
                  <p style={{ flex: 1 }}>智能工作流设计，自动化业务处理，提升生产和管理效率</p>
                  <div style={{ background: '#f5f5f5', width: '100%', padding: '10px', borderRadius: '4px', marginTop: '20px' }}>
                    <Text type="secondary" style={{ fontSize: '13px' }}>生产排程 · 工艺优化 · 自动报表生成</Text>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} sm={12} md={6}>
                <Card 
                  hoverable 
                  style={{ height: '100%', borderRadius: '8px', textAlign: 'center' }}
                  bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 20px' }}
                >
                  <div style={{ fontSize: '40px', color: '#1890ff', marginBottom: '20px' }}>
                    <TeamOutlined />
                  </div>
                  <Title level={4} style={{ marginBottom: '16px' }}>知识赋能</Title>
                  <p style={{ flex: 1 }}>构建企业知识图谱，沉淀经验，实现知识共享和复用</p>
                  <div style={{ background: '#f5f5f5', width: '100%', padding: '10px', borderRadius: '4px', marginTop: '20px' }}>
                    <Text type="secondary" style={{ fontSize: '13px' }}>工艺知识库 · 故障诊断 · 专家经验传承</Text>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        {/* 立即开始区域 */}
        <section style={{ 
          padding: '100px 0', 
          background: 'white',
          color: '#333',
          textAlign: 'center'
        }}>
          <div className="container">
            <Title level={1} style={{ marginBottom: '24px', color: '#333', fontSize: '2.5rem' }}>立即开启智能之旅</Title>
            <Paragraph style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 40px', color: '#666' }}>
              选择适合您的套餐，开启数字化转型之路，提升企业竞争力
            </Paragraph>
            
            <Row gutter={[24, 24]} justify="center" style={{ marginBottom: '40px' }}>
              <Col xs={24} sm={8}>
                <Card 
                  hoverable
                  bordered={true}
                  style={{ 
                    height: '100%',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    textAlign: 'center'
                  }}
                >
                  <Space direction="vertical" size="small">
                    <div style={{ 
                      fontSize: '40px', 
                      color: '#1890ff', 
                      marginBottom: '16px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <RocketOutlined />
                    </div>
                    <Title level={2} style={{ color: '#333', margin: 0 }}>30天</Title>
                    <Text style={{ color: '#666' }}>免费试用期</Text>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card 
                  hoverable
                  bordered={true}
                  style={{ 
                    height: '100%',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    textAlign: 'center'
                  }}
                >
                  <Space direction="vertical" size="small">
                    <div style={{ 
                      fontSize: '40px', 
                      color: '#1890ff', 
                      marginBottom: '16px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <TeamOutlined />
                    </div>
                    <Title level={2} style={{ color: '#333', margin: 0 }}>1小时</Title>
                    <Text style={{ color: '#666' }}>专家顾问咨询</Text>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card 
                  hoverable
                  bordered={true}
                  style={{ 
                    height: '100%',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    textAlign: 'center'
                  }}
                >
                  <Space direction="vertical" size="small">
                    <div style={{ 
                      fontSize: '40px', 
                      color: '#1890ff', 
                      marginBottom: '16px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <CloudServerOutlined />
                    </div>
                    <Title level={2} style={{ color: '#333', margin: 0 }}>全天候</Title>
                    <Text style={{ color: '#666' }}>技术支持服务</Text>
                  </Space>
                </Card>
              </Col>
            </Row>
            
            <Space size="large">
              <Link to="/register">
                <Button type="primary" size="large" icon={<RocketOutlined />} style={{ height: '48px', fontSize: '16px', padding: '0 32px' }}>
                  免费试用30天
                </Button>
              </Link>
              <Link to="/subscription">
                <Button type="default" size="large" style={{ height: '48px', fontSize: '16px', padding: '0 32px' }}>
                  查看套餐详情
                </Button>
              </Link>
            </Space>
          </div>
        </section>

        {/* 页脚 */}
        <footer style={{ background: '#001529', padding: '70px 0 50px', color: 'rgba(255,255,255,0.65)' }}>
          <div className="container">
            <Row gutter={[32, 32]}>
              <Col xs={24} md={7}>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                  <RocketOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '10px' }} />
                  <Title level={3} style={{ color: 'white', margin: 0 }}>天云聚合</Title>
                </div>
                <Paragraph style={{ color: 'rgba(255,255,255,0.65)' }}>
                  天云聚合致力于为制造业企业提供智能化解决方案，助力企业数字化转型升级。结合先进的AI技术与深厚的行业经验，帮助企业提升效率、降低成本、增强创新能力。
                </Paragraph>
                <Space style={{ marginTop: '20px' }}>
                  <Button shape="circle" icon={<i className="fab fa-weixin" />} />
                  <Button shape="circle" icon={<i className="fab fa-weibo" />} />
                  <Button shape="circle" icon={<i className="fab fa-linkedin" />} />
                </Space>
              </Col>
              
              <Col xs={24} md={5}>
                <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>产品服务</Title>
                <Space direction="vertical">
                  <Link to="/features" style={{ color: 'rgba(255,255,255,0.65)', display: 'block', margin: '8px 0' }}>企业大脑平台</Link>
                  <Link to="/solutions" style={{ color: 'rgba(255,255,255,0.65)', display: 'block', margin: '8px 0' }}>行业解决方案</Link>
                  <Link to="/ai-service" style={{ color: 'rgba(255,255,255,0.65)', display: 'block', margin: '8px 0' }}>AI服务中心</Link>
                  <Link to="/partner" style={{ color: 'rgba(255,255,255,0.65)', display: 'block', margin: '8px 0' }}>合作伙伴计划</Link>
                </Space>
              </Col>
              
              <Col xs={24} md={5}>
                <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>快速入口</Title>
                <Space direction="vertical">
                  <Link to="/register" style={{ color: 'rgba(255,255,255,0.65)', display: 'block', margin: '8px 0' }}>注册账号</Link>
                  <Link to="/login" style={{ color: 'rgba(255,255,255,0.65)', display: 'block', margin: '8px 0' }}>登录</Link>
                  <Link to="/subscription/compare" style={{ color: 'rgba(255,255,255,0.65)', display: 'block', margin: '8px 0' }}>套餐对比</Link>
                  <Link to="/enterprise" style={{ color: 'rgba(255,255,255,0.65)', display: 'block', margin: '8px 0' }}>企业认证</Link>
                </Space>
              </Col>
              
              <Col xs={24} md={7}>
                <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>联系我们</Title>
                <Space direction="vertical" size="large">
                  <div>
                    <p style={{ margin: '8px 0', display: 'flex', alignItems: 'center' }}>
                      <i className="fas fa-phone" style={{ marginRight: '10px', width: '16px' }}></i>
                      400-888-8888
                    </p>
                    <p style={{ margin: '8px 0', display: 'flex', alignItems: 'center' }}>
                      <i className="fas fa-envelope" style={{ marginRight: '10px', width: '16px' }}></i>
                      contact@tianyunju.com
                    </p>
                    <p style={{ margin: '8px 0', display: 'flex', alignItems: 'center' }}>
                      <i className="fas fa-map-marker-alt" style={{ marginRight: '10px', width: '16px' }}></i>
                      北京市朝阳区科技园区88号
                    </p>
                  </div>
                  
                  <Card style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'transparent' }}>
                    <Input.Group compact>
                      <Input 
                        style={{ width: 'calc(100% - 100px)' }} 
                        placeholder="输入邮箱订阅最新资讯" 
                      />
                      <Button type="primary" style={{ width: '100px' }}>订阅</Button>
                    </Input.Group>
                  </Card>
                </Space>
              </Col>
            </Row>
            
            <Divider style={{ background: 'rgba(255,255,255,0.2)', margin: '40px 0' }} />
            
            <Row justify="space-between" align="middle">
              <Col xs={24} md={12} style={{ textAlign: 'left' }}>
                <p style={{ color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                  © 2024 天云聚合科技有限公司. All rights reserved.
                </p>
              </Col>
              <Col xs={24} md={12} style={{ textAlign: 'right' }}>
                <Space split={<Divider type="vertical" style={{ background: 'rgba(255,255,255,0.2)' }} />}>
                  <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.45)' }}>隐私政策</Link>
                  <Link to="/terms" style={{ color: 'rgba(255,255,255,0.45)' }}>服务条款</Link>
                  <Link to="/sitemap" style={{ color: 'rgba(255,255,255,0.45)' }}>网站地图</Link>
                </Space>
              </Col>
            </Row>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Promotion;