import React, { useState } from 'react';
import { Card, Row, Col, Button, Tag, Typography, message, Collapse } from 'antd';
import { CheckOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number | string;
  duration: string;
  tokens: number;
  targetUser: string;
  features: {
    standardProducts?: string[];
    smartSoftware?: string[];
    smartData?: string[];
    officeAssistant?: string[];
    customization?: string[];
  };
  recommended?: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'trial',
    name: '免费限期试用版',
    price: '免费',
    duration: '1个月',
    tokens: 800000,
    targetUser: '初次接触企业大脑，对其功能持观望态度，想要先行体验的小型企业、创业团队或个人开发者',
    features: {
      standardProducts: ['知识问答助手（通用问答、私域知识问答）'],
      smartSoftware: ['辅助操作']
    }
  },
  {
    id: 'basic',
    name: '基础版',
    price: 5000,
    duration: '年',
    tokens: 10000000,
    targetUser: '业务规模较小、数字化转型处于起步阶段，主要进行基础业务辅助的企业',
    features: {
      standardProducts: ['知识问答助手（通用问答、私域知识问答）'],
      smartSoftware: ['辅助操作']
    }
  },
  {
    id: 'standard',
    name: '标准版',
    price: 18000,
    duration: '年',
    tokens: 30000000,
    targetUser: '具有一定业务规模，期望通过智能工具提升运营效率、优化业务流程的中小企业',
    features: {
      standardProducts: ['知识问答助手（通用问答、私域知识问答、行业知识问答）'],
      smartSoftware: ['辅助操作', '智能推荐', '预测预警'],
      smartData: ['可视化看板', '智能分析']
    },
    recommended: true
  },
  {
    id: 'professional',
    name: '专业版',
    price: 48000,
    duration: '年',
    tokens: 80000000,
    targetUser: '业务复杂、对智能化程度要求高，需要深度定制与精准数据洞察的中型企业以及部分大型企业的特定业务部门',
    features: {
      customization: ['数据、模型、知识库、agent搭建中心：自由定制agent助手'],
      standardProducts: ['知识问答助手（通用问答、私域知识问答、行业知识问答）'],
      smartSoftware: ['辅助操作', '智能推荐', '预测预警', '企业诊断'],
      smartData: ['可视化看板', '智能分析', '数据问答'],
      officeAssistant: ['PPT助手', 'AI标书', '会议助手']
    }
  },
  {
    id: 'enterprise',
    name: '旗舰版',
    price: '120000起',
    duration: '年',
    tokens: 200000000,
    targetUser: '大型集团企业、行业领军者，追求全方位、一体化智能运营，对数据安全、功能完整性、服务稳定性有极高要求的企业',
    features: {
      customization: ['涵盖所有功能模块', '专属定制服务', '深度数据资产挖掘', '定制化模型开发', '专属安全防护体系搭建']
    }
  }
];

const Subscription: React.FC = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan: SubscriptionPlan) => {
    message.success(`您已选择${plan.name}套餐，即将跳转到支付页面`);
    setTimeout(() => {
      navigate('/payment', { state: { plan } });
    }, 1500);
  };

  return (
    <div style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto', background: 'linear-gradient(180deg, #f0f5ff 0%, #ffffff 100%)' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '48px', color: '#003a8c' }}>
        选择适合您的套餐
      </Title>

      <Row gutter={[16, 24]} justify="center">
        {subscriptionPlans.map(plan => (
          <Col key={plan.id} xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{
                height: '100%',
                borderColor: plan.recommended ? '#1890ff' : '#e6e6e6',
                borderWidth: plan.recommended ? '2px' : '1px',
                borderStyle: 'solid',
                borderRadius: '8px',
                position: 'relative',
                boxShadow: plan.recommended ? '0 4px 12px rgba(24,144,255,0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
                background: plan.recommended ? 'linear-gradient(180deg, #e6f7ff 0%, #ffffff 100%)' : '#ffffff'
              }}
            >
              {plan.recommended && (
                <Tag color="#1890ff" style={{
                  position: 'absolute',
                  top: -12,
                  right: 20,
                  fontSize: '14px',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(24,144,255,0.2)'
                }}>
                  推荐方案
                </Tag>
              )}

              <Title level={5} style={{ 
                textAlign: 'center', 
                color: plan.recommended ? '#1890ff' : '#262626',
                marginBottom: '16px',
                fontSize: '16px'
              }}>
                {plan.name}
              </Title>

              <div style={{ 
                textAlign: 'center', 
                margin: '16px 0',
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '4px'
              }}>
                <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  适用对象
                </Text>
                <div style={{ margin: '4px 0' }}>
                  <Text style={{ fontSize: '12px', lineHeight: '1.4' }}>
                    {plan.targetUser.length > 80 ? `${plan.targetUser.slice(0, 80)}...` : plan.targetUser}
                  </Text>
                </div>
              </div>

              <div style={{ 
                textAlign: 'center', 
                margin: '24px 0',
                padding: '16px',
                background: plan.recommended ? '#e6f7ff' : '#f0f0f0',
                borderRadius: '4px'
              }}>
                <Text style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold',
                  color: plan.recommended ? '#1890ff' : '#262626'
                }}>
                  ¥{plan.price}
                </Text>
                <Text type="secondary" style={{ marginLeft: '4px' }}>/{plan.duration}</Text>
              </div>

              <div style={{ 
                margin: '24px 0',
                padding: '16px',
                background: '#fafafa',
                borderRadius: '4px'
              }}>
                <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>Token额度</Text>
                <div style={{ 
                  margin: '8px 0',
                  fontSize: '16px',
                  color: plan.recommended ? '#1890ff' : '#262626'
                }}>
                  <Text strong>{(plan.tokens / 10000).toFixed(0)}万</Text> Token/{plan.duration}
                </div>
              </div>

              <Collapse
                ghost
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{ background: '#fafafa', borderRadius: '4px', padding: '8px' }}
              >
                <Panel 
                  header={
                    <Text style={{ fontSize: '14px', color: '#595959' }}>功能特性</Text>
                  } 
                  key="1"
                >
                  {plan.features.standardProducts && (
                    <div style={{ margin: '8px 0' }}>
                      <Text strong style={{ color: '#1890ff', fontSize: '13px' }}>标准化产品</Text>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0' }}>
                        {plan.features.standardProducts.map((feature, index) => (
                          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '12px' }}>
                            <CheckOutlined style={{ color: '#52c41a', marginRight: '4px', fontSize: '12px' }} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {plan.features.smartSoftware && (
                    <div style={{ margin: '8px 0' }}>
                      <Text strong style={{ color: '#1890ff', fontSize: '13px' }}>智慧软件</Text>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0' }}>
                        {plan.features.smartSoftware.map((feature, index) => (
                          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '12px' }}>
                            <CheckOutlined style={{ color: '#52c41a', marginRight: '4px', fontSize: '12px' }} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {plan.features.smartData && (
                    <div style={{ margin: '8px 0' }}>
                      <Text strong style={{ color: '#1890ff', fontSize: '13px' }}>智能问数</Text>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0' }}>
                        {plan.features.smartData.map((feature, index) => (
                          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '12px' }}>
                            <CheckOutlined style={{ color: '#52c41a', marginRight: '4px', fontSize: '12px' }} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {plan.features.officeAssistant && (
                    <div style={{ margin: '8px 0' }}>
                      <Text strong style={{ color: '#1890ff', fontSize: '13px' }}>办公助手</Text>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0' }}>
                        {plan.features.officeAssistant.map((feature, index) => (
                          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '12px' }}>
                            <CheckOutlined style={{ color: '#52c41a', marginRight: '4px', fontSize: '12px' }} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {plan.features.customization && (
                    <div style={{ margin: '8px 0' }}>
                      <Text strong style={{ color: '#1890ff', fontSize: '13px' }}>定制化功能</Text>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0' }}>
                        {plan.features.customization.map((feature, index) => (
                          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', fontSize: '12px' }}>
                            <CheckOutlined style={{ color: '#52c41a', marginRight: '4px', fontSize: '12px' }} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Panel>
              </Collapse>

              <Button
                type={plan.recommended ? 'primary' : 'default'}
                block
                size="large"
                style={{ 
                  marginTop: '16px',
                  height: '44px',
                  fontSize: '16px',
                  background: plan.recommended ? '#1890ff' : undefined,
                  borderColor: plan.recommended ? '#1890ff' : undefined,
                  boxShadow: plan.recommended ? '0 2px 6px rgba(24,144,255,0.35)' : undefined
                }}
                onClick={() => handleSubscribe(plan)}
              >
                立即订阅
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Subscription;