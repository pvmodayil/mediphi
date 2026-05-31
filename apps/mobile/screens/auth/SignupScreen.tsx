import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Linking, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStackNavigator';

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Signup'>;
};

const SEX_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export function SignupScreen({ navigation }: SignupScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successEmail, setSuccessEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const getPasswordStrength = (pass: string): { label: string; color: string } => {
    if (pass.length === 0) return { label: '', color: '' };
    if (pass.length < 6) return { label: 'Weak', color: theme.colors.error };
    if (pass.length < 10) return { label: 'Fair', color: '#D4A55E' };
    return { label: 'Strong', color: theme.colors.sage };
  };

  const strength = getPasswordStrength(password);

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    const { error: signUpError, requiresEmailConfirmation } = await signUp(email, password, fullName, dateOfBirth, sex, phone);

    if (signUpError) {
      setError(signUpError.message || 'Failed to create account');
    } else if (requiresEmailConfirmation) {
      setSuccessEmail(email);
    }

    setLoading(false);
  };

  const openEmailApp = async () => {
    const url = 'mailto:';
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  if (successEmail) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.successScroll}>
          <View style={styles.successIcon}>
            <Icon name="check" size={36} color={theme.colors.sage} strokeWidth={2.5} />
          </View>

          <Text style={styles.successTitle}>Account Created!</Text>
          <Text style={styles.successSubtitle}>
            Welcome to MediPhi, {fullName.split(' ')[0]}.
          </Text>

          <View style={styles.emailCard}>
            <Text style={styles.emailCardLabel}>We've sent a confirmation email to:</Text>
            <Text style={styles.emailCardAddress}>{successEmail}</Text>
            <Text style={styles.emailCardHint}>
              Tap the link in the email to activate your account. Once confirmed, you can log in and access your medical vault.
            </Text>
          </View>

          <View style={styles.successActions}>
            <Button title="Open Email App" onPress={openEmailApp} />
            <View style={{ height: 12 }} />
            <Button
              title="I've Confirmed My Email"
              variant="outline"
              onPress={() => navigation.navigate('Login')}
            />
            <View style={{ height: 12 }} />
            <Button
              title="Back to Welcome"
              variant="ghost"
              size="small"
              onPress={() => navigation.navigate('Welcome')}
            />
          </View>

          <Text style={styles.successFooter}>
            Didn't receive the email? Check your spam folder or tap "Go to Login" to resend.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start your secure medical journey</Text>

          {error ? (
            <View style={styles.errorBanner}>
              <View style={styles.bannerRow}>
                <Icon name="x" size={18} color={theme.colors.error} strokeWidth={2} />
                <Text style={styles.errorBannerText}>{error}</Text>
              </View>
            </View>
          ) : null}

          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              leftIcon="user"
            />

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
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              leftIcon="calendar"
            />

            <Text style={styles.label}>Sex</Text>
            <View style={styles.sexOptions}>
              {SEX_OPTIONS.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => setSex(option.value)}
                  style={[
                    styles.sexOption,
                    sex === option.value && styles.sexOptionActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.sexOptionText,
                      sex === option.value && styles.sexOptionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Input
              label="Phone (optional)"
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              leftIcon="smartphone"
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {strength.label ? (
              <View style={styles.strengthRow}>
                <View style={styles.strengthTrack}>
                  <View
                    style={[
                      styles.strengthFill,
                      {
                        width:
                          strength.label === 'Weak'
                            ? '33%'
                            : strength.label === 'Fair'
                            ? '66%'
                            : '100%',
                        backgroundColor: strength.color,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.strengthText, { color: strength.color }]}>
                  {strength.label}
                </Text>
              </View>
            ) : null}

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <View style={{ marginTop: theme.spacing.sm }}>
              <Button
                title={loading ? 'Creating account...' : 'Create Account'}
                onPress={handleSignup}
                disabled={loading}
              />
            </View>
          </View>

          <Text style={styles.terms}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Log In</Text>
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
  errorBanner: {
    backgroundColor: theme.colors.errorLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(214, 87, 87, 0.15)',
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  errorBannerText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    flex: 1,
  },
  form: {
    gap: theme.spacing.sm,
  },
  label: {
    ...theme.typography.label,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  sexOptions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  sexOption: {
    flex: 1,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  sexOptionActive: {
    backgroundColor: theme.colors.accentLight,
    borderColor: theme.colors.accent,
  },
  sexOptionText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  sexOptionTextActive: {
    color: theme.colors.accent,
    fontWeight: '600',
  },
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: -theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  strengthTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.border,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    ...theme.typography.caption,
    fontWeight: '600',
  },
  terms: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
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

  // Success state
  successScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxxl,
    backgroundColor: theme.colors.warmBg,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.sageLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  successTitle: {
    ...theme.typography.heading1,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  successSubtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  emailCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  emailCardLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  emailCardAddress: {
    ...theme.typography.heading2,
    color: theme.colors.accent,
    marginBottom: theme.spacing.md,
  },
  emailCardHint: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  successActions: {
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  successFooter: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
