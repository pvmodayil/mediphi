import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStackNavigator';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { signIn, resendConfirmationEmail } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');
    setInfo('');

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      const msg = signInError.message || 'Invalid email or password';
      setError(msg);
    }

    setLoading(false);
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    setResendLoading(true);
    setError('');

    const { error } = await resendConfirmationEmail(email);

    if (error) {
      setError(error.message || 'Failed to resend email');
    } else {
      setInfo('Confirmation email resent! Please check your inbox.');
    }

    setResendLoading(false);
  };

  const isEmailNotConfirmed = error.toLowerCase().includes('email not confirmed') ||
    error.toLowerCase().includes('not confirmed');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.backLink}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to access your medical vault</Text>

        {error ? (
          <View style={[styles.errorBanner, isEmailNotConfirmed && styles.warningBanner]}>
            <Text style={[styles.errorBannerText, isEmailNotConfirmed && styles.warningBannerText]}>
              {error}
            </Text>
            {isEmailNotConfirmed && (
              <View style={{ marginTop: 12 }}>
                <Button
                  title={resendLoading ? 'Resending...' : 'Resend Confirmation Email'}
                  variant="outline"
                  size="small"
                  onPress={handleResendConfirmation}
                  disabled={resendLoading}
                />
              </View>
            )}
          </View>
        ) : null}

        {info ? (
          <View style={styles.infoBanner}>
            <Text style={styles.infoBannerText}>{info}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title={loading ? 'Logging in...' : 'Log In'}
            onPress={handleLogin}
            disabled={loading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.warmBg,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.xl,
  },
  backLink: {
    ...theme.typography.body,
    color: theme.colors.accent,
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.heading1,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  errorBanner: {
    backgroundColor: theme.colors.errorLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  errorBannerText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
  },
  warningBanner: {
    backgroundColor: theme.colors.accentLight,
  },
  warningBannerText: {
    color: theme.colors.accent,
  },
  infoBanner: {
    backgroundColor: theme.colors.sageLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  infoBannerText: {
    ...theme.typography.body,
    color: theme.colors.sage,
    fontWeight: '500',
  },
  form: {
    gap: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    gap: theme.spacing.xs,
  },
  footerText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  footerLink: {
    ...theme.typography.body,
    color: theme.colors.accent,
    fontWeight: '600',
  },
});
