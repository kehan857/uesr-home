import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/mainlayout';
import React, { lazy, Suspense } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';
import { Spin } from 'antd';

const LazyPromotion = lazy(() => import('../pages/Promotion'));
const LazyRegister = lazy(() => import('../pages/Register/index'));
const LazyLogin = lazy(() => import('../pages/Login'));
const LazySubscription = lazy(() => import('../pages/Subscription'));
const LazyDashboard = lazy(() => import('../pages/Dashboard'));
const LazyEnterprise = lazy(() => import('../pages/Enterprise'));
const LazyEnterpriseVerify = lazy(() => import('../pages/Enterprise/verify'));
const LazyLanding = lazy(() => import('../pages/Landing'));
const LazyMessages = lazy(() => import('../pages/Messages'));
const LazyOrders = lazy(() => import('../pages/Orders'));
const LazyProfile = lazy(() => import('../pages/Profile'));
const LazyPayment = lazy(() => import('../pages/Payment'));

const routes = [
  {
    element: <AuthProvider><Outlet /></AuthProvider>,
    children: [
      {
        path: '/',
        element: <Navigate to="/promotion" replace />
      },
      {
        path: '/promotion',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Spin size="large" />}>
              <LazyPromotion />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        path: '/register',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Spin size="large" />}>
              <LazyRegister />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        path: '/login',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Spin size="large" />}>
              <LazyLogin />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        path: '/subscription',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Spin size="large" />}>
              <LazySubscription />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        path: '/payment',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Spin size="large" />}>
              <LazyPayment />
            </Suspense>
          </ErrorBoundary>
        )
      },
      {
        path: '/dashboard',
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: (
              <ErrorBoundary>
                <Suspense fallback={<Spin size="large" />}>
                  <LazyDashboard />
                </Suspense>
              </ErrorBoundary>
            )
          }
        ]
      },
      {
        path: '/enterprise',
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: (
              <ErrorBoundary>
                <Suspense fallback={<Spin size="large" />}>
                  <LazyEnterprise />
                </Suspense>
              </ErrorBoundary>
            )
          },
          {
            path: 'verify',
            element: (
              <ErrorBoundary>
                <Suspense fallback={<Spin size="large" />}>
                  <LazyEnterpriseVerify />
                </Suspense>
              </ErrorBoundary>
            )
          }
        ]
      },
      {
        path: '/messages',
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: (
              <ErrorBoundary>
                <Suspense fallback={<Spin size="large" />}>
                  <LazyMessages />
                </Suspense>
              </ErrorBoundary>
            )
          }
        ]
      },
      {
        path: '/orders',
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: (
              <ErrorBoundary>
                <Suspense fallback={<Spin size="large" />}>
                  <LazyOrders />
                </Suspense>
              </ErrorBoundary>
            )
          }
        ]
      },
      {
        path: '/profile',
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: (
              <ErrorBoundary>
                <Suspense fallback={<Spin size="large" />}>
                  <LazyProfile />
                </Suspense>
              </ErrorBoundary>
            )
          }
        ]
      },
      {
        path: '/subscription',
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: (
              <ErrorBoundary>
                <Suspense fallback={<Spin size="large" />}>
                  <LazySubscription />
                </Suspense>
              </ErrorBoundary>
            )
          }
        ]
      }
    ]
  }
];

export const router = createBrowserRouter(routes);