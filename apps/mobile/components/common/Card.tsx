import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  const variantStyles = {
    default: styles.default,
    elevated: styles.elevated,
    outlined: styles.outlined,
  }[variant];

  return <View style={[styles.base, variantStyles, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
  },
  default: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  elevated: {
    ...theme.shadows.lg,
  },
  outlined: {
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
});
