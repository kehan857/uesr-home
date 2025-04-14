import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Tabs, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const { TabPane } = Tabs;

interface LoginFormData {
  phone?: string;
  password?: string;
  verificationCode?: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { login } = useAuth();

  // 处理验证码发送
  const handleSendCode = async (phone: string) => {
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      message.error('请输入正确的手机号');
      return;
    }

    setSendingCode(true);
    try {
      // TODO: 调用发送验证码接口
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('验证码已发送');
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      message.error('验证码发送失败，请重试');
    } finally {
      setSendingCode(false);
    }
  };

  // 处理登录表单提交
  const onFinish = async (values: LoginFormData) => {
    setLoading(true);
    try {
      if (values.phone && values.verificationCode) {
        // 验证码登录
        await login(values.phone, values.verificationCode, 'code');
      } else if (values.phone && values.password) {
        // 密码登录
        await login(values.phone, values.password, 'password');
      }
      message.success('登录成功');
    } catch (error) {
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>用户登录</h2>
        <Tabs defaultActiveKey="code" centered>
          <TabPane tab="验证码登录" key="code">
            <Form
              name="loginByCode"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="phone"
                rules={[{ required: true, message: '请输入手机号' },
                       { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}
              >
                <Input placeholder="请输入手机号" maxLength={11} />
              </Form.Item>

              <Form.Item name="verificationCode">
                <Row gutter={8}>
                  <Col flex="auto">
                    <Form.Item
                      name="verificationCode"
                      noStyle
                      rules={[{ required: true, message: '请输入验证码' }]}
                    >
                      <Input placeholder="请输入验证码" maxLength={6} />
                    </Form.Item>
                  </Col>
                  <Col flex="none">
                    <Button
                      type="primary"
                      loading={sendingCode}
                      disabled={countdown > 0}
                      onClick={() => {
                        const phone = Form.useForm()[0].getFieldValue('phone');
                        handleSendCode(phone);
                      }}
                    >
                      {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="密码登录" key="password">
            <Form
              name="loginByPassword"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="phone"
                rules={[{ required: true, message: '请输入手机号' },
                       { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }]}
              >
                <Input placeholder="请输入手机号" maxLength={11} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          还没有账号？<Link to="/register">立即注册</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;