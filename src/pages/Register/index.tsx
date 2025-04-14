import React, { useState } from 'react';
import { Card, Form, Input, Button, Tabs, Checkbox, message, Space } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { MobileOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

type RegisterFormData = {
  mobile: string;
  password?: string;
  confirmPassword?: string;
  verifyCode: string;
  agreement: boolean;
};

const validateMobile = (value: string) => {
  const mobileRegex = /^1[3-9]\d{9}$/;
  return mobileRegex.test(value) || '请输入正确的手机号';
};

const validatePassword = (value: string) => {
  if (!value) return '请输入密码';
  if (value.length < 8) return '密码长度至少8位';
  if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) return '密码必须包含字母和数字';
  return true;
};

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [registerType, setRegisterType] = useState<'mobile' | 'password'>('mobile');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 获取验证码
  const handleGetVerifyCode = async (mobile: string) => {
    if (!validateMobile(mobile)) {
      message.error('请输入正确的手机号');
      return;
    }

    try {
      // TODO: 调用发送验证码API
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
      message.error('获取验证码失败，请重试');
    }
  };

  const onFinish = async (values: RegisterFormData) => {
    if (!values.agreement) {
      message.error('请阅读并同意用户协议和隐私政策');
      return;
    }

    try {
      setLoading(true);
      // TODO: 根据不同注册方式调用不同的注册API
      await register(values.mobile, values.password || '');
      message.success('注册成功！');
      navigate('/dashboard');
    } catch (error) {
      message.error('注册失败，请重试');
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
      <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>用户注册</h2>
        
        <Tabs
          activeKey={registerType}
          onChange={(key) => setRegisterType(key as 'mobile' | 'password')}
          items={[
            { key: 'mobile', label: '手机号验证码注册' },
            { key: 'password', label: '手机号密码注册' }
          ]}
        />

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="mobile"
            rules={[{ required: true, message: '请输入手机号' }, { validator: (_, value) => validateMobile(value) ? Promise.resolve() : Promise.reject('请输入正确的手机号') }]}
          >
            <Input
              prefix={<MobileOutlined />}
              size="large"
              placeholder="请输入手机号"
            />
          </Form.Item>

          {registerType === 'password' && (
            <>
              <Form.Item
                name="password"
                rules={[{ validator: (_, value) => validatePassword(value) ? Promise.resolve() : Promise.reject(validatePassword(value)) }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="请设置密码（至少8位，包含字母和数字）"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[{
                  required: true,
                  message: '请确认密码',
                }, ({
                  getFieldValue
                }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次输入的密码不一致');
                  },
                })]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  size="large"
                  placeholder="请确认密码"
                />
              </Form.Item>
            </>
          )}

          <Form.Item
            name="verifyCode"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input
                prefix={<SafetyCertificateOutlined />}
                size="large"
                placeholder="请输入验证码"
              />
              <Button
                size="large"
                disabled={countdown > 0}
                onClick={() => {
                  const mobile = Form.useWatch('mobile');
                  handleGetVerifyCode(mobile);
                }}
              >
                {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
              </Button>
            </Space.Compact>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[{
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('请阅读并同意用户协议和隐私政策'),
            }]}
          >
            <Checkbox>
              我已阅读并同意
              <Link to="/agreement" target="_blank">《用户服务协议》</Link>
              和
              <Link to="/privacy" target="_blank">《隐私政策》</Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              size="large"
            >
              注册
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            已有账号？<Link to="/login">立即登录</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;