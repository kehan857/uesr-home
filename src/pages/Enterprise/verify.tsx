import React, { useState } from 'react';
import { Form, Input, Upload, Button, Card, message, Steps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;

const EnterpriseVerify: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const steps = [
    {
      title: '填写企业信息',
      content: 'enterprise-info'
    },
    {
      title: '上传认证材料',
      content: 'upload-documents'
    },
    {
      title: '等待审核',
      content: 'waiting-verify'
    }
  ];

  const handleSubmit = async (values: any) => {
    try {
      // 这里添加提交认证信息的逻辑
      message.success('认证申请提交成功，请等待审核');
      setCurrentStep(2);
    } catch (error) {
      message.error('提交失败，请重试');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Form.Item>
            <Form.Item
              name="enterpriseName"
              label="企业名称"
              rules={[{ required: true, message: '请输入企业名称' }]}
            >
              <Input placeholder="请输入企业名称" />
            </Form.Item>
            <Form.Item
              name="socialCreditCode"
              label="统一社会信用代码"
              rules={[{ required: true, message: '请输入统一社会信用代码' }]}
            >
              <Input placeholder="请输入统一社会信用代码" />
            </Form.Item>
            <Form.Item
              name="legalPerson"
              label="法定代表人"
              rules={[{ required: true, message: '请输入法定代表人姓名' }]}
            >
              <Input placeholder="请输入法定代表人姓名" />
            </Form.Item>
            <Button type="primary" onClick={() => setCurrentStep(1)}>
              下一步
            </Button>
          </Form.Item>
        );
      case 1:
        return (
          <Form.Item>
            <Form.Item
              name="businessLicense"
              label="营业执照"
              rules={[{ required: true, message: '请上传营业执照' }]}
            >
              <Upload
                name="businessLicense"
                action="/api/upload"
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>上传营业执照</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="otherDocuments"
              label="其他证明材料（选填）"
            >
              <Upload
                name="otherDocuments"
                action="/api/upload"
                listType="picture"
                multiple
              >
                <Button icon={<UploadOutlined />}>上传其他证明材料</Button>
              </Upload>
            </Form.Item>
            <Space>
              <Button onClick={() => setCurrentStep(0)}>上一步</Button>
              <Button type="primary" onClick={() => form.submit()}>
                提交认证
              </Button>
            </Space>
          </Form.Item>
        );
      case 2:
        return (
          <Result
            status="success"
            title="认证申请提交成功"
            subTitle="我们将在1-3个工作日内完成审核，请耐心等待"
            extra={[
              <Button type="primary" onClick={() => navigate('/dashboard')}>
                返回工作台
              </Button>
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="企业认证">
        <Steps current={currentStep} style={{ marginBottom: '24px' }}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: 600, margin: '0 auto' }}
        >
          {renderStepContent()}
        </Form>
      </Card>
    </div>
  );
};

export default EnterpriseVerify;