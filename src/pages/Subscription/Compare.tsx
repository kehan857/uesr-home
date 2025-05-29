import React, { useState } from 'react';
import { Row, Col, Card, Table, Typography, Tag, Button, Tooltip, Space, Divider, Checkbox } from 'antd';
import { CheckOutlined, CloseOutlined, ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

// 套餐特性类型
interface PlanFeature {
  key: string;
  name: string;
  category: string;
  description: string;
  plans: Record<string, FeatureSupport>;
}

// 特性支持程度类型
type FeatureSupport = boolean | 'limited' | 'full' | 'custom' | string;

// 套餐类型
interface Plan {
  id: string;
  name: string;
  price: number | string;
  monthlyPrice?: number | string;
  description: string;
  tokens: number;
  recommended?: boolean;
}

// 示例套餐数据
const plans: Plan[] = [
  {
    id: 'trial',
    name: '免费限期试用版',
    price: '免费',
    description: '初次体验企业大脑，想先行体验的小型企业',
    tokens: 800000,
  },
  {
    id: 'basic',
    name: '基础版',
    price: 5000,
    monthlyPrice: 500,
    description: '数字化起步、需基础业务辅助的小微企业',
    tokens: 10000000,
  },
  {
    id: 'standard',
    name: '标准版',
    price: 18000,
    monthlyPrice: 1800,
    description: '期望提升效率、优化流程的中小企业',
    tokens: 30000000,
    recommended: true
  },
  {
    id: 'professional',
    name: '专业版',
    price: 48000,
    monthlyPrice: 4800,
    description: '业务复杂、需深度定制与数据洞察的中型企业',
    tokens: 80000000,
  },
  {
    id: 'enterprise',
    name: '旗舰版',
    price: '120000起',
    description: '追求全方位智能运营、对安全/功能/稳定性要求高的大型集团',
    tokens: 200000000,
  }
];

// 示例特性数据
const features: PlanFeature[] = [
  // 基础功能
  {
    key: 'token',
    name: 'Token配额',
    category: '基础配置',
    description: '每年可使用的计算资源数量',
    plans: {
      trial: '800,000/月',
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
      trial: '3名',
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
      trial: false,
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
      trial: '社区支持',
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
      trial: true,
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
      trial: true,
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
      trial: false,
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
      trial: true,
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
      trial: false,
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
      trial: false,
      basic: false,
      standard: true,
      professional: true,
      enterprise: true
    }
  },
  {
    key: 'diagnosis',
    name: '企业诊断',
    category: '智慧软件',
    description: '企业运营数据综合分析与诊断',
    plans: {
      trial: false,
      basic: false,
      standard: false,
      professional: true,
      enterprise: true
    }
  },
  // 智能问数
  {
    key: 'viz_dashboard',
    name: '可视化看板',
    category: '智能问数',
    description: '数据可视化与监控看板',
    plans: {
      trial: false,
      basic: false,
      standard: true,
      professional: true,
      enterprise: true
    }
  },
  {
    key: 'smart_analysis',
    name: '智能分析',
    category: '智能问数',
    description: '自动化数据分析与洞察',
    plans: {
      trial: false,
      basic: false,
      standard: true,
      professional: true,
      enterprise: true
    }
  },
  {
    key: 'data_qa',
    name: '数据问答',
    category: '智能问数',
    description: '自然语言数据查询与分析',
    plans: {
      trial: false,
      basic: false,
      standard: false,
      professional: true,
      enterprise: true
    }
  },
  // 办公助手
  {
    key: 'ppt_assistant',
    name: 'PPT助手',
    category: '办公助手',
    description: '智能PPT生成与优化功能',
    plans: {
      trial: false,
      basic: false,
      standard: false,
      professional: true,
      enterprise: true
    }
  },
  {
    key: 'meeting_assistant',
    name: '会议助手',
    category: '办公助手',
    description: '会议纪要生成与会议效率提升',
    plans: {
      trial: false,
      basic: false,
      standard: false,
      professional: true,
      enterprise: true
    }
  },
  // 定制服务
  {
    key: 'custom_agent',
    name: '定制Agent',
    category: '定制服务',
    description: '构建自定义业务智能体',
    plans: {
      trial: false,
      basic: false,
      standard: false,
      professional: true,
      enterprise: true
    }
  },
  {
    key: 'custom_model',
    name: '专属模型开发',
    category: '定制服务',
    description: '根据企业需求定制专属AI模型',
    plans: {
      trial: false,
      basic: false,
      standard: false,
      professional: false,
      enterprise: true
    }
  },
  {
    key: 'security',
    name: '专属安全体系',
    category: '定制服务',
    description: '企业专属的数据安全防护体系',
    plans: {
      trial: false,
      basic: false,
      standard: false,
      professional: false,
      enterprise: true
    }
  }
];

// 渲染支持状态
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

const PlanCompare: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    '基础配置', '标准化产品', '智慧软件', '智能问数', '办公助手', '定制服务'
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
  
  // 表格列配置
  const columns = [
    {
      title: '功能特性',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left' as 'left',
      width: 220,
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
    ...plans.map(plan => ({
      title: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: plan.recommended ? 'bold' : 'normal', color: plan.recommended ? '#1890ff' : 'inherit' }}>
            {plan.name}
            {plan.recommended && <Tag color="blue" style={{ marginLeft: 4 }}>推荐</Tag>}
          </div>
          <div style={{ fontSize: 16, fontWeight: 'bold' }}>
            {typeof plan.price === 'number' ? `¥${plan.price}` : plan.price}
            <span style={{ fontSize: 12, fontWeight: 'normal' }}>/年</span>
          </div>
        </div>
      ),
      dataIndex: ['plans', plan.id],
      key: plan.id,
      width: 120,
      align: 'center' as 'center',
      render: (text: FeatureSupport) => renderSupportStatus(text),
    })),
  ];

  return (
    <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/subscription')}
        >
          返回套餐列表
        </Button>
      </div>
      
      <Card>
        <Title level={3} style={{ marginBottom: 24 }}>套餐功能对比</Title>
        
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
          columns={columns}
          dataSource={filteredFeatures}
          rowKey="key"
          pagination={false}
          scroll={{ x: 'max-content' }}
          bordered
          size="middle"
          sticky
          style={{ overflowX: 'auto' }}
        />
        
        <Divider />
        
        <Row gutter={[16, 16]} justify="center">
          {plans.map(plan => (
            <Col key={plan.id}>
              <Button 
                type={plan.recommended ? "primary" : "default"}
                size="large"
                onClick={() => navigate('/subscription', { state: { highlightPlan: plan.id } })}
              >
                {plan.id === 'trial' ? '免费试用' : '订阅'} {plan.name}
              </Button>
            </Col>
          ))}
        </Row>
      </Card>
      
      <div style={{ margin: '24px 0', textAlign: 'center' }}>
        <Space>
          <Button type="link" onClick={() => navigate('/Enterprise', { state: { openContactForm: true } })}>
            需要更详细的咨询？联系我们的销售顾问
          </Button>
          <Button type="link" onClick={() => navigate('/Enterprise', { state: { downloadWhitepaper: true } })}>
            下载详细产品白皮书
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default PlanCompare; 