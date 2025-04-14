import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Upload,
  Button,
  message,
  Steps,
  Result,
  Alert,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { styleConstants } from '@/theme';

type EnterpriseStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

interface EnterpriseState {
  status: EnterpriseStatus;
  rejectReason?: string;
}

const Enterprise: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [enterpriseState, setEnterpriseState] = useState<EnterpriseState>({
    status: 'unverified',
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // TODO: 调用企业认证接口
      setEnterpriseState({ status: 'pending' });
      message.success('认证申请提交成功');
    } catch (error) {
      message.error('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (enterpriseState.status) {
      case 'unverified':
      case 'rejected':
        return (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            {enterpriseState.status === 'rejected' && (
              <Alert
                message="认证未通过"
                description={enterpriseState.rejectReason}
                type="error"
                showIcon
                style={{ marginBottom: styleConstants.spacing.lg }}
              />
            )}
            <Form.Item
              label="企业名称"
              name="enterpriseName"
              rules={[{ required: true, message: '请输入企业名称' }]}
            >
              <Input
                placeholder="请输入营业执照上的企业名称"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="统一社会信用代码"
              name="creditCode"
              rules={[
                { required: true, message: '请输入统一社会信用代码' },
                {
                  pattern: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
                  message: '请输入正确的统一社会信用代码',
                },
              ]}
            >
              <Input
                placeholder="请输入营业执照上的统一社会信用代码"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="营业执照"
              name="license"
              rules={[{ required: true, message: '请上传营业执照' }]}
              extra="请上传清晰的营业执照原件扫描件或照片，支持 jpg、png 格式，大小不超过 5MB"
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={(file) => {
                  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                  if (!isJpgOrPng) {
                    message.error('只支持 JPG/PNG 格式的图片');
                    return false;
                  }
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error('图片大小不能超过 5MB');
                    return false;
                  }
                  return true;
                }}
              >
                {fileList.length === 0 && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                提交认证
              </Button>
            </Form.Item>
          </Form>
        );
      case 'pending':
        return (
          <Result
            title="认证审核中"
            subTitle="我们将在1-3个工作日内完成审核，请耐心等待"
            extra={[
              <Steps
                current={1}
                items={[
                  { title: '提交资料' },
                  { title: '审核中' },
                  { title: '认证完成' },
                ]}
              />,
            ]}
          />
        );
      case 'verified':
        return (
          <Result
            status="success"
            title="企业认证成功"
            subTitle="您的企业已通过认证，现在可以使用平台的所有功能"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card
      title="企业认证"
      bordered={false}
    >
      {renderContent()}
    </Card>
  );
};

export default Enterprise;