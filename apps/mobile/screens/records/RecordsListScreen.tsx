import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  RefreshControl,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { Icon } from '../../components/common/Icon';
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

const CATEGORY_ICONS: Record<string, 'flask' | 'stethoscope' | 'pill' | 'syringe' | 'clipboard' | 'file-text'> = {
  All: 'file-text',
  Observation: 'flask',
  Condition: 'stethoscope',
  MedicationStatement: 'pill',
  Immunization: 'syringe',
  DiagnosticReport: 'clipboard',
};

type RecordsListScreenProps = {
  navigation: NativeStackNavigationProp<RecordsStackParamList, 'RecordsList'>;
};

export function RecordsListScreen({ navigation }: RecordsListScreenProps) {
  const { records, loading } = useMedicalRecords();
  const [activeCategory, setActiveCategory] = useState('All');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

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
            <Icon
              name={CATEGORY_ICONS[category]}
              size={14}
              color={activeCategory === category ? theme.colors.white : theme.colors.textSecondary}
              strokeWidth={1.8}
            />
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
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => {}} tintColor={theme.colors.accent} />}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {filteredRecords.length === 0 && !loading ? (
            <EmptyState
              title="No records found"
              subtitle={`You don't have any ${CATEGORY_LABELS[activeCategory].toLowerCase()} yet.`}
            />
          ) : (
            <View style={styles.recordsList}>
              {filteredRecords.map((record, index) => (
                <Pressable
                  key={record.id}
                  onPress={() =>
                    navigation.navigate('RecordDetail', { recordId: record.id })
                  }
                >
                  <Card style={styles.recordCard} variant="elevated">
                    <View style={styles.recordRow}>
                      <View style={styles.recordIcon}>
                        <Icon
                          name={CATEGORY_ICONS[record.fhir_resource_type] || 'file-text'}
                          size={20}
                          color={theme.colors.accent}
                          strokeWidth={1.8}
                        />
                      </View>
                      <View style={styles.recordInfo}>
                        <Text style={styles.recordType}>
                          {record.fhir_resource_type}
                        </Text>
                        <Text style={styles.recordDate}>
                          {formatDate(record.recorded_at)}
                        </Text>
                      </View>
                      <Icon name="chevron-right" size={18} color={theme.colors.textSecondary} strokeWidth={2} />
                    </View>
                  </Card>
                </Pressable>
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
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
    maxHeight: 56,
  },
  categoryScroll: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
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
    ...theme.shadows.sm,
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
