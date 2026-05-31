import { Platform, ViewStyle, TextStyle } from 'react-native';

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
    shadow: 'rgba(45, 42, 38, 0.06)',
    shadowMedium: 'rgba(45, 42, 38, 0.08)',
    shadowStrong: 'rgba(45, 42, 38, 0.12)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
  },
  typography: {
    heading1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    heading2: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
      letterSpacing: -0.3,
    },
    heading3: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
      letterSpacing: -0.2,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
      letterSpacing: 0,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
      letterSpacing: 0,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
      letterSpacing: 0.2,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 24,
      letterSpacing: -0.2,
    },
    label: {
      fontSize: 13,
      fontWeight: '500' as const,
      lineHeight: 18,
      letterSpacing: 0.1,
    },
  },
  shadows: {
    sm: {
      shadowColor: 'rgba(45, 42, 38, 0.06)',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 2,
    } as ViewStyle,
    md: {
      shadowColor: 'rgba(45, 42, 38, 0.08)',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 4,
    } as ViewStyle,
    lg: {
      shadowColor: 'rgba(45, 42, 38, 0.1)',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 6,
    } as ViewStyle,
    xl: {
      shadowColor: 'rgba(45, 42, 38, 0.12)',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 1,
      shadowRadius: 24,
      elevation: 8,
    } as ViewStyle,
  },
};

export type Theme = typeof theme;

// Animation helpers
export const fadeInUp = {
  initial: { opacity: 0, translateY: 16 },
  animate: { opacity: 1, translateY: 0 },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
};

export const fadeInLeft = {
  initial: { opacity: 0, translateX: -16 },
  animate: { opacity: 1, translateX: 0 },
};

export const fadeInRight = {
  initial: { opacity: 0, translateX: 16 },
  animate: { opacity: 1, translateX: 0 },
};
