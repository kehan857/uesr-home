import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Typography, 
  Modal, 
  Form, 
  Input, 
  Select, 
  InputNumber, 
  Tabs, 
  Row, 
  Col, 
  Tooltip, 
  Switch,
  Popconfirm,
  Statistic,
  Progress,
  Divider,
  Avatar 
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  UserOutlined, 
  TeamOutlined, 
  ApiOutlined,
  SettingOutlined,
  ReloadOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// 租户类型
interface Tenant {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  userCount: number;
  plan: string;
  status: 'active' | 'inactive';
  tokenUsage: {
    total: number;
    used: number;
  };
  adminName: string;
}

// 套餐类型简化版
interface Plan {
  id: string;
  name: string;
}

// 用户类型
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

// 示例租户数据
const sampleTenants: Tenant[] = [
  {
    id: '1',
    name: '研发部门',
    description: '负责产品研发和技术创新',
    createdAt: '2025-01-15',
    userCount: 18,
    plan: '专业版',
    status: 'active',
    tokenUsage: {
      total: 20000000,
      used: 8500000
    },
    adminName: '张工'
  },
  {
    id: '2',
    name: '市场部门',
    description: '负责产品营销和市场推广',
    createdAt: '2025-01-20',
    userCount: 12,
    plan: '标准版',
    status: 'active',
    tokenUsage: {
      total: 10000000,
      used: 3200000
    },
    adminName: '李经理'
  },
  {
    id: '3',
    name: '销售部门',
    description: '负责产品销售和客户关系维护',
    createdAt: '2025-02-05',
    userCount: 15,
    plan: '标准版',
    status: 'active',
    tokenUsage: {
      total: 10000000,
      used: 6800000
    },
    adminName: '王总'
  },
  {
    id: '4',
    name: '人事行政',
    description: '负责人事管理和行政事务',
    createdAt: '2025-02-10',
    userCount: 5,
    plan: '基础版',
    status: 'inactive',
    tokenUsage: {
      total: 5000000,
      used: 800000
    },
    adminName: '赵主管'
  }
];

// 示例用户数据
const sampleUsers: User[] = [
  { id: 'u1', name: '张工', email: 'zhang@example.com', role: '管理员', lastActive: '2025-04-08 10:25', status: 'active' },
  { id: 'u2', name: '李工', email: 'li@example.com', role: '普通用户', lastActive: '2025-04-08 09:15', status: 'active' },
  { id: 'u3', name: '王工', email: 'wang@example.com', role: '普通用户', lastActive: '2025-04-07 16:30', status: 'active' },
  { id: 'u4', name: '赵工', email: 'zhao@example.com', role: '只读用户', lastActive: '2025-04-05 11:20', status: 'inactive' },
];

// 示例套餐数据
const availablePlans: Plan[] = [
  { id: 'basic', name: '基础版' },
  { id: 'standard', name: '标准版' },
  { id: 'professional', name: '专业版' },
  { id: 'enterprise', name: '旗舰版' }
];

const TenantManagement: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>(sampleTenants);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [form] = Form.useForm();
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const navigate = useNavigate();

  // 打开创建租户模态框
  const showCreateModal = () => {
    setModalType('create');
    form.resetFields();
    setIsModalVisible(true);
  };

  // 打开编辑租户模态框
  const showEditModal = (tenant: Tenant) => {
    setModalType('edit');
    setCurrentTenant(tenant);
    form.setFieldsValue({
      name: tenant.name,
      description: tenant.description,
      plan: tenant.plan,
      tokenAllocation: tenant.tokenUsage.total,
      adminId: 'u1' // 模拟数据
    });
    setIsModalVisible(true);
  };

  // 显示租户详情
  const showTenantDetail = (tenant: Tenant) => {
    setCurrentTenant(tenant);
    setIsDetailVisible(true);
  };

  // 创建或更新租户
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        if (modalType === 'create') {
          // 创建新租户
          const newTenant: Tenant = {
            id: Date.now().toString(),
            name: values.name,
            description: values.description,
            createdAt: new Date().toISOString().split('T')[0],
            userCount: 1,
            plan: values.plan,
            status: 'active',
            tokenUsage: {
              total: values.tokenAllocation,
              used: 0
            },
            adminName: '新管理员' // 实际应从用户列表获取
          };
          setTenants([...tenants, newTenant]);
        } else if (currentTenant) {
          // 更新现有租户
          const updatedTenants = tenants.map(tenant => 
            tenant.id === currentTenant.id 
              ? { 
                  ...tenant, 
                  name: values.name, 
                  description: values.description,
                  plan: values.plan,
                  tokenUsage: {
                    ...tenant.tokenUsage,
                    total: values.tokenAllocation
                  }
                }
              : tenant
          );
          setTenants(updatedTenants);
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  // 切换租户状态
  const toggleTenantStatus = (tenant: Tenant) => {
    const updatedTenants = tenants.map(t => 
      t.id === tenant.id 
        ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } 
        : t
    );
    setTenants(updatedTenants);
  };

  // 删除租户
  const deleteTenant = (tenantId: string) => {
    setTenants(tenants.filter(tenant => tenant.id !== tenantId));
  };

  // 表格列定义
  const columns = [
    {
      title: '租户名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Tenant) => (
        <Space>
          <Avatar icon={<TeamOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <div>
            <Text strong>{text}</Text>
            <div>
              <Text type="secondary" style={{ fontSize: '12px' }}>{record.description}</Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '用户数',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (count: number) => (
        <Tag color="blue">{count} 名</Tag>
      ),
    },
    {
      title: '套餐',
      dataIndex: 'plan',
      key: 'plan',
      render: (plan: string) => {
        const colorMap = {
          '基础版': 'green',
          '标准版': 'blue',
          '专业版': 'purple',
          '旗舰版': 'gold'
        };
        return <Tag color={colorMap[plan] || 'blue'}>{plan}</Tag>;
      },
    },
    {
      title: 'Token使用',
      key: 'tokenUsage',
      render: (_, record: Tenant) => {
        const percent = Math.round((record.tokenUsage.used / record.tokenUsage.total) * 100);
        const status = percent > 80 ? 'exception' : 'normal';
        return (
          <Tooltip title={`${record.tokenUsage.used.toLocaleString()} / ${record.tokenUsage.total.toLocaleString()}`}>
            <Progress percent={percent} size="small" status={status} />
          </Tooltip>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Tenant) => (
        <Switch 
          checked={status === 'active'} 
          onChange={() => toggleTenantStatus(record)}
          checkedChildren="启用"
          unCheckedChildren="停用"
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: Tenant) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            onClick={() => showTenantDetail(record)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title="确定要删除此租户吗?"
            onConfirm={() => deleteTenant(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 用户列表列定义（用于租户详情）
  const userColumns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          {text}
        </Space>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const colorMap = {
          '管理员': 'red',
          '普通用户': 'green',
          '只读用户': 'blue'
        };
        return <Tag color={colorMap[role] || 'default'}>{role}</Tag>;
      },
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '活跃' : '停用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Title level={3}>多租户管理</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreateModal}
          >
            创建租户
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={tenants}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* 创建/编辑租户模态框 */}
      <Modal
        title={modalType === 'create' ? '创建新租户' : '编辑租户'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
        okText={modalType === 'create' ? '创建' : '保存'}
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="租户名称"
            rules={[{ required: true, message: '请输入租户名称' }]}
          >
            <Input placeholder="例如：研发部门、市场部门" />
          </Form.Item>
          <Form.Item
            name="description"
            label="租户描述"
          >
            <Input.TextArea placeholder="简要描述该租户的用途或业务范围" rows={3} />
          </Form.Item>
          <Form.Item
            name="plan"
            label="分配套餐"
            rules={[{ required: true, message: '请选择套餐' }]}
          >
            <Select placeholder="选择套餐">
              {availablePlans.map(plan => (
                <Option key={plan.id} value={plan.name}>{plan.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="tokenAllocation"
            label="Token配额"
            rules={[{ required: true, message: '请输入Token配额' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => Number(value?.replace(/\$\s?|(,*)/g, '') || '0')}
              min={1000000}
            />
          </Form.Item>
          <Form.Item
            name="adminId"
            label="指定管理员"
            rules={[{ required: true, message: '请选择管理员' }]}
          >
            <Select placeholder="选择用户作为该租户的管理员">
              {users.map(user => (
                <Option key={user.id} value={user.id}>{user.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 租户详情模态框 */}
      <Modal
        title="租户详情"
        visible={isDetailVisible}
        onCancel={() => setIsDetailVisible(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setIsDetailVisible(false)}>
            关闭
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            onClick={() => {
              setIsDetailVisible(false);
              showEditModal(currentTenant);
            }}
          >
            编辑租户
          </Button>,
        ]}
      >
        {currentTenant && (
          <div>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane 
                tab={
                  <span>
                    <SettingOutlined />
                    基本信息
                  </span>
                } 
                key="1"
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Statistic 
                            title="租户名称" 
                            value={currentTenant.name} 
                            valueStyle={{ fontSize: '16px' }}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic 
                            title="创建时间" 
                            value={currentTenant.createdAt} 
                            valueStyle={{ fontSize: '16px' }}
                          />
                        </Col>
                      </Row>
                      <Divider style={{ margin: '12px 0' }} />
                      <Row gutter={16}>
                        <Col span={12}>
                          <Statistic 
                            title="当前套餐" 
                            value={currentTenant.plan} 
                            valueStyle={{ fontSize: '16px', color: '#1890ff' }}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic 
                            title="租户状态" 
                            value={currentTenant.status === 'active' ? '启用' : '停用'} 
                            valueStyle={{ 
                              fontSize: '16px', 
                              color: currentTenant.status === 'active' ? '#52c41a' : '#ff4d4f' 
                            }}
                          />
                        </Col>
                      </Row>
                      <Divider style={{ margin: '12px 0' }} />
                      <Row>
                        <Col span={24}>
                          <Text type="secondary">租户描述</Text>
                          <div style={{ margin: '8px 0' }}>
                            {currentTenant.description || '暂无描述'}
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title="资源使用情况">
                      <Row gutter={16}>
                        <Col span={12}>
                          <Statistic 
                            title="Token使用量" 
                            value={currentTenant.tokenUsage.used} 
                            suffix={` / ${currentTenant.tokenUsage.total}`}
                          />
                          <Progress 
                            percent={Math.round((currentTenant.tokenUsage.used / currentTenant.tokenUsage.total) * 100)} 
                            status={
                              currentTenant.tokenUsage.used / currentTenant.tokenUsage.total > 0.8 
                                ? 'exception' 
                                : 'normal'
                            }
                            style={{ marginTop: 8 }}
                          />
                        </Col>
                        <Col span={12}>
                          <Statistic title="用户数量" value={currentTenant.userCount} suffix=" 名" />
                          <div style={{ marginTop: 24 }}>
                            <Button type="primary" icon={<ReloadOutlined />}>调整资源配额</Button>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane 
                tab={
                  <span>
                    <TeamOutlined />
                    用户管理
                  </span>
                } 
                key="2"
              >
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                  <Text>当前租户用户列表</Text>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    size="small"
                  >
                    添加用户
                  </Button>
                </div>
                <Table
                  columns={userColumns}
                  dataSource={users}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                  size="small"
                />
              </TabPane>
              <TabPane 
                tab={
                  <span>
                    <ApiOutlined />
                    API访问
                  </span>
                } 
                key="3"
              >
                <Card>
                  <Text>API访问密钥管理</Text>
                  <div style={{ margin: '16px 0' }}>
                    <Text type="secondary">用于访问该租户资源的API密钥</Text>
                  </div>
                  <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 4 }}>
                    <code>****************************</code>
                    <div style={{ marginTop: 8 }}>
                      <Button size="small" type="primary">
                        生成新密钥
                      </Button>
                    </div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <Text type="secondary">
                      注意：API密钥具有完全访问权限，请妥善保管。如有泄露，请立即重新生成。
                    </Text>
                  </div>
                </Card>
              </TabPane>
            </Tabs>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TenantManagement; 