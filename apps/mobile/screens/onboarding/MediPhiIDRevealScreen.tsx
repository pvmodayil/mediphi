import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Pressable, Clipboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { theme } from '../../theme';

export function MediPhiIDRevealScreen() {
  const { completeOnboarding } = useAuth();
  const { profile, loading } = useProfile();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCopy = () => {
    if (profile?.mediphi_id) {
      Clipboard.setString(profile.mediphi_id);
    }
  };

  const infoItems = [
    { icon: 'stethoscope' as const, text: 'Share this ID with hospitals' },
    { icon: 'qr' as const, text: 'Scan hospital QR codes to link' },
    { icon: 'shield' as const, text: 'Control who sees your data' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.revealContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.iconContainer}>
            <Icon name="logo" size={32} color={theme.colors.accent} strokeWidth={1.8} />
          </View>

          <Text style={styles.congratsText}>Welcome to MediPhi!</Text>
          <Text style={styles.description}>
            This is your unique medical identity. Keep it safe — hospitals will use it to access your records.
          </Text>

          <View style={styles.idCard}>
            <Text style={styles.idLabel}>Your MediPhi ID</Text>
            <Text style={styles.idValue}>
              {loading ? 'Generating...' : profile?.mediphi_id || 'MPH-XXXXXX'}
            </Text>
            <Pressable onPress={handleCopy} style={styles.copyButton}>
              <Icon name="copy" size={16} color={theme.colors.accent} strokeWidth={2} />
              <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
            </Pressable>
          </View>

          <View style={styles.infoBox}>
            {infoItems.map((item, index) => (
              <View key={index} style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Icon name={item.icon} size={16} color={theme.colors.sage} strokeWidth={1.8} />
                </View>
                <Text style={styles.infoText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue to Dashboard"
          rightIcon="arrow-right"
          onPress={completeOnboarding}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xxxl,
  },
  revealContainer: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  congratsText: {
    ...theme.typography.heading1,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  idCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: theme.colors.accent,
    ...theme.shadows.lg,
    marginBottom: theme.spacing.xl,
  },
  idLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
    fontWeight: '600',
  },
  idValue: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.accent,
    marginBottom: theme.spacing.md,
    letterSpacing: -0.5,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.accentLight,
    borderRadius: theme.borderRadius.md,
  },
  copyButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.accent,
    fontWeight: '600',
  },
  infoBox: {
    width: '100%',
    gap: theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: theme.colors.sageLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.sage,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: theme.spacing.xxxl,
    paddingBottom: theme.spacing.huge,
    width: '100%',
  },
});
