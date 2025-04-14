import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './contexts/AuthContext';
import { Spin } from 'antd';

const App: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spin size="large" /></div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;