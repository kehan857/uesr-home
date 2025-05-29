import React from 'react';
import { Card, Table, Tag, Button, Space, Typography } from 'antd';
import type { TableProps } from 'antd';

const { Title } = Typography;

interface OrderRecord {
  id: string;
  orderNo: string;
  product: string;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  paymentTime?: string;
  createTime: string;
}

const mockOrders: OrderRecord[] = [
  {
    id: '1',
    orderNo: 'ORD202401010001',
    product: '企业版订阅（年付）',
    amount: 99800,
    status: 'paid',
    paymentTime: '2024-01-01 10:00:00',
    createTime: '2024-01-01 09:55:00',
  },
  {
    id: '2',
    orderNo: 'ORD202401020001',
    product: 'Token充值包',
    amount: 29900,
    status: 'pending',
    createTime: '2024-01-02 14:30:00',
  },
];

const Orders: React.FC = () => {
  const getStatusTag = (status: OrderRecord['status']) => {
    const statusConfig = {
      pending: { color: 'warning', text: '待支付' },
      paid: { color: 'success', text: '已支付' },
      cancelled: { color: 'default', text: '已取消' },
      refunded: { color: 'error', text: '已退款' },
    };

    const config = statusConfig[status];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns: TableProps<OrderRecord>['columns'] = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '商品',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `¥${(amount / 100).toFixed(2)}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderRecord['status']) => getStatusTag(status),
    },
    {
      title: '支付时间',
      dataIndex: 'paymentTime',
      key: 'paymentTime',
      render: (time?: string) => time || '-',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <Button
              type="link"
              onClick={() => console.log('去支付', record.orderNo)}
            >
              去支付
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Title level={3}>订单列表</Title>
      <Table
        columns={columns}
        dataSource={mockOrders}
        rowKey="id"
        pagination={{
          total: mockOrders.length,
          pageSize: 10,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />
    </Card>
  );
};

export default Orders;