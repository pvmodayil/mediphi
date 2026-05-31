import React from 'react';
import { StyleSheet, Text, View, Pressable, Clipboard, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { theme } from '../../theme';
import { Icon } from '../../components/common/Icon';

export function MyQRCodeScreen() {
  const { user } = useAuth();
  const { profile } = useProfile();

  const qrPayload = JSON.stringify({
    mediphi_id: profile?.mediphi_id || 'MPH-XXXXXX',
    name: profile?.full_name || 'MediPhi User',
  });

  const handleCopy = () => {
    if (profile?.mediphi_id) {
      Clipboard.setString(profile.mediphi_id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your MediPhi QR Code</Text>
        <Text style={styles.subtitle}>
          Show this to hospital staff for instant record access
        </Text>

        <View style={styles.qrContainer}>
          <QRCode
            value={qrPayload}
            size={220}
            backgroundColor="white"
            color={theme.colors.textPrimary}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.nameText}>{profile?.full_name || 'Loading...'}</Text>
          <Pressable onPress={handleCopy} style={styles.idRow}>
            <Text style={styles.idText}>{profile?.mediphi_id || 'MPH-XXXXXX'}</Text>
            <Icon name="copy" size={16} color={theme.colors.accent} strokeWidth={2} />
          </Pressable>
        </View>

        <View style={styles.instructions}>
          <View style={styles.instructionHeader}>
            <Icon name="info" size={18} color={theme.colors.sage} strokeWidth={2} />
            <Text style={styles.instructionTitle}>How it works</Text>
          </View>
          <Text style={styles.instructionText}>
            Hospitals can scan this code to request access to your medical records. You control what they see and for how long.
          </Text>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xxxl,
  },
  title: {
    ...theme.typography.heading2,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  qrContainer: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xxl,
    ...theme.shadows.lg,
    marginBottom: theme.spacing.xl,
  },
  infoCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  nameText: {
    ...theme.typography.heading3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.accentLight,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  idText: {
    ...theme.typography.body,
    color: theme.colors.accent,
    fontWeight: '600',
  },
  instructions: {
    backgroundColor: theme.colors.sageLight,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(122, 155, 138, 0.15)',
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  instructionTitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.sage,
    fontWeight: '600',
  },
  instructionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.sage,
    lineHeight: 22,
  },
});
