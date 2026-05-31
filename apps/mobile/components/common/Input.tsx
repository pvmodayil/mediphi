import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  Pressable,
  Animated,
} from 'react-native';
import { theme } from '../../theme';
import { Icon, IconName } from './Icon';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: object;
  leftIcon?: IconName;
}

export function Input({
  label,
  error,
  secureTextEntry,
  containerStyle,
  style,
  leftIcon,
  ...textInputProps
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = secureTextEntry;

  const borderColorAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderColorAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    if (textInputProps.onFocus) textInputProps.onFocus({} as any);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderColorAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    if (textInputProps.onBlur) textInputProps.onBlur({} as any);
  };

  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [error ? theme.colors.error : theme.colors.border, error ? theme.colors.error : theme.colors.accent],
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View
        style={[
          styles.inputContainer,
          error && styles.inputError,
          { borderColor },
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            <Icon
              name={leftIcon}
              size={18}
              color={isFocused ? theme.colors.accent : theme.colors.textSecondary}
              strokeWidth={1.8}
            />
          </View>
        )}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...textInputProps}
        />
        {isPassword && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.visibilityToggle}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={18}
              color={theme.colors.textSecondary}
              strokeWidth={1.8}
            />
          </Pressable>
        )}
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...theme.typography.label,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    minHeight: 56,
    paddingHorizontal: theme.spacing.lg,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    paddingVertical: theme.spacing.sm,
  },
  visibilityToggle: {
    paddingLeft: theme.spacing.sm,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
});
