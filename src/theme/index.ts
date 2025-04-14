import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    fontSize: 14,
    borderRadius: 2,
    wireframe: false,
  },
  components: {
    Layout: {
      bodyBg: '#ffffff',
      headerBg: '#ffffff',
      siderBg: '#ffffff',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: '#e6f4ff',
      itemSelectedColor: '#1677ff',
    },
    Card: {
      colorBorderSecondary: '#f0f0f0',
    },
  },
};

export const styleConstants = {
  headerHeight: 64,
  siderWidth: 200,
  contentMaxWidth: 1200,
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: 24,
    h2: 20,
    h3: 16,
    h4: 14,
    base: 14,
    small: 12,
  },
};