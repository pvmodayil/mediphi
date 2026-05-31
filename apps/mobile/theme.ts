import { Platform } from 'react-native';

export const theme = {
  colors: {
    warmBg: '#FAF6F0',
    warmBgAlt: '#F5EFE6',
    surface: '#FFFFFF',
    textPrimary: '#2D2A26',
    textSecondary: '#8B8680',
    accent: '#D4875E',
    accentHover: '#C0744A',
    accentLight: '#FDF0E8',
    sage: '#7A9B8A',
    sageLight: '#E8F0EB',
    border: '#E8E3DC',
    error: '#D65757',
    errorLight: '#FDE8E8',
    success: '#7A9B8A',
    white: '#FFFFFF',
    overlay: 'rgba(45, 42, 38, 0.5)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    heading1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
    },
    heading2: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
    },
    heading3: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
  },
};

export type Theme = typeof theme;
