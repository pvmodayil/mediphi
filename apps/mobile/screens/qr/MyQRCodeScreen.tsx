import React from 'react';
import { StyleSheet, Text, View, Clipboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { theme } from '../../theme';

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
            size={240}
            backgroundColor="white"
            color={theme.colors.textPrimary}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.nameText}>{profile?.full_name || 'Loading...'}</Text>
          <Text style={styles.idText} onPress={handleCopy}>
            {profile?.mediphi_id || 'MPH-XXXXXX'} 📋
          </Text>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            Hospitals can scan this code to request access to your medical records.
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
    padding: theme.spacing.xl,
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
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
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
  idText: {
    ...theme.typography.body,
    color: theme.colors.accent,
    fontWeight: '600',
  },
  instructions: {
    backgroundColor: theme.colors.sageLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    width: '100%',
  },
  instructionText: {
    ...theme.typography.bodySmall,
    color: theme.colors.sage,
    textAlign: 'center',
    lineHeight: 22,
  },
});
