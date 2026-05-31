import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import { theme } from '../../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStackNavigator';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;
};

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const features = [
    { icon: 'shield' as const, title: 'Secure FHIR R4 Vault', desc: 'End-to-end encrypted health records' },
    { icon: 'qr' as const, title: 'One QR Code, Any Hospital', desc: 'Instant record access anywhere' },
    { icon: 'lock' as const, title: 'You Control Who Sees What', desc: 'Granular sharing permissions' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Icon name="logo" size={32} color={theme.colors.white} strokeWidth={1.8} />
            </View>
          </View>

          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>Your medical identity, simplified</Text>
          </View>

          <Text style={styles.title}>
            Your health records,{' '}
            <Text style={styles.titleAccent}>always with you.</Text>
          </Text>
          <Text style={styles.tagline}>
            One identity across every hospital. Walk in, scan your QR code, and your entire medical history is instantly available.
          </Text>
        </View>

        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Icon name={feature.icon} size={20} color={theme.colors.accent} strokeWidth={1.8} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.View>

      <View style={styles.buttons}>
        <Button
          title="Create your vault"
          rightIcon="arrow-right"
          onPress={() => navigation.navigate('Signup')}
        />
        <View style={styles.spacer} />
        <Button
          title="Sign in"
          variant="outline"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.warmBg,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xxxl,
    paddingTop: theme.spacing.huge,
  },
  topSection: {
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xxxl,
  },
  logoContainer: {
    marginBottom: theme.spacing.xl,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.accentLight,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
    alignSelf: 'flex-start',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.accent,
  },
  badgeText: {
    ...theme.typography.bodySmall,
    color: theme.colors.accent,
    fontWeight: '500',
  },
  title: {
    ...theme.typography.heading1,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    lineHeight: 42,
  },
  titleAccent: {
    color: theme.colors.accent,
  },
  tagline: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 26,
  },
  features: {
    gap: theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  featureDesc: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  buttons: {
    paddingHorizontal: theme.spacing.xxxl,
    paddingBottom: theme.spacing.huge,
    paddingTop: theme.spacing.lg,
  },
  spacer: {
    height: theme.spacing.md,
  },
});
