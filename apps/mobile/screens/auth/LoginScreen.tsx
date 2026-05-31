import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Icon } from '../../components/common/Icon';
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

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

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
        <Pressable onPress={() => navigation.navigate('Welcome')} style={styles.backLink}>
          <Icon name="chevron-left" size={16} color={theme.colors.accent} strokeWidth={2} />
          <Text style={styles.backLinkText}>Back</Text>
        </Pressable>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to access your medical vault</Text>

          {error ? (
            <View style={[styles.banner, isEmailNotConfirmed && styles.warningBanner]}>
              <View style={styles.bannerRow}>
                <Icon
                  name={isEmailNotConfirmed ? 'info' : 'x'}
                  size={18}
                  color={isEmailNotConfirmed ? theme.colors.accent : theme.colors.error}
                  strokeWidth={2}
                />
                <Text style={[styles.bannerText, isEmailNotConfirmed && styles.warningBannerText]}>
                  {error}
                </Text>
              </View>
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
              <View style={styles.bannerRow}>
                <Icon name="check" size={18} color={theme.colors.sage} strokeWidth={2} />
                <Text style={styles.infoBannerText}>{info}</Text>
              </View>
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
              leftIcon="mail"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={{ marginTop: theme.spacing.sm }}>
              <Button
                title={loading ? 'Logging in...' : 'Log In'}
                onPress={handleLogin}
                disabled={loading}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </Pressable>
          </View>
        </Animated.View>
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
    padding: theme.spacing.xxxl,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xl,
  },
  backLinkText: {
    ...theme.typography.body,
    color: theme.colors.accent,
    fontWeight: '500',
  },
  title: {
    ...theme.typography.heading1,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xxl,
  },
  banner: {
    backgroundColor: theme.colors.errorLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(214, 87, 87, 0.15)',
  },
  warningBanner: {
    backgroundColor: theme.colors.accentLight,
    borderColor: 'rgba(212, 135, 94, 0.15)',
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  bannerText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    flex: 1,
  },
  warningBannerText: {
    color: theme.colors.accent,
  },
  infoBanner: {
    backgroundColor: theme.colors.sageLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(122, 155, 138, 0.15)',
  },
  infoBannerText: {
    ...theme.typography.bodySmall,
    color: theme.colors.sage,
    fontWeight: '500',
    flex: 1,
  },
  form: {
    gap: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
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
