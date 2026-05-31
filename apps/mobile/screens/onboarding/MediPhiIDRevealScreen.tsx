import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Pressable, Clipboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { theme } from '../../theme';

export function MediPhiIDRevealScreen() {
  const { completeOnboarding } = useAuth();
  const { profile, loading } = useProfile();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCopy = () => {
    if (profile?.mediphi_id) {
      Clipboard.setString(profile.mediphi_id);
    }
  };

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
            <Text style={styles.icon}>🎉</Text>
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
              <Text style={styles.copyButtonText}>📋 Copy to Clipboard</Text>
            </Pressable>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              • Share this ID with hospitals{'\n'}
              • Scan hospital QR codes to link{'\n'}
              • Control who sees your data
            </Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue to Dashboard"
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
    paddingHorizontal: theme.spacing.xl,
  },
  revealContainer: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  icon: {
    fontSize: 40,
  },
  congratsText: {
    ...theme.typography.heading1,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  idCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: theme.colors.accent,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  idLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  idValue: {
    fontSize: 36,
    fontWeight: '700',
    color: theme.colors.accent,
    marginBottom: theme.spacing.md,
  },
  copyButton: {
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
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.sageLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    width: '100%',
  },
  infoText: {
    ...theme.typography.body,
    color: theme.colors.sage,
    lineHeight: 28,
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
    width: '100%',
  },
});
