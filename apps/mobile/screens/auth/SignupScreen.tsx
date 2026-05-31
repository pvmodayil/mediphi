import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
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
    // Try to open the default email app
    const url = 'mailto:';
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  // If account was created and email confirmation is needed, show success screen
  if (successEmail) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.successIconText}>✓</Text>
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
            <Button
              title="Open Email App"
              onPress={openEmailApp}
            />
            <View style={{ height: 12 }} />
            <Button
              title="I've Confirmed My Email — Go to Login"
              variant="outline"
              onPress={() => navigation.navigate('Login')}
            />
            <View style={{ height: 12 }} />
            <Button
              title="Back to Welcome"
              variant="secondary"
              size="small"
              onPress={() => navigation.navigate('Welcome')}
            />
          </View>

          <Text style={styles.successFooter}>
            Didn't receive the email? Check your spam folder or tap "Go to Login" to resend.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.backLink}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Start your secure medical journey</Text>

        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
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
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {strength.label ? (
            <Text style={[styles.strengthText, { color: strength.color }]}>
              Password strength: {strength.label}
            </Text>
          ) : null}

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Button
            title={loading ? 'Creating account...' : 'Create Account'}
            onPress={handleSignup}
            disabled={loading}
          />
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
  form: {
    gap: theme.spacing.md,
  },
  label: {
    ...theme.typography.bodySmall,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    fontWeight: '500',
  },
  sexOptions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  sexOption: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
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
  strengthText: {
    ...theme.typography.bodySmall,
    fontWeight: '500',
    marginTop: -theme.spacing.sm,
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

  // Success state styles
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
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
  successIconText: {
    fontSize: 40,
    color: theme.colors.sage,
    fontWeight: '700',
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
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    width: '100%',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  emailCardLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  emailCardAddress: {
    ...theme.typography.heading3,
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
