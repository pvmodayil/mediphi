import React, { useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { theme } from '../../theme';
import { Icon, IconName } from './Icon';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'default' | 'small';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: IconName;
  rightIcon?: IconName;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'default',
  disabled = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const backgroundStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
    outline: styles.outline,
    danger: styles.danger,
    ghost: styles.ghost,
  }[variant];

  const textStyles = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    outline: styles.outlineText,
    danger: styles.dangerText,
    ghost: styles.ghostText,
  }[variant];

  const iconColor = {
    primary: theme.colors.white,
    secondary: theme.colors.accent,
    outline: theme.colors.accent,
    danger: theme.colors.error,
    ghost: theme.colors.textSecondary,
  }[variant];

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.base,
          size === 'small' && styles.small,
          backgroundStyles,
          disabled && styles.disabled,
          pressed && !disabled && styles.pressed,
          style,
        ]}
      >
        {leftIcon && (
          <Icon name={leftIcon} size={18} color={iconColor} strokeWidth={2} />
        )}
        <Text style={[styles.text, size === 'small' && styles.smallText, textStyles, disabled && styles.disabledText, textStyle]}>
          {title}
        </Text>
        {rightIcon && (
          <Icon name={rightIcon} size={18} color={iconColor} strokeWidth={2} />
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    minHeight: 56,
    width: '100%',
  },
  small: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 44,
    borderRadius: theme.borderRadius.md,
  },
  primary: {
    backgroundColor: theme.colors.accent,
    ...theme.shadows.md,
  },
  secondary: {
    backgroundColor: theme.colors.accentLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.accent,
  },
  danger: {
    backgroundColor: theme.colors.errorLight,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.92,
  },
  text: {
    ...theme.typography.button,
  },
  smallText: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryText: {
    color: theme.colors.white,
  },
  secondaryText: {
    color: theme.colors.accent,
  },
  outlineText: {
    color: theme.colors.accent,
  },
  dangerText: {
    color: theme.colors.error,
  },
  ghostText: {
    color: theme.colors.textSecondary,
  },
  disabledText: {
    color: theme.colors.textSecondary,
  },
});
