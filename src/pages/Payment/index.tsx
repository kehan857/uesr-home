import React, { useState } from 'react';
import { Card, Result, Button, Space, Radio, Typography, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircleOutlined, WechatOutlined, AlipayOutlined, BankOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'wechat',
    name: '微信支付',
    icon: <WechatOutlined style={{ fontSize: '24px', color: '#07C160' }} />,
    description: '使用微信扫码支付'
  },
  {
    id: 'alipay',
    name: '支付宝',
    icon: <AlipayOutlined style={{ fontSize: '24px', color: '#1677FF' }} />,
    description: '使用支付宝扫码支付'
  },
  {
    id: 'offline',
    name: '线下支付',
    icon: <BankOutlined style={{ fontSize: '24px', color: '#722ED1' }} />,
    description: '联系客服进行线下付款'
  }
];

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<'selecting' | 'processing' | 'success'>('selecting');

  const handlePaymentSubmit = () => {
    if (!selectedPayment) {
      message.error('请选择支付方式');
      return;
    }

    setPaymentStatus('processing');
    // 模拟支付过程，2秒后显示支付成功
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  if (paymentStatus === 'success') {
    return (
      <Result
        icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
        title="支付成功！"
        subTitle="您已成功订阅服务，现在可以开始使用企业大脑平台的全部功能。"
        extra={
          <Space>
            <Button type="primary" onClick={() => navigate('/dashboard', {
              state: {
                hasActiveSubscription: true,
                subscriptionInfo: {
                  name: state?.plan?.name,
                  expireDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                  totalTokens: state?.plan?.tokens || 0,
                  usedTokens: 0,
                  status: 'active'
                }
              }
            })}>
              前往仪表盘
            </Button>
          </Space>
        }
      />
    );
  }

  if (paymentStatus === 'processing') {
    return (
      <Card title="订单支付" style={{ maxWidth: 800, margin: '0 auto' }}>
        <Result
          title="正在处理支付..."
          subTitle="请稍候，系统正在处理您的支付请求"
        />
      </Card>
    );
  }

  return (
    <Card title="订单支付" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div>
          <Title level={5}>订单金额</Title>
          <Text style={{ fontSize: '24px', color: '#f5222d' }}>
            ¥{state?.plan?.price}
          </Text>
          <Text type="secondary" style={{ marginLeft: '8px' }}>
            /{state?.plan?.duration}
          </Text>
        </div>

        <div>
          <Title level={5}>选择支付方式</Title>
          <Radio.Group
            onChange={(e) => setSelectedPayment(e.target.value)}
            value={selectedPayment}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {paymentMethods.map(method => (
                <Radio
                  key={method.id}
                  value={method.id}
                  style={{
                    padding: '16px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '8px',
                    width: '100%',
                    marginRight: 0
                  }}
                >
                  <Space>
                    {method.icon}
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{method.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {method.description}
                      </div>
                    </div>
                  </Space>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>

        <Button
          type="primary"
          size="large"
          block
          onClick={handlePaymentSubmit}
        >
          确认支付
        </Button>
      </Space>
    </Card>
  );
};

export default Payment;