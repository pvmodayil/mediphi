import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { Icon } from '../../components/common/Icon';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { useMedicalRecords } from '../../hooks/useMedicalRecords';
import { theme } from '../../theme';
import { formatDate, getInitials } from '../../utils/formatters';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RecordsStackParamList } from '../../navigation/RecordsStackNavigator';

export function HomeScreen() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const { records, loading, error } = useMedicalRecords();
  const navigation = useNavigation<NativeStackNavigationProp<RecordsStackParamList>>();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const firstName = profile?.full_name?.split(' ')[0] || 'Patient';
  const totalRecords = records.length;
  const labRecords = records.filter((r) => r.fhir_resource_type === 'Observation').length;
  const latestRecord = records[0];

  const vaultRows = [
    { icon: 'flask' as const, label: 'Lab Results', count: `${labRecords} records` },
    { icon: 'stethoscope' as const, label: 'Hospitals', count: '0 linked' },
    { icon: 'shield' as const, label: 'Shared Access', count: '0 active' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => {}} tintColor={theme.colors.accent} />}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(profile?.full_name || 'P')}</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Hello, {firstName}</Text>
              <Text style={styles.subGreeting}>{profile?.mediphi_id || 'MPH-XXXXXX'}</Text>
            </View>
          </View>

          <View style={styles.vaultCard}>
            <View style={styles.vaultHeader}>
              <View>
                <Text style={styles.vaultLabel}>Your Vault</Text>
                <Text style={styles.vaultId}>{profile?.mediphi_id || 'MPH-XXXXXX'}</Text>
              </View>
              <View style={styles.vaultIcon}>
                <Icon name="lock" size={20} color={theme.colors.accent} strokeWidth={1.8} />
              </View>
            </View>

            <View style={styles.vaultDivider} />

            {vaultRows.map((row, index) => (
              <View key={index} style={styles.vaultRow}>
                <View style={styles.vaultRowIcon}>
                  <Icon name={row.icon} size={18} color={theme.colors.accent} strokeWidth={1.8} />
                </View>
                <View style={styles.vaultRowText}>
                  <Text style={styles.vaultRowLabel}>{row.label}</Text>
                  <Text style={styles.vaultRowCount}>{row.count}</Text>
                </View>
                <Icon name="chevron-right" size={16} color={theme.colors.textSecondary} strokeWidth={2} />
              </View>
            ))}
          </View>

          <View style={styles.statsGrid}>
            <Card style={styles.statCard} variant="outlined">
              <Text style={styles.statValue}>{totalRecords}</Text>
              <Text style={styles.statLabel}>Total Records</Text>
            </Card>
            <Card style={styles.statCard} variant="outlined">
              <Text style={styles.statValue}>{labRecords}</Text>
              <Text style={styles.statLabel}>Lab Results</Text>
            </Card>
            <Card style={styles.statCard} variant="outlined">
              <Text style={styles.statValueSmall}>
                {latestRecord ? formatDate(latestRecord.recorded_at) : 'N/A'}
              </Text>
              <Text style={styles.statLabel}>Last Updated</Text>
            </Card>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Records</Text>
            <Button
              title="View All"
              variant="outline"
              size="small"
              onPress={() => navigation.navigate('RecordsList')}
            />
          </View>

          {records.length === 0 && !loading ? (
            <EmptyState
              title="No records yet"
              subtitle="Your medical records will appear here when hospitals share them with you."
            />
          ) : (
            <View style={styles.recentList}>
              {records.slice(0, 3).map((record, index) => (
                <Card key={record.id} style={styles.recordCard} variant="elevated">
                  <View style={styles.recordRow}>
                    <View style={styles.recordIcon}>
                      <Icon
                        name={getRecordIconName(record.fhir_resource_type)}
                        size={20}
                        color={theme.colors.accent}
                        strokeWidth={1.8}
                      />
                    </View>
                    <View style={styles.recordInfo}>
                      <Text style={styles.recordType}>{record.fhir_resource_type}</Text>
                      <Text style={styles.recordDate}>{formatDate(record.recorded_at)}</Text>
                    </View>
                    <Icon name="chevron-right" size={16} color={theme.colors.textSecondary} strokeWidth={2} />
                  </View>
                </Card>
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getRecordIconName(type: string): 'flask' | 'stethoscope' | 'pill' | 'syringe' | 'clipboard' | 'file-text' {
  switch (type) {
    case 'Observation': return 'flask';
    case 'Condition': return 'stethoscope';
    case 'MedicationStatement': return 'pill';
    case 'Immunization': return 'syringe';
    case 'DiagnosticReport': return 'clipboard';
    default: return 'file-text';
  }
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  avatarText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    ...theme.typography.heading2,
    color: theme.colors.textPrimary,
  },
  subGreeting: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  vaultCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.md,
  },
  vaultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: theme.spacing.lg,
  },
  vaultLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  vaultId: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  vaultIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vaultDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  vaultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  vaultRowIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  vaultRowText: {
    flex: 1,
  },
  vaultRowLabel: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  vaultRowCount: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.accent,
    marginBottom: theme.spacing.xs,
    letterSpacing: -0.5,
  },
  statValueSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.accent,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.textPrimary,
  },
  recentList: {
    gap: theme.spacing.md,
  },
  recordCard: {
    padding: theme.spacing.md,
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  recordInfo: {
    flex: 1,
  },
  recordType: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  recordDate: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
});
