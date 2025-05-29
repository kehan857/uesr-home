import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import App from './App';
import './index.css';

// 添加调试日志
console.log('开始渲染应用...');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('找不到root元素!');
  } else {
    console.log('找到root元素，开始创建React根节点');
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ConfigProvider locale={zhCN}>
          <App />
        </ConfigProvider>
      </React.StrictMode>
    );
    console.log('React应用渲染完成');
  }
} catch (error) {
  console.error('应用渲染时出错:', error);
}