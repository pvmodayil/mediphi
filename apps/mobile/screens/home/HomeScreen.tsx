import React from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
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

  const firstName = profile?.full_name?.split(' ')[0] || 'Patient';
  const totalRecords = records.length;
  const labRecords = records.filter((r) => r.fhir_resource_type === 'Observation').length;
  const latestRecord = records[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => {}} />}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(profile?.full_name || 'P')}</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Hello, {firstName}</Text>
            <Text style={styles.subGreeting}>
              {profile?.mediphi_id || 'MPH-XXXXXX'}
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{totalRecords}</Text>
            <Text style={styles.statLabel}>Total Records</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{labRecords}</Text>
            <Text style={styles.statLabel}>Lab Results</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>
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
            {records.slice(0, 3).map((record) => (
              <Card key={record.id} style={styles.recordCard}>
                <View style={styles.recordRow}>
                  <View style={styles.recordIcon}>
                    <Text style={styles.recordIconText}>
                      {getRecordIcon(record.fhir_resource_type)}
                    </Text>
                  </View>
                  <View style={styles.recordInfo}>
                    <Text style={styles.recordType}>
                      {record.fhir_resource_type}
                    </Text>
                    <Text style={styles.recordDate}>
                      {formatDate(record.recorded_at)}
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function getRecordIcon(type: string): string {
  switch (type) {
    case 'Observation': return '🔬';
    case 'Condition': return '🩺';
    case 'MedicationStatement': return '💊';
    case 'Immunization': return '💉';
    case 'DiagnosticReport': return '📋';
    default: return '📄';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.warmBg,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  greeting: {
    ...theme.typography.heading2,
    color: theme.colors.textPrimary,
  },
  subGreeting: {
    ...theme.typography.bodySmall,
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
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
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
    borderRadius: 22,
    backgroundColor: theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  recordIconText: {
    fontSize: 20,
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
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
});
