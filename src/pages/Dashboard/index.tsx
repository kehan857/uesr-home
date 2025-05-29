import React, { useState } from 'react';
import { Card, Row, Col, Button, Alert, Progress, Space, Typography, Tag, Descriptions, Statistic, List, Empty, Tabs, Modal } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { RightOutlined, WarningOutlined, RocketOutlined, ReloadOutlined, ArrowUpOutlined, TagsOutlined } from '@ant-design/icons';
import ErrorBoundary from '../../components/ErrorBoundary';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 添加示例Token包数据
const tokenPackages = [
  { id: 'small', name: '小型', tokens: 5000000, price: 100 },
  { id: 'medium', name: '中型', tokens: 15000000, price: 300 },
  { id: 'large', name: '大型', tokens: 50000000, price: 1000 },
];

interface DashboardProps {
  isEnterpriseVerified?: boolean;
  hasActiveSubscription?: boolean;
  subscriptionInfo?: {
    name: string;
    expireDate: string;
    totalTokens: number;
    usedTokens: number;
    status: 'active' | 'expired' | 'expiring';
    features?: string[];
  };
  notifications?: Array<{
    id: string;
    title: string;
    type: 'info' | 'warning' | 'success';
    time: string;
  }>;
}

const Dashboard: React.FC<DashboardProps> = ({
  isEnterpriseVerified = false,
  hasActiveSubscription = false,
  subscriptionInfo = {
    name: '',
    expireDate: '',
    totalTokens: 0,
    usedTokens: 0,
    status: 'expired',
    features: []
  },
  notifications = []
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从路由状态中获取订阅信息
  const routeState = location.state as { hasActiveSubscription?: boolean; subscriptionInfo?: DashboardProps['subscriptionInfo']; fromPayment?: boolean };
  const effectiveHasActiveSubscription = routeState?.hasActiveSubscription ?? hasActiveSubscription;
  const effectiveSubscriptionInfo = routeState?.subscriptionInfo ?? subscriptionInfo;
  const isFromPayment = routeState?.fromPayment ?? false;

  // Token充值模态框状态
  const [tokenModalVisible, setTokenModalVisible] = useState(false);
  const [selectedTokenPackage, setSelectedTokenPackage] = useState<string | null>(null);
  
  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      active: { color: 'success', text: '生效中' },
      expired: { color: 'error', text: '已过期' },
      expiring: { color: 'warning', text: '即将到期' }
    };
    return <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag>;
  };

  // 获取当前套餐的下一级推荐
  const getRecommendedUpgrade = () => {
    // 由于已删除availablePlans，直接返回null
    return null;
  };

  // 处理Token充值
  const handleTokenRecharge = () => {
    setTokenModalVisible(true);
  };

  // 确认充值
  const handleTokenPurchase = () => {
    if (selectedTokenPackage) {
      const pkg = tokenPackages.find(p => p.id === selectedTokenPackage);
      navigate('/payment', { state: { tokenPackage: pkg } });
    }
    setTokenModalVisible(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Title level={2}>您好，{user?.username}！</Title>
            {!isFromPayment && !isEnterpriseVerified && (
              <Descriptions column={2}>
                <Descriptions.Item label="企业认证状态">
                  <Tag color="warning">未认证</Tag>
                </Descriptions.Item>
              </Descriptions>
            )}
          </Space>
        </Col>
      
        {!isEnterpriseVerified && !effectiveHasActiveSubscription && (
          <Col span={24}>
            <Alert
              message="企业认证提醒"
              description={
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text>完成企业认证后，您将获得以下权益：</Text>
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    <li>使用完整的企业大脑平台功能</li>
                    <li>享受专属的企业级服务支持</li>
                    <li>获取更多的业务场景解决方案</li>
                  </ul>
                  <div style={{ textAlign: 'right' }}>
                    <Link to="/enterprise">
                      <Button type="primary" size="large">立即完成企业认证</Button>
                    </Link>
                  </div>
                </Space>
              }
              type="warning"
              showIcon
              icon={<WarningOutlined />}
              style={{ background: '#FFFBE6', border: '1px solid #FFE58F', borderRadius: '8px' }}
            />
          </Col>
        )}

        {isEnterpriseVerified && !effectiveHasActiveSubscription && (
          <Col span={24}>
            <Alert
              message="订阅服务提醒"
              description={
                <Space>
                  <span>您尚未订阅任何服务，立即订阅开启智能制造之旅</span>
                  <Link to="/subscription">
                    <Button type="primary">订阅服务</Button>
                  </Link>
                </Space>
              }
              type="info"
              showIcon
            />
          </Col>
        )}

        {effectiveHasActiveSubscription && (
          <>
            <Col span={24}>
              <Card 
                title="我的订阅服务"
                extra={<Link to="/subscription">管理订阅 <RightOutlined /></Link>}
                style={{ marginBottom: '24px' }}
              >
                {effectiveSubscriptionInfo.name ? (
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Descriptions column={2} bordered>
                      <Descriptions.Item label="套餐名称" span={2}>
                        <Space size="middle" align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
                          <Space>
                            <Tag color="blue" style={{ padding: '4px 8px' }}>{effectiveSubscriptionInfo.name}</Tag>
                            {getStatusTag(effectiveSubscriptionInfo.status)}
                          </Space>
                          <Space>
                            <Button
                              size="large"
                              icon={<RocketOutlined />}
                              type="primary"
                              style={{
                                padding: '0 40px',
                                fontSize: '16px',
                                fontWeight: 'bold'
                              }}
                              onClick={() => navigate('/dashboard/subscribed')}
                            >
                              企业大脑控制台
                            </Button>
                          </Space>
                        </Space>
                      </Descriptions.Item>
                      <Descriptions.Item label="订阅期限">{effectiveSubscriptionInfo.expireDate}</Descriptions.Item>
                      <Descriptions.Item label="Token额度">
                        <Space>
                          <span>{effectiveSubscriptionInfo.totalTokens.toLocaleString()} 个</span>
                          {effectiveSubscriptionInfo.usedTokens / effectiveSubscriptionInfo.totalTokens > 0.8 && (
                            <Tag color="warning">即将用完</Tag>
                          )}
                        </Space>
                      </Descriptions.Item>
                    </Descriptions>
                    {effectiveSubscriptionInfo.status !== 'active' && (
                      <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Text type="secondary">请先订阅服务以使用完整功能</Text>
                      </div>
                    )}
                  </Space>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="您还没有订阅任何服务"
                  >
                    <Button type="primary" onClick={() => navigate('/subscription')}>立即订阅</Button>
                  </Empty>
                )}
              </Card>
            </Col>

            <Col span={24}>
              <Card 
                title="Token 使用情况"
              >
                <Row gutter={24} align="middle">
                  <Col span={16}>
                    <Progress
                      percent={Math.round((subscriptionInfo.usedTokens / subscriptionInfo.totalTokens) * 100)}
                      status={subscriptionInfo.usedTokens / subscriptionInfo.totalTokens > 0.8 ? 'exception' : 'normal'}
                      strokeWidth={10}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic 
                      title="Token 使用量"
                      value={subscriptionInfo.usedTokens}
                      suffix={` / ${subscriptionInfo.totalTokens}`}
                    />
                    {/* 新增：Token充值按钮 */}
                    <Button 
                      type="primary" 
                      icon={<ReloadOutlined />} 
                      style={{ marginTop: 16 }}
                      onClick={handleTokenRecharge}
                    >
                      充值Token
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </>
        )}
      </Row>

      {/* Token充值模态框 */}
      <Modal
        title="Token充值"
        visible={tokenModalVisible}
        onCancel={() => setTokenModalVisible(false)}
        onOk={handleTokenPurchase}
        okButtonProps={{ disabled: !selectedTokenPackage }}
        okText="确认充值"
        cancelText="取消"
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="标准充值包" key="1">
            <Row gutter={[16, 16]}>
              {tokenPackages.map(pkg => (
                <Col span={8} key={pkg.id}>
                  <Card
                    hoverable
                    style={{ 
                      borderColor: selectedTokenPackage === pkg.id ? '#1890ff' : '#d9d9d9',
                      borderWidth: selectedTokenPackage === pkg.id ? '2px' : '1px'
                    }}
                    onClick={() => setSelectedTokenPackage(pkg.id)}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <Title level={4}>{pkg.name}包</Title>
                      <div style={{ margin: '12px 0' }}>
                        <TagsOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                        <div style={{ margin: '8px 0' }}>
                          <Text strong>{(pkg.tokens / 10000).toFixed(0)}万</Text> Token
                        </div>
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <Text strong style={{ fontSize: 18, color: '#1890ff' }}>¥{pkg.price}</Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tab="自定义充值" key="2">
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Text>如需定制化Token方案，请联系销售人员</Text>
              <div style={{ marginTop: 16 }}>
                <Button type="primary">联系销售</Button>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default Dashboard;
