import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { Icon } from '../../components/common/Icon';
import { useMedicalRecords } from '../../hooks/useMedicalRecords';
import { theme } from '../../theme';
import { formatDateTime } from '../../utils/formatters';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RecordsStackParamList } from '../../navigation/RecordsStackNavigator';
import { RouteProp } from '@react-navigation/native';

type RecordDetailScreenProps = {
  navigation: NativeStackNavigationProp<RecordsStackParamList, 'RecordDetail'>;
  route: RouteProp<RecordsStackParamList, 'RecordDetail'>;
};

export function RecordDetailScreen({ navigation, route }: RecordDetailScreenProps) {
  const { recordId } = route.params;
  const { records, loading } = useMedicalRecords();

  const record = records.find((r) => r.id === recordId);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!record) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Record not found</Text>
      </SafeAreaView>
    );
  }

  const renderFHIRData = (data: Record<string, unknown>, prefix = ''): React.ReactNode[] => {
    const nodes: React.ReactNode[] = [];
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      if (typeof value === 'object' && !Array.isArray(value)) {
        nodes.push(
          <View key={prefix + key} style={styles.nestedSection}>
            <Text style={styles.nestedTitle}>{formatKey(key)}</Text>
            {renderFHIRData(value as Record<string, unknown>, prefix + key + '.')}
          </View>
        );
      } else if (Array.isArray(value)) {
        nodes.push(
          <View key={prefix + key} style={styles.row}>
            <Text style={styles.label}>{formatKey(key)}</Text>
            <Text style={styles.value}>{value.length} items</Text>
          </View>
        );
      } else {
        nodes.push(
          <View key={prefix + key} style={styles.row}>
            <Text style={styles.label}>{formatKey(key)}</Text>
            <Text style={styles.value}>{String(value)}</Text>
          </View>
        );
      }
    });
    return nodes;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backLink}>
          <Icon name="chevron-left" size={18} color={theme.colors.textSecondary} strokeWidth={2} />
          <Text style={styles.backLinkText}>Back</Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.typeBadge}>
            <Icon name="file-text" size={14} color={theme.colors.accent} strokeWidth={2} />
            <Text style={styles.typeBadgeText}>{record.fhir_resource_type}</Text>
          </View>
          <Text style={styles.dateText}>
            Recorded: {formatDateTime(record.recorded_at)}
          </Text>
        </View>

        <Card variant="elevated">
          <View style={styles.cardHeader}>
            <Icon name="activity" size={18} color={theme.colors.accent} strokeWidth={1.8} />
            <Text style={styles.sectionTitle}>FHIR Data</Text>
          </View>
          {renderFHIRData(record.fhir_data)}
        </Card>

        <Card style={styles.metaCard} variant="elevated">
          <View style={styles.cardHeader}>
            <Icon name="settings" size={18} color={theme.colors.accent} strokeWidth={1.8} />
            <Text style={styles.sectionTitle}>Metadata</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Source</Text>
            <Text style={styles.value}>{record.source_type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Created</Text>
            <Text style={styles.value}>{formatDateTime(record.created_at)}</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.warmBg,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.huge,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.accentLight,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  typeBadgeText: {
    ...theme.typography.bodySmall,
    color: theme.colors.accent,
    fontWeight: '600',
  },
  dateText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.heading3,
    color: theme.colors.textPrimary,
  },
  metaCard: {
    marginBottom: theme.spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  label: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  value: {
    ...theme.typography.bodySmall,
    color: theme.colors.textPrimary,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  nestedSection: {
    marginTop: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: theme.colors.border,
  },
  nestedTitle: {
    ...theme.typography.body,
    color: theme.colors.accent,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  backLinkText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});
