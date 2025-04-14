import React from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  message,
  Typography,
  Space,
} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Profile: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('个人资料更新成功');
  };

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={4}>个人资料</Title>
        
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar size={100} icon={<UserOutlined />} />
          <div style={{ marginTop: 16 }}>
            <Upload showUploadList={false}>
              <Button icon={<UploadOutlined />}>更换头像</Button>
            </Upload>
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: '张三',
            email: 'zhangsan@example.com',
            phone: '13800138000',
          }}
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
};

export default Profile;