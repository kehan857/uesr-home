import React from 'react';
import { Card, Row, Col, Button, Space, Typography, Tag } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  RocketOutlined
} from '@ant-design/icons';

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
    features?: string[];
  };
}

const Dashboard2: React.FC<DashboardProps> = ({
  isEnterpriseVerified = true,
  hasActiveSubscription = true,
  subscriptionInfo = {
    name: '标准版',
    expireDate: '2024-09-14',
    totalTokens: 30000000,
    usedTokens: 12500000,
    status: 'active',
    features: ['知识问答助手', '辅助操作', '行业知识问答', '智能推荐', '预测预警']
  }
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      active: { color: 'success', text: '生效中' },
      expired: { color: 'error', text: '已过期' },
      expiring: { color: 'warning', text: '即将到期' }
    };
    return <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag>;
  };
  
  // 处理启动企业大脑
  const handleLaunchEnterpriseBrain = () => {
    window.open('http://101.201.66.223:9025/dashboard', '_blank');
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
              <Title level={2} style={{ margin: 0 }}>企业大脑控制台</Title>
            </Space>
          </Space>
        </Col>
        
        <Col span={24}>
          <Card>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={6}>
                <Space direction="vertical" size={2}>
                  <Text type="secondary">当前版本</Text>
                  <Space>
                    <Text strong style={{ fontSize: 18 }}>{subscriptionInfo.name}</Text>
                    {getStatusTag(subscriptionInfo.status)}
                  </Space>
                </Space>
              </Col>
              
              <Col xs={24} md={6}>
                <Space direction="vertical" size={2}>
                  <Text type="secondary">到期时间</Text>
                  <Text strong>{subscriptionInfo.expireDate}</Text>
                </Space>
              </Col>
              
              <Col xs={24} md={12} style={{ textAlign: 'right' }}>
                <Button 
                  type="primary" 
                  icon={<RocketOutlined />}
                  size="large"
                  onClick={handleLaunchEnterpriseBrain}
                  style={{ minWidth: 150 }}
                >
                  启动企业大脑
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard2; 