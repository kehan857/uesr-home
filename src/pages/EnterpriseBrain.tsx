import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Tabs, 
  Modal, 
  Table, 
  Tooltip, 
  Card, 
  Col, 
  Row,
  Carousel,
  Tag,
  Space,
  Form,
  Input,
  message,
  Dropdown
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDownOutlined,
  CheckOutlined,
  RightOutlined,
  QuestionCircleOutlined,
  ArrowRightOutlined,
  DatabaseOutlined,
  RobotOutlined,
  ApiOutlined,
  SafetyCertificateOutlined,
  CloudOutlined,
  AppstoreOutlined,
  BranchesOutlined,
  BarChartOutlined,
  RadarChartOutlined,
  MessageOutlined,
  TeamOutlined,
  MergeCellsOutlined,
  FundOutlined,
  AlertOutlined,
  CarOutlined,
  LaptopOutlined,
  ToolOutlined,
  CoffeeOutlined,
  UserOutlined,
  PhoneOutlined,
  BankOutlined,
  DashboardOutlined,
  LogoutOutlined,
  DownOutlined
} from '@ant-design/icons';
import './EnterpriseBrain.css';
import { useAuth } from '../contexts/AuthContext';

// 标签页组件
const { TabPane } = Tabs;

const EnterpriseBrain: React.FC = () => {
  // 状态管理
  const [isArchModalVisible, setIsArchModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isCompareModalVisible, setIsCompareModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [inViewSections, setInViewSections] = useState<{[key: string]: boolean}>({});
  const [currentSection, setCurrentSection] = useState('advantages');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  // 新增用户信息收集弹窗状态
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  // 监听元素是否进入视图
  useEffect(() => {
    const sections = document.querySelectorAll('.eb-section');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target.id) {
            setInViewSections(prev => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
            
            // 设置当前活跃的部分
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setCurrentSection(entry.target.id);
            }
          }
        });
      },
      { threshold: [0.1, 0.3, 0.5] }
    );
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // 监听滚动事件，调整header样式
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 平滑滚动到指定区域
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // 设置当前活跃的部分
      setCurrentSection(sectionId);
      
      // 计算偏移量，考虑到顶部导航栏的高度
      const headerHeight = 64; // 4rem = 64px
      const sectionPosition = section.getBoundingClientRect().top;
      const offsetPosition = sectionPosition + window.pageYOffset - headerHeight;
      
      // 平滑滚动
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // 处理登录按钮点击事件
  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      // 跳转至用户中心
      navigate('/dashboard');
    } else {
      // 跳转至登录页
      navigate('/login');
    }
  };

  // 处理试用按钮点击事件
  const handleTrialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // 跳转至用户中心
      navigate('/dashboard');
    }
  };

  // 处理注册按钮点击事件
  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // 跳转到注册页面
    navigate('/register');
  };

  // 处理新登录按钮点击事件
  const handleNewLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // 跳转到登录页面
    navigate('/login');
  };

  // 处理用户菜单点击
  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'dashboard') {
      navigate('/dashboard');
    } else if (key === 'profile') {
      navigate('/profile');
    } else if (key === 'logout') {
      logout();
    }
  };

  // 处理卡片点击 - 跳转到二级页面
  const handleCardClick = (section: string, itemId: string) => {
    // 使用绝对路径进行导航，确保在各种环境下都能正常工作
    navigate(`/detail/${section}/${itemId}`);
  };

  // 用户菜单项
  const userMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '用户中心'
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录'
    }
  ];

  // 顶部导航项
  const navItems = [
    { key: 'advantages', title: '产品优势', onClick: () => scrollToSection('advantages') },
    { key: 'architecture', title: '技术架构', onClick: () => scrollToSection('architecture') },
    { key: 'features', title: '核心功能', onClick: () => scrollToSection('features') },
    { key: 'scenarios', title: '应用场景', onClick: () => scrollToSection('scenarios') },
    { key: 'solutions', title: '解决方案', onClick: () => scrollToSection('solutions') },
    { key: 'plans', title: '套餐方案', onClick: () => scrollToSection('plans') },
  ];

  // 产品优势数据
  const advantages = [
    {
      id: 'data-fusion',
      icon: <MergeCellsOutlined className="advantage-icon" />,
      title: '数据融合',
      description: '打通企业内外数据孤岛，整合ERP、MES、IoT设备等多源数据，构建统一的数据视图，为智能决策奠定坚实基础'
    },
    {
      id: 'intelligent-analysis',
      icon: <FundOutlined className="advantage-icon" />,
      title: '智能分析',
      description: '通过机器学习模型对海量数据进行深度挖掘，提供多维度自助分析与可视化，帮助企业发现隐藏的业务洞察'
    },
    {
      id: 'prediction-warning',
      icon: <AlertOutlined className="advantage-icon" />,
      title: '预测预警',
      description: '基于历史数据和AI算法，前瞻性预测设备故障、质量异常和供应链风险，实现从被动响应到主动预防的转变'
    },
    {
      id: 'auto-decision',
      icon: <RobotOutlined className="advantage-icon" />,
      title: '自动化决策',
      description: '将分析结果转化为自动执行的智能决策流程，减少人为干预，提升响应速度，为企业智能化运营提供全面支持'
    }
  ];

  // 核心功能数据
  const features = [
    {
      key: '1',
      id: 'data-integration',
      icon: <CloudOutlined />,
      title: '全域数据连接与融合',
      description: '支持连接ERP、MES、SCADA、IoT设备、文件系统等40+种数据源，实现企业数据全面整合',
      bullets: [
        '自动化数据采集与同步',
        '智能数据质量检测与清洗',
        '灵活数据模型构建',
        '高性能大数据处理'
      ],
      image: '/images/feature-data-integration.png'
    },
    {
      key: '2',
      id: 'knowledge-graph',
      icon: <BranchesOutlined />,
      title: '企业知识图谱构建',
      description: '基于企业数据自动构建专属知识图谱，建立业务实体间关联，支持复杂关系推理与分析',
      bullets: [
        '自动实体识别与关系抽取',
        '多维知识推理能力',
        '知识图谱可视化展示',
        '领域知识库定制'
      ],
      image: '/images/feature-knowledge-graph.png'
    },
    {
      key: '3',
      id: 'ai-prediction',
      icon: <RadarChartOutlined />,
      title: '智能预测与决策支持',
      description: '基于机器学习和深度学习，实现智能异常检测、预测分析和优化建议，提升业务决策效率',
      bullets: [
        '设备故障预测',
        '需求预测与库存优化',
        '生产计划智能排程',
        '业务异常自动预警'
      ],
      image: '/images/feature-ai-prediction.png'
    }
  ];

  // 应用场景数据
  const scenarios = [
    {
      id: 'intelligent-manufacturing',
      title: '智能制造场景',
      description: '通过工艺参数优化、设备预测性维护和生产计划智能排程，显著提升生产效率，降低维护成本。',
      results: [
        '设备故障预警准确率提升至93%',
        '生产排期效率提升40%',
        '能源消耗降低15%'
      ]
    },
    {
      id: 'smart-supply-chain',
      title: '智慧供应链场景',
      description: '整合供应链上下游数据，实现需求预测、库存优化和物流调度智能化，降低库存成本，提高响应速度。',
      results: [
        '库存周转率提升25%',
        '需求预测准确率提升至87%',
        '缺货率降低60%'
      ]
    },
    {
      id: 'quality-control',
      title: '质量管控场景',
      description: '融合工艺参数、检测数据和过程控制数据，通过AI算法实现质量缺陷预测、根因分析和工艺参数优化。',
      results: [
        '质量缺陷检出率提升35%',
        '质量问题溯源时间缩短65%',
        '产品一次合格率提升12%'
      ]
    }
  ];

  // 解决方案数据
  const solutions = [
    {
      id: 'automotive',
      icon: <CarOutlined />,
      title: '汽车制造解决方案',
      description: '针对汽车制造行业特点定制，覆盖从零部件生产到整车装配的全流程数据智能赋能。',
      features: [
        '零部件质量追溯系统',
        '生产线平衡智能调度',
        '整车质量预测模型'
      ]
    },
    {
      id: 'electronics',
      icon: <LaptopOutlined />,
      title: '电子制造解决方案',
      description: '面向电子制造业的高精度、高效率智能制造解决方案，实现产品品质和生产效率双提升。',
      features: [
        'SMT产线智能优化',
        '电子产品缺陷预测',
        '测试数据智能分析'
      ]
    },
    {
      id: 'equipment',
      icon: <ToolOutlined />,
      title: '装备制造解决方案',
      description: '针对大型装备制造企业，提供设备全生命周期管理和智能化运维解决方案。',
      features: [
        '装备健康管理平台',
        '运行参数优化模型',
        '故障预测与诊断系统'
      ]
    },
    {
      id: 'food',
      icon: <CoffeeOutlined />,
      title: '食品生产解决方案',
      description: '面向食品加工企业，提供安全溯源、质量控制和智能排产的全流程解决方案。',
      features: [
        '原料追踪与溯源系统',
        '生产环境实时监控',
        '质量检测智能化'
      ]
    }
  ];

  // 套餐数据
  const plans = [
    {
      name: '免费限期试用版',
      price: '免费',
      period: '一个月',
      target: '适合初体验的小型企业、创业团队、个人开发者',
      features: [
        '知识问答助手（通用/私域）',
        '智慧软件 - 辅助操作',
        '最多3个用户席位',
        '社区技术支持'
      ],
      tokenLimit: 800000,
      tokenPeriod: '月',
      modules: {
        standard: ['知识问答助手 - 通用/私域', '智慧软件 - 辅助操作'],
        advanced: [],
        premium: []
      },
      cta: '立即注册',
      popular: false
    },
    {
      name: '基础版',
      price: '¥5,000',
      period: '年',
      target: '适合数字化起步、需基础业务辅助的小微企业',
      features: [
        '知识问答助手（通用/私域）',
        '智慧软件 - 辅助操作',
        '最多10个用户席位',
        '工作时间技术支持'
      ],
      tokenLimit: 10000000,
      tokenPeriod: '年',
      modules: {
        standard: ['知识问答助手 - 通用/私域', '智慧软件 - 辅助操作'],
        advanced: [],
        premium: []
      },
      cta: '立即订阅',
      popular: false
    },
    {
      name: '标准版',
      price: '¥18,000',
      period: '年',
      target: '适合期望提升效率、优化流程的中小企业',
      features: [
        '基础版全部功能',
        '行业知识问答',
        '智能推荐、预测预警',
        '可视化看板、智能分析',
        '最多30个用户席位',
        '8*5小时技术支持'
      ],
      tokenLimit: 30000000,
      tokenPeriod: '年',
      modules: {
        standard: ['知识问答助手 - 通用/私域', '智慧软件 - 辅助操作'],
        advanced: ['行业知识问答', '智能推荐', '预测预警', '可视化看板', '智能分析'],
        premium: []
      },
      cta: '立即订阅',
      popular: true
    },
    {
      name: '专业版',
      price: '¥48,000',
      period: '年',
      target: '适合业务复杂、需深度定制与数据洞察的中型企业',
      features: [
        '标准版全部功能',
        '定制Agent',
        '企业诊断',
        '数据问答',
        'Office助手',
        '最多100个用户席位',
        '7*24小时技术支持'
      ],
      tokenLimit: 80000000,
      tokenPeriod: '年',
      modules: {
        standard: ['知识问答助手 - 通用/私域', '智慧软件 - 辅助操作'],
        advanced: ['行业知识问答', '智能推荐', '预测预警', '可视化看板', '智能分析'],
        premium: ['定制Agent', '企业诊断', '数据问答', 'Office助手']
      },
      cta: '立即订阅',
      popular: false
    },
    {
      name: '旗舰版',
      price: '¥120,000起',
      period: '年',
      target: '适合追求全方位智能运营的大型集团/行业领军者',
      features: [
        '涵盖所有功能模块',
        '专属定制服务',
        '无限用户席位',
        '专属顾问服务',
        '安全体系定制',
        '模型开发定制'
      ],
      tokenLimit: 200000000,
      tokenPeriod: '年',
      modules: {
        standard: ['全部标准化功能'],
        advanced: ['全部高级功能'],
        premium: ['全部专业功能', '专属安全体系', '专属模型定制', '专属顾问服务']
      },
      cta: '联系我们',
      popular: false
    }
  ];

  // 处理用户信息表单提交
  const handleContactSubmit = (values: any) => {
    console.log('收集的用户及企业信息:', values);
    // 这里应该调用API提交用户信息
    message.success('您的信息已提交，我们将尽快与您联系！');
    setIsContactModalVisible(false);
    form.resetFields();
  };

  // 处理"开启企业智能化转型之旅"按钮点击
  const handleTransformationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContactModalVisible(true);
  };

  return (
    <div className="eb-container">
      {/* 顶部导航栏 */}
      <header className={`eb-header ${headerScrolled ? 'scrolled' : ''}`}>
        <div className="eb-header-content">
          <div className="eb-logo">天云聚合企业大脑</div>
          <nav className="eb-nav">
            {navItems.map(item => (
              <div 
                className={`eb-nav-item ${currentSection === item.key ? 'active' : ''}`} 
                key={item.key} 
                onClick={item.onClick}
              >
                {item.title}
              </div>
            ))}
          </nav>
          <div className="eb-header-actions">
            {isLoggedIn ? (
              <Dropdown
                menu={{
                  items: userMenuItems,
                  onClick: handleUserMenuClick
                }}
              >
                <Button type="primary" className="eb-primary-btn">
                  <Space>
                    {user?.username || '用户'}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            ) : (
              <>
                <Button onClick={(e) => handleRegisterClick(e)}>立即注册</Button>
                <Button onClick={(e) => handleNewLoginClick(e)} type="primary" className="eb-primary-btn">
                  登录
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 英雄区 */}
      <section className="eb-hero">
        <div className="eb-hero-content">
          <h1 className="eb-hero-title">企业大脑：激活数据智能，驱动制造新未来</h1>
          <p className="eb-hero-subtitle">
            融合企业全域数据，构建智能决策引擎，赋能业务创新与增长
          </p>
          <div className="eb-hero-tags">
            <Tag color="blue">数据洞察</Tag>
            <Tag color="blue">AI赋能</Tag>
            <Tag color="blue">流程自动化</Tag>
            <Tag color="blue">降本增效</Tag>
          </div>
          <div className="eb-hero-cta">
            {isLoggedIn ? (
              <Button 
                type="primary" 
                size="large"
                onClick={(e) => handleLoginClick(e)}
                className="eb-primary-btn"
              >
                进入用户中心
              </Button>
            ) : (
              <Button 
                type="primary" 
                size="large"
                onClick={(e) => handleRegisterClick(e)}
                className="eb-primary-btn"
              >
                立即注册
              </Button>
            )}
            <Button 
              size="large"
              onClick={() => scrollToSection('plans')}
            >
              查看套餐详情
            </Button>
          </div>
          <div 
            className="eb-scroll-indicator"
            onClick={() => scrollToSection('advantages')}
          >
            <ArrowDownOutlined />
          </div>
        </div>
      </section>

      {/* 产品优势部分 */}
      <section id="advantages" className="eb-section eb-advantages">
        <div className="eb-section-header">
          <h2>为什么选择企业大脑？</h2>
          <p>企业大脑融合前沿AI技术与行业洞察，从多个维度为企业带来实质性价值</p>
        </div>
        <div className="eb-advantages-grid">
          {advantages.map((advantage, index) => (
            <div 
              key={advantage.id}
              className={`eb-advantage-card ${inViewSections['advantages'] ? 'animate-in' : ''}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                cursor: 'pointer'
              }}
              onClick={() => handleCardClick('advantages', advantage.id)}
            >
              <div className="eb-advantage-icon">
                {advantage.icon}
              </div>
              <h3>{advantage.title}</h3>
              <p>{advantage.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 技术架构部分 */}
      <section id="architecture" className="eb-section eb-architecture">
        <div className="eb-section-header">
          <h2>驱动智能的核心架构</h2>
          <p>企业大脑采用先进的分层架构设计，确保数据从采集到决策的全流程智能化</p>
        </div>
        <div className="eb-architecture-full">
          <div 
            className="eb-architecture-diagram"
            onClick={() => setIsArchModalVisible(true)}
          >
            <img 
              src="/arch-diagram.png" 
              alt="企业大脑技术架构" 
              className="eb-arch-img"
            />
            <div className="eb-arch-overlay">
              <span>点击查看大图</span>
            </div>
          </div>
          <div className="eb-architecture-description">
            <p>
              企业大脑构建完整数据智能闭环，从用户交互到业务模块、中台支撑、AI智能体，直至数据源层，实现企业全方位数字化转型。
            </p>
          </div>
        </div>

        {/* 架构图放大模态框 */}
        <Modal
          title="企业大脑技术架构"
          open={isArchModalVisible}
          onCancel={() => setIsArchModalVisible(false)}
          width={900}
          footer={null}
          centered
        >
          <img 
            src="/arch-diagram.png" 
            alt="企业大脑技术架构" 
            style={{ width: '100%' }}
          />
        </Modal>
      </section>

      {/* 核心功能部分 */}
      <section id="features" className="eb-section eb-features">
        <div className="eb-section-header">
          <h2>面向企业的核心能力</h2>
          <p>企业大脑提供全面的企业级数据智能能力，满足企业各类数字化场景需求</p>
        </div>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          className="eb-features-tabs"
        >
          {features.map(feature => (
            <TabPane 
              tab={
                <span className="eb-tab-title">
                  {feature.icon} {feature.title}
                </span>
              } 
              key={feature.key}
            >
              <div className="eb-feature-content">
                <div className="eb-feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <ul className="eb-feature-bullets">
                    {feature.bullets.map((bullet, index) => (
                      <li key={index}>
                        <CheckOutlined className="eb-bullet-icon" /> {bullet}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    type="primary" 
                    onClick={() => handleCardClick('features', feature.id)}
                  >
                    查看详情 <RightOutlined />
                  </Button>
                </div>
                <div className="eb-feature-image">
                  <div 
                    className="eb-feature-image-container" 
                    onClick={() => handleCardClick('features', feature.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {feature.key === '1' && (
                      <div className="eb-feature-image-fallback data-integration">
                        <CloudOutlined className="feature-icon" />
                        <span>全域数据连接与融合</span>
                      </div>
                    )}
                    {feature.key === '2' && (
                      <div className="eb-feature-image-fallback knowledge-graph">
                        <BranchesOutlined className="feature-icon" />
                        <span>企业知识图谱构建</span>
                      </div>
                    )}
                    {feature.key === '3' && (
                      <div className="eb-feature-image-fallback ai-prediction">
                        <RadarChartOutlined className="feature-icon" />
                        <span>智能预测与决策支持</span>
                      </div>
                    )}
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && parent.firstElementChild) {
                          (parent.firstElementChild as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </TabPane>
          ))}
        </Tabs>
      </section>

      {/* 应用场景部分 */}
      <section id="scenarios" className="eb-section eb-scenarios">
        <div className="eb-section-header">
          <h2>丰富的行业应用场景</h2>
          <p>企业大脑已在众多行业场景中成功应用，为企业创造实质性价值</p>
        </div>
        
        <div className="eb-scenarios-grid">
          {scenarios.map((scenario) => (
            <div 
              key={scenario.id}
              className="eb-scenario-card"
              onClick={() => handleCardClick('scenarios', scenario.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="eb-scenario-content">
                <h3>{scenario.title}</h3>
                <p>{scenario.description}</p>
                <ul className="eb-scenario-results">
                  {scenario.results.map((result, idx) => (
                    <li key={idx}><CheckOutlined /> <span>{result}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 解决方案部分 */}
      <section id="solutions" className="eb-section eb-solutions">
        <div className="eb-section-header">
          <h2>行业定制解决方案</h2>
          <p>企业大脑深耕制造业细分领域，提供定制化解决方案</p>
        </div>
        
        <Row gutter={[24, 24]} justify="space-between">
          {solutions.map(solution => (
            <Col xs={24} sm={12} lg={6} key={solution.id}>
              <Card 
                className="eb-solution-card"
                hoverable
                onClick={() => handleCardClick('solutions', solution.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="eb-solution-image">
                  <div className="eb-solution-fallback">
                    {solution.icon}
                    <span>{solution.title.split('解决方案')[0]}</span>
                  </div>
                </div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <ul>
                  {solution.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* 套餐方案部分-简化版 */}
      <section id="plans" className="eb-section eb-plans">
        <div className="eb-section-header">
          <h2>灵活的订阅方案</h2>
          <p>根据企业需求和规模，选择最适合的套餐方案</p>
          <p className="scroll-hint" style={{ fontSize: '0.9rem', marginTop: '10px' }}>← 向左右滑动查看更多套餐 →</p>
        </div>
        
        <div className="scroll-container">
          <div className="scroll-content">
            <div className="eb-plan-simplified">
              <div className="eb-plan-header">
                <div className="eb-plan-title">免费限期试用版</div>
                <div className="eb-plan-price-tag">免费</div>
              </div>
              <p className="eb-plan-desc">适合初体验的小型企业、创业团队、个人开发者</p>
              <div className="eb-plan-token">
                <span className="eb-plan-token-label">Token额度：</span>
                <span className="eb-plan-token-value">80万/月</span>
              </div>
              <ul className="eb-plan-highlights">
                <li><CheckOutlined className="eb-check-icon" /> 知识问答助手（通用/私域）</li>
                <li><CheckOutlined className="eb-check-icon" /> 智慧软件 - 辅助操作</li>
                <li><CheckOutlined className="eb-check-icon" /> 最多3个用户席位</li>
              </ul>
              <Button type="default" className="eb-cta-btn" onClick={(e) => handleRegisterClick(e)}>立即注册</Button>
            </div>
            
            <div className="eb-plan-simplified">
              <div className="eb-plan-header">
                <div className="eb-plan-title">基础版</div>
                <div className="eb-plan-price-tag">¥5,000<span style={{ fontSize: '0.9rem', opacity: 0.7 }}>/年</span></div>
              </div>
              <p className="eb-plan-desc">适合数字化起步、需基础业务辅助的小微企业</p>
              <div className="eb-plan-token">
                <span className="eb-plan-token-label">Token额度：</span>
                <span className="eb-plan-token-value">1,000万/年</span>
              </div>
              <ul className="eb-plan-highlights">
                <li><CheckOutlined className="eb-check-icon" /> 知识问答助手（通用/私域）</li>
                <li><CheckOutlined className="eb-check-icon" /> 智慧软件 - 辅助操作</li>
                <li><CheckOutlined className="eb-check-icon" /> 最多10个用户席位</li>
                <li><CheckOutlined className="eb-check-icon" /> 工作时间技术支持</li>
              </ul>
              <Button type="primary" className="eb-cta-btn" onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}>立即订阅</Button>
            </div>
            
            <div className="eb-plan-simplified" style={{ border: '2px solid var(--primary-color)' }}>
              <div className="eb-plan-header">
                <div className="eb-plan-title">标准版</div>
                <div className="eb-plan-price-tag">¥18,000<span style={{ fontSize: '0.9rem', opacity: 0.7 }}>/年</span></div>
              </div>
              <p className="eb-plan-desc">适合期望提升效率、优化流程的中小企业</p>
              <div className="eb-plan-token">
                <span className="eb-plan-token-label">Token额度：</span>
                <span className="eb-plan-token-value">3,000万/年</span>
              </div>
              <div className="eb-recommended-badge">推荐</div>
              <ul className="eb-plan-highlights">
                <li><CheckOutlined className="eb-check-icon" /> 基础版全部功能</li>
                <li><CheckOutlined className="eb-check-icon" /> 行业知识问答</li>
                <li><CheckOutlined className="eb-check-icon" /> 智能推荐、预测预警</li>
                <li><CheckOutlined className="eb-check-icon" /> 可视化看板、智能分析</li>
                <li><CheckOutlined className="eb-check-icon" /> 最多30个用户席位</li>
                <li><CheckOutlined className="eb-check-icon" /> 8*5小时技术支持</li>
              </ul>
              <Button type="primary" className="eb-cta-btn" onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}>立即订阅</Button>
            </div>
            
            <div className="eb-plan-simplified">
              <div className="eb-plan-header">
                <div className="eb-plan-title">专业版</div>
                <div className="eb-plan-price-tag">¥48,000<span style={{ fontSize: '0.9rem', opacity: 0.7 }}>/年</span></div>
              </div>
              <p className="eb-plan-desc">适合业务复杂、需深度定制与数据洞察的中型企业</p>
              <div className="eb-plan-token">
                <span className="eb-plan-token-label">Token额度：</span>
                <span className="eb-plan-token-value">8,000万/年</span>
              </div>
              <ul className="eb-plan-highlights">
                <li><CheckOutlined className="eb-check-icon" /> 标准版全部功能</li>
                <li><CheckOutlined className="eb-check-icon" /> 定制Agent</li>
                <li><CheckOutlined className="eb-check-icon" /> 企业诊断</li>
                <li><CheckOutlined className="eb-check-icon" /> 数据问答</li>
                <li><CheckOutlined className="eb-check-icon" /> Office助手</li>
                <li><CheckOutlined className="eb-check-icon" /> 最多100个用户席位</li>
                <li><CheckOutlined className="eb-check-icon" /> 7*24小时技术支持</li>
              </ul>
              <Button type="primary" className="eb-cta-btn" onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}>立即订阅</Button>
            </div>
            
            <div className="eb-plan-simplified">
              <div className="eb-plan-header">
                <div className="eb-plan-title">旗舰版</div>
                <div className="eb-plan-price-tag">¥120,000起<span style={{ fontSize: '0.9rem', opacity: 0.7 }}>/年</span></div>
              </div>
              <p className="eb-plan-desc">适合追求全方位智能运营的大型集团/行业领军者</p>
              <div className="eb-plan-token">
                <span className="eb-plan-token-label">Token额度：</span>
                <span className="eb-plan-token-value">20,000万/年</span>
              </div>
              <ul className="eb-plan-highlights">
                <li><CheckOutlined className="eb-check-icon" /> 涵盖所有功能模块</li>
                <li><CheckOutlined className="eb-check-icon" /> 专属定制服务</li>
                <li><CheckOutlined className="eb-check-icon" /> 无限用户席位</li>
                <li><CheckOutlined className="eb-check-icon" /> 专属顾问服务</li>
                <li><CheckOutlined className="eb-check-icon" /> 安全体系定制</li>
                <li><CheckOutlined className="eb-check-icon" /> 模型开发定制</li>
              </ul>
              <Button type="default" className="eb-cta-btn" onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}>联系我们</Button>
            </div>
          </div>
        </div>
        
        <div className="eb-plans-compare">
          <Button 
            type="link" 
            onClick={() => setIsCompareModalVisible(true)}
          >
            查看套餐详细对比 <RightOutlined />
          </Button>
        </div>
        
        {/* 套餐对比模态框 */}
        <Modal
          title="套餐方案详细对比"
          open={isCompareModalVisible}
          onCancel={() => setIsCompareModalVisible(false)}
          width={1000}
          footer={null}
          centered
        >
          <Table 
            dataSource={[
              {
                feature: 'Token额度',
                free: '80万/月',
                basic: '1,000万/年',
                standard: '3,000万/年',
                professional: '8,000万/年',
                premium: '20,000万/年起'
              },
              {
                feature: '用户席位',
                free: '3个',
                basic: '10个',
                standard: '30个',
                professional: '100个',
                premium: '无限'
              },
              {
                feature: '知识问答助手（通用/私域）',
                free: '✓',
                basic: '✓',
                standard: '✓',
                professional: '✓',
                premium: '✓'
              },
              {
                feature: '智慧软件 - 辅助操作',
                free: '✓',
                basic: '✓',
                standard: '✓',
                professional: '✓',
                premium: '✓'
              },
              {
                feature: '行业知识问答',
                free: '✕',
                basic: '✕',
                standard: '✓',
                professional: '✓',
                premium: '✓'
              },
              {
                feature: '智能推荐',
                free: '✕',
                basic: '✕',
                standard: '✓',
                professional: '✓',
                premium: '✓'
              },
              {
                feature: '预测预警',
                free: '✕',
                basic: '✕',
                standard: '✓',
                professional: '✓',
                premium: '✓'
              },
              {
                feature: '可视化看板',
                free: '✕',
                basic: '✕',
                standard: '✓',
                professional: '✓',
                premium: '✓'
              },
              {
                feature: '智能分析',
                free: '✕',
                basic: '✕',
                standard: '✓',
                professional: '✓',
                premium: '✓'
              },
              {
                feature: '定制Agent',
                free: '✕',
                basic: '✕',
                standard: '✕',
                professional: '✓',
                premium: '✓'
              },
              {
                feature: '企业诊断',
                free: '✕',
                basic: '✕',
                standard: '✕',
                professional: '✓',
                premium: '✓'
              },
              {
                feature: '数据问答',
                free: '✕',
                basic: '✕',
                standard: '✕',
                professional: '✓',
                premium: '✓'
              },
              {
                feature: 'Office助手',
                free: '✕',
                basic: '✕',
                standard: '✕',
                professional: '✓',
                premium: '✓'
              },
              {
                feature: '专属模型定制',
                free: '✕',
                basic: '✕',
                standard: '✕',
                professional: '✕',
                premium: '✓'
              },
              {
                feature: '专属安全体系',
                free: '✕',
                basic: '✕',
                standard: '✕',
                professional: '✕',
                premium: '✓'
              },
              {
                feature: '技术支持',
                free: '社区',
                basic: '工作时间',
                standard: '8*5小时',
                professional: '7*24小时',
                premium: '专属顾问'
              },
              {
                feature: '价格',
                free: '免费(一个月)',
                basic: '¥5,000/年',
                standard: '¥18,000/年',
                professional: '¥48,000/年',
                premium: '¥120,000/年起'
              }
            ]}
            columns={[
              {
                title: '功能特性',
                dataIndex: 'feature',
                key: 'feature',
                fixed: 'left',
                width: 180
              },
              {
                title: '免费限期试用版',
                dataIndex: 'free',
                key: 'free',
                align: 'center',
                render: text => {
                  if (text === '✓') return <CheckOutlined style={{ color: 'green' }} />;
                  if (text === '✕') return <span style={{ color: '#999' }}>—</span>;
                  return text;
                }
              },
              {
                title: '基础版',
                dataIndex: 'basic',
                key: 'basic',
                align: 'center',
                render: text => {
                  if (text === '✓') return <CheckOutlined style={{ color: 'green' }} />;
                  if (text === '✕') return <span style={{ color: '#999' }}>—</span>;
                  return text;
                }
              },
              {
                title: '标准版',
                dataIndex: 'standard',
                key: 'standard',
                align: 'center',
                className: 'highlight-column',
                render: text => {
                  if (text === '✓') return <CheckOutlined style={{ color: 'green' }} />;
                  if (text === '✕') return <span style={{ color: '#999' }}>—</span>;
                  return text;
                }
              },
              {
                title: '专业版',
                dataIndex: 'professional',
                key: 'professional',
                align: 'center',
                render: text => {
                  if (text === '✓') return <CheckOutlined style={{ color: 'green' }} />;
                  if (text === '✕') return <span style={{ color: '#999' }}>—</span>;
                  return text;
                }
              },
              {
                title: '旗舰版',
                dataIndex: 'premium',
                key: 'premium',
                align: 'center',
                render: text => {
                  if (text === '✓') return <CheckOutlined style={{ color: 'green' }} />;
                  if (text === '✕') return <span style={{ color: '#999' }}>—</span>;
                  return text;
                }
              },
            ]}
            pagination={false}
            bordered
            scroll={{ x: 950, y: 600 }}
          />
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Space size="large">
              <Button type="default" onClick={(e) => handleRegisterClick(e)}>
                立即注册
              </Button>
              <Button type="default" onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}>
                订阅基础版
              </Button>
              <Button type="primary" onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}>
                订阅标准版
              </Button>
              <Button type="default" onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}>
                订阅专业版
              </Button>
              <Button type="default" onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}>
                联系销售
              </Button>
            </Space>
          </div>
        </Modal>
      </section>

      {/* CTA部分 */}
      <section className="eb-section eb-cta">
        <div className="eb-cta-container">
          <h2>开启企业智能化转型之旅</h2>
          <p>企业大脑助您释放数据价值，驱动业务创新与增长</p>
          <div className="eb-cta-buttons">
            {isLoggedIn ? (
              <Button type="primary" size="large" onClick={(e) => handleLoginClick(e)}>
                进入用户中心
              </Button>
            ) : (
              <Button type="primary" size="large" onClick={(e) => handleRegisterClick(e)}>
                立即注册
              </Button>
            )}
            <Button size="large" onClick={(e) => handleTransformationClick(e)}>
              预约产品演示
            </Button>
          </div>
        </div>
      </section>

      {/* 页脚部分 */}
      <footer className="eb-footer">
        <div className="eb-footer-container">
          <div className="eb-footer-content">
            <div className="eb-footer-company">
              <h3>北京天云聚合网络科技有限公司</h3>
              <p>北京市海淀区察微中里14号楼二层A445</p>
              <h3>河南天云聚合网络科技有限公司</h3>
              <p>国家大学科技园（东区）18号楼B座7层</p>
              <p>郑东新区聚德街19号中原数据产业大厦</p>
              <p>全国统一服务热线：<span className="eb-service-phone">400-999-3607</span></p>
            </div>

            <div className="eb-footer-links">
              <div className="eb-footer-column">
                <div className="eb-footer-platform">
                  <h4>云平台</h4>
                  <ul>
                    <li><a href="#">工业互联网平台</a></li>
                    <li><a href="#">物联网平台</a></li>
                    <li><a href="#">大数据平台</a></li>
                    <li><a href="#">企业大脑平台</a></li>
                    <li><a href="#">安全监测平台</a></li>
                    <li><a href="#">综合能源管理平台</a></li>
                    <li><a href="#">智慧水利平台</a></li>
                  </ul>
                </div>
              </div>

              <div className="eb-footer-column">
                <div className="eb-footer-iot">
                  <h4>工业物联</h4>
                  <ul>
                    <li><a href="#">智能运维系统</a></li>
                    <li><a href="#">园区环境监测系统</a></li>
                    <li><a href="#">无人值守系统</a></li>
                    <li><a href="#">安灯呼叫系统</a></li>
                    <li><a href="#">智能称重系统</a></li>
                    <li><a href="#">智能电子看板系统</a></li>
                  </ul>
                </div>
              </div>

              <div className="eb-footer-column">
                <div className="eb-footer-software">
                  <h4>智能硬件</h4>
                  <ul>
                    <li><a href="#">智能采集</a></li>
                    <li><a href="#">网络传输</a></li>
                    <li><a href="#">智能终端</a></li>
                    <li><a href="#">遥检机器人</a></li>
                    <li><a href="#">可视化</a></li>
                  </ul>
                </div>
              </div>

              <div className="eb-footer-column">
                <div className="eb-footer-services">
                  <h4>数字化服务</h4>
                  <ul>
                    <li><a href="#">协同制造服务</a></li>
                    <li><a href="#">数字工厂服务</a></li>
                    <li><a href="#">数字营销服务</a></li>
                    <li><a href="#">数字园区服务</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="eb-footer-column">
                <div className="eb-footer-integration">
                  <h4>产教融合</h4>
                  <ul>
                    <li><a href="#">人工智能实训平台</a></li>
                    <li><a href="#">大数据实训平台</a></li>
                    <li><a href="#">物联网实训平台</a></li>
                    <li><a href="#">工业互联网实训平台</a></li>
                    <li><a href="#">网络安全实训平台</a></li>
                    <li><a href="#">工业机器人</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="eb-footer-bottom">
            <p>© 2023 天云聚合网络科技有限公司 版权所有</p>
          </div>
        </div>
      </footer>

      {/* 登录/注册模态框 */}
      <Modal
        title="登录/注册"
        open={isLoginModalVisible}
        onCancel={() => setIsLoginModalVisible(false)}
        footer={null}
      >
        <p>请选择登录或注册，开始使用企业大脑平台</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: 20 }}>
          <Button type="primary" onClick={(e) => {
            e.preventDefault();
            setIsLoginModalVisible(false);
            navigate('/login');
          }}>用户登录</Button>
          <Button onClick={(e) => {
            e.preventDefault();
            setIsLoginModalVisible(false);
            navigate('/register');
          }}>新用户注册</Button>
        </div>
      </Modal>

      {/* 用户及企业信息收集弹窗 */}
      <Modal
        title="开启您的企业智能化转型之旅"
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
            label="需求描述"
          >
            <Input.TextArea 
              placeholder="请简述您的业务场景与需求"
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

export default EnterpriseBrain; 