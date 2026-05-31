import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { theme } from '../../theme';
import { formatDate, getInitials, calculateAge } from '../../utils/formatters';

export function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { profile, loading } = useProfile();

  const handleSignOut = async () => {
    await signOut();
  };

  const infoRows = [
    { label: 'Email', value: profile?.email || 'Not set', icon: 'mail' as const },
    { label: 'Phone', value: profile?.phone || 'Not set', icon: 'smartphone' as const },
    {
      label: 'Date of Birth',
      value: profile?.date_of_birth
        ? `${formatDate(profile.date_of_birth)} (${calculateAge(profile.date_of_birth)} yrs)`
        : 'Not set',
      icon: 'calendar' as const,
    },
    {
      label: 'Sex',
      value: profile?.sex ? profile.sex.charAt(0).toUpperCase() + profile.sex.slice(1) : 'Not set',
      icon: 'user' as const,
    },
    {
      label: 'Member Since',
      value: profile?.created_at ? formatDate(profile.created_at) : 'N/A',
      icon: 'shield' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.screenTitle}>Profile</Text>

        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitials(profile?.full_name || 'User')}
            </Text>
          </View>
          <Text style={styles.name}>{profile?.full_name || 'Loading...'}</Text>
          <View style={styles.idBadge}>
            <Text style={styles.mediphiId}>{profile?.mediphi_id || 'MPH-XXXXXX'}</Text>
          </View>
        </View>

        <Card style={styles.infoCard} variant="elevated">
          <Text style={styles.sectionTitle}>Personal Information</Text>

          {infoRows.map((row, index) => (
            <View key={index} style={styles.infoRow}>
              <View style={styles.infoRowLeft}>
                <View style={styles.infoIcon}>
                  <Icon name={row.icon} size={16} color={theme.colors.accent} strokeWidth={1.8} />
                </View>
                <Text style={styles.infoLabel}>{row.label}</Text>
              </View>
              <Text style={styles.infoValue}>{row.value}</Text>
            </View>
          ))}
        </Card>

        <Card style={styles.statsCard} variant="elevated">
          <Text style={styles.sectionTitle}>Vault Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Icon name="stethoscope" size={24} color={theme.colors.accent} strokeWidth={1.5} />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Hospitals Linked</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Icon name="file-text" size={24} color={theme.colors.accent} strokeWidth={1.5} />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Pending Submissions</Text>
            </View>
          </View>
        </Card>

        <View style={styles.signOutSection}>
          <Button
            title="Sign Out"
            variant="danger"
            leftIcon="log-out"
            onPress={handleSignOut}
          />
        </View>

        <Text style={styles.versionText}>MediPhi v1.0.0</Text>
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
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.huge,
  },
  screenTitle: {
    ...theme.typography.heading1,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.white,
  },
  name: {
    ...theme.typography.heading2,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  idBadge: {
    backgroundColor: theme.colors.accentLight,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  mediphiId: {
    ...theme.typography.bodySmall,
    color: theme.colors.accent,
    fontWeight: '600',
  },
  infoCard: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  infoValue: {
    ...theme.typography.bodySmall,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  statsCard: {
    marginBottom: theme.spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.accent,
    letterSpacing: -0.5,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 48,
    backgroundColor: theme.colors.border,
  },
  signOutSection: {
    marginBottom: theme.spacing.lg,
  },
  versionText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
});
