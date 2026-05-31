import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { useMedicalRecords } from '../../hooks/useMedicalRecords';
import { theme } from '../../theme';
import { formatDate } from '../../utils/formatters';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RecordsStackParamList } from '../../navigation/RecordsStackNavigator';

const FHIR_CATEGORIES = ['All', 'Observation', 'Condition', 'MedicationStatement', 'Immunization', 'DiagnosticReport'];
const CATEGORY_LABELS: Record<string, string> = {
  All: 'All',
  Observation: 'Lab Results',
  Condition: 'Diagnoses',
  MedicationStatement: 'Medications',
  Immunization: 'Vaccinations',
  DiagnosticReport: 'Reports',
};

type RecordsListScreenProps = {
  navigation: NativeStackNavigationProp<RecordsStackParamList, 'RecordsList'>;
};

export function RecordsListScreen({ navigation }: RecordsListScreenProps) {
  const { records, loading } = useMedicalRecords();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredRecords =
    activeCategory === 'All'
      ? records
      : records.filter((r) => r.fhir_resource_type === activeCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medical Records</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
        style={styles.categoryContainer}
      >
        {FHIR_CATEGORIES.map((category) => (
          <Pressable
            key={category}
            onPress={() => setActiveCategory(category)}
            style={[
              styles.categoryPill,
              activeCategory === category && styles.categoryPillActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && styles.categoryTextActive,
              ]}
            >
              {CATEGORY_LABELS[category]}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => {}} />}
      >
        {filteredRecords.length === 0 && !loading ? (
          <EmptyState
            title="No records found"
            subtitle={`You don't have any ${CATEGORY_LABELS[activeCategory].toLowerCase()} yet.`}
          />
        ) : (
          <View style={styles.recordsList}>
            {filteredRecords.map((record) => (
              <Pressable
                key={record.id}
                onPress={() =>
                  navigation.navigate('RecordDetail', { recordId: record.id })
                }
              >
                <Card style={styles.recordCard}>
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
                    <Text style={styles.chevron}>›</Text>
                  </View>
                </Card>
              </Pressable>
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
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.heading1,
    color: theme.colors.textPrimary,
  },
  categoryContainer: {
    maxHeight: 60,
  },
  categoryScroll: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  categoryPill: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
  categoryPillActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  categoryText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: theme.colors.white,
  },
  listContent: {
    padding: theme.spacing.lg,
    flexGrow: 1,
  },
  recordsList: {
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
  chevron: {
    fontSize: 24,
    color: theme.colors.textSecondary,
    fontWeight: '300',
  },
});
