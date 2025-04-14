import React from 'react';
import { Card, Row, Col, Button, Alert, Progress, Space, Typography, Tag, Descriptions, Statistic, List, Empty } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { RightOutlined, WarningOutlined, RocketOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '../../components/ErrorBoundary';

const { Title, Text } = Typography;

interface DashboardProps {
  isEnterpriseVerified?: boolean;
  hasActiveSubscription?: boolean;
  subscriptionInfo?: {
    name: string;
    expireDate: string;
    totalTokens: number;
    usedTokens: number;
    status: 'active' | 'expired' | 'expiring';
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
    status: 'expired'
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

  const getStatusTag = (status: string) => {
    const statusMap = {
      active: { color: 'success', text: '生效中' },
      expired: { color: 'error', text: '已过期' },
      expiring: { color: 'warning', text: '即将到期' }
    };
    return <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag>;
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
                    <Link to="/enterprise/verify">
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
                          <Button
                            size="large"
                            icon={<RocketOutlined />}
                            type="primary"
                            style={{
                              padding: '0 40px',
                              fontSize: '16px',
                              fontWeight: 'bold'
                            }}
                          >
                            企业大脑平台服务
                          </Button>
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
                extra={<Link to="/usage">查看详情 <RightOutlined /></Link>}
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
                  </Col>
                </Row>
              </Card>
            </Col>
          </>
        )}

        <Col span={24}>
          <Space direction="vertical" size={24} style={{ width: '100%' }}>

            <Card 
              title="常用操作"
              bodyStyle={{ padding: '12px 24px' }}
            >
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Link to="/profile">
                    <Button block>账户设置</Button>
                  </Link>
                </Col>
                <Col span={6}>
                  <Link to="/enterprise">
                    <Button block>{isEnterpriseVerified ? '查看认证' : '去认证'}</Button>
                  </Link>
                </Col>
                <Col span={6}>
                  <Link to="/orders">
                    <Button block>订单管理</Button>
                  </Link>
                </Col>
                <Col span={6}>
                  <Link to="/messages">
                    <Button block>消息中心</Button>
                  </Link>
                </Col>
              </Row>
            </Card>

            <Card 
              title="最新通知"
              extra={<Link to="/messages">查看全部 <RightOutlined /></Link>}
            >
              <List
                dataSource={notifications.slice(0, 3)}
                renderItem={item => (
                  <List.Item>
                    <Space>
                      <Tag color={item.type === 'warning' ? 'warning' : item.type === 'success' ? 'success' : 'blue'}>
                        {item.type === 'warning' ? '警告' : item.type === 'success' ? '成功' : '提醒'}
                      </Tag>
                      <span>{item.title}</span>
                      <Text type="secondary">{item.time}</Text>
                    </Space>
                  </List.Item>
                )}
                locale={{ emptyText: '暂无通知' }}
              />
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export const Component = Dashboard;
export default Dashboard;