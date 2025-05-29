import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EnterpriseBrain from '../pages/EnterpriseBrain';
import AdvantageDetail from '../pages/advantages/AdvantageDetail';
import FeatureDetail from '../pages/features/FeatureDetail';
import ScenarioDetail from '../pages/scenarios/ScenarioDetail';
import SolutionDetail from '../pages/solutions/SolutionDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Dashboard2 from '../pages/Dashboard/Dashboard2';
import MainLayout from '../layouts/mainlayout';
import Profile from '../pages/Profile';
import Enterprise from '../pages/Enterprise/index';
import Subscription from '../pages/Subscription/index';
import { AuthProvider } from '../contexts/AuthContext';

const AppRouter: React.FC = () => {
  // 简化获取基础路径的方式，避免 process.env 相关错误
  const basename = '';
  
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Routes>
          {/* 主页路由 */}
          <Route path="/" element={<EnterpriseBrain />} />
          
          {/* 登录和注册路由 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* 详情页路由 */}
          <Route path="/detail/advantages/:itemId" element={<AdvantageDetail />} />
          <Route path="/detail/features/:itemId" element={<FeatureDetail />} />
          <Route path="/detail/scenarios/:itemId" element={<ScenarioDetail />} />
          <Route path="/detail/solutions/:itemId" element={<SolutionDetail />} />
          
          {/* 用户中心路由 */}
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/subscribed" element={<Dashboard2 />} />
            <Route path="profile" element={<Profile />} />
            <Route path="enterprise" element={<Enterprise />} />
            <Route path="subscription" element={<Subscription />} />
          </Route>
          
          {/* 添加404路由重定向到首页 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;