import React, { useState } from 'react';
import { Card, List, Tag, Typography, Badge, Tabs, Empty, Space } from 'antd';
import { BellOutlined, WarningOutlined, InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface Message {
  id: string;
  title: string;
  content: string;
  type: 'system' | 'subscription' | 'order';
  status: 'unread' | 'read';
  importance: 'normal' | 'important' | 'urgent';
  createTime: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    title: '您的企业认证已通过审核',
    content: '恭喜！您的企业认证申请已通过审核，现在可以使用完整的平台功能。',
    type: 'system',
    status: 'unread',
    importance: 'important',
    createTime: '2024-01-15 10:00:00',
  },
  {
    id: '2',
    title: '订阅即将到期提醒',
    content: '您的企业版订阅将在30天后到期，为避免服务中断，请及时续费。',
    type: 'subscription',
    status: 'unread',
    importance: 'urgent',
    createTime: '2024-01-14 15:30:00',
  },
  {
    id: '3',
    title: '订单支付成功通知',
    content: '您的订单 ORD202401010001 已支付成功，感谢您的使用。',
    type: 'order',
    status: 'read',
    importance: 'normal',
    createTime: '2024-01-01 10:05:00',
  },
];

const Messages: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [messages, setMessages] = useState(mockMessages);

  const getImportanceTag = (importance: Message['importance']) => {
    switch (importance) {
      case 'urgent':
        return <Tag color="error" icon={<WarningOutlined />}>紧急</Tag>;
      case 'important':
        return <Tag color="warning" icon={<InfoCircleOutlined />}>重要</Tag>;
      default:
        return <Tag icon={<CheckCircleOutlined />}>普通</Tag>;
    }
  };

  const handleMessageClick = (id: string) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, status: 'read' } : msg
    ));
  };

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  const items = [
    {
      key: 'all',
      label: (
        <span>
          全部消息
          {unreadCount > 0 && <Badge count={unreadCount} style={{ marginLeft: 8 }} />}
        </span>
      ),
    }
  ];

  return (
    <Card>
      <Title level={3}>
        <BellOutlined style={{ marginRight: 8 }} />
        消息中心
      </Title>
      <Tabs
        activeKey="all"
        items={items}
      />
      <List
        itemLayout="vertical"
        dataSource={messages}
        locale={{
          emptyText: <Empty description="暂无消息" />,
        }}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            onClick={() => handleMessageClick(item.id)}
            style={{
              cursor: 'pointer',
              backgroundColor: item.status === 'unread' ? '#f0f5ff' : 'transparent',
              padding: '16px',
              marginBottom: '8px',
              borderRadius: '4px',
            }}
          >
            <List.Item.Meta
              title={
                <Space>
                  {item.status === 'unread' && <Badge status="processing" />}
                  <span>{item.title}</span>
                  {getImportanceTag(item.importance)}
                </Space>
              }
              description={item.createTime}
            />
            <Paragraph style={{ margin: 0 }}>{item.content}</Paragraph>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Messages;