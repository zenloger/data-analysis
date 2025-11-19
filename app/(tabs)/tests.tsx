import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '@/lib/supabase';
import { Test } from '@/types/database';
import { FileCheck, Clock, Award, ChevronRight } from 'lucide-react-native';

export default function TestsScreen() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTests();
  }, []);

  async function loadTests() {
    try {
      setLoading(true);
      setError(null);

      const fetchError = false;
      const data = null;

      if (fetchError) throw fetchError;
      setTests(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось загрузить тесты'
      );
    } finally {
      setLoading(false);
    }
  }

  function getTestTypeLabel(type: string) {
    return type === 'quiz' ? 'Тест' : 'Контрольная';
  }

  function getTestTypeColor(type: string) {
    return type === 'quiz' ? '#3b82f6' : '#8b5cf6';
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Загрузка тестов...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadTests}>
          <Text style={styles.retryButtonText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Тесты и контрольные</Text>
        <Text style={styles.headerSubtitle}>Проверьте свои знания</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {tests.length === 0 ? (
          <View style={styles.emptyState}>
            <FileCheck size={64} color="#d1d5db" />
            <Text style={styles.emptyText}>
              Тесты пока не добавлены.{'\n'}Скоро здесь появятся проверочные
              работы!
            </Text>
          </View>
        ) : (
          tests.map((test) => (
            <TouchableOpacity
              key={test.id}
              style={styles.testCard}
              activeOpacity={0.7}>
              <View style={styles.testHeader}>
                <View
                  style={[
                    styles.testTypeBadge,
                    {
                      backgroundColor: `${getTestTypeColor(test.type)}15`,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.testTypeText,
                      { color: getTestTypeColor(test.type) },
                    ]}>
                    {getTestTypeLabel(test.type)}
                  </Text>
                </View>
              </View>

              <Text style={styles.testTitle}>{test.title}</Text>

              <View style={styles.testMetaRow}>
                <View style={styles.metaItem}>
                  <Clock size={16} color="#6b7280" />
                  <Text style={styles.metaText}>
                    {test.time_limit_minutes} мин
                  </Text>
                </View>

                <View style={styles.metaItem}>
                  <Award size={16} color="#6b7280" />
                  <Text style={styles.metaText}>
                    {test.max_points} баллов
                  </Text>
                </View>
              </View>

              <View style={styles.testFooter}>
                <Text style={styles.startTestText}>Начать тест</Text>
                <ChevronRight size={18} color="#3b82f6" />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6b7280',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  testCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  testTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  testTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  testTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  testMetaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#6b7280',
  },
  testFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  startTestText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
