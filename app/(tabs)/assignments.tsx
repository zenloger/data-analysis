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
import { Assignment } from '@/types/database';
import { ClipboardList, Award, ChevronRight } from 'lucide-react-native';

export default function AssignmentsScreen() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAssignments();
  }, []);

  async function loadAssignments() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('assignments')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setAssignments(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось загрузить задания'
      );
    } finally {
      setLoading(false);
    }
  }

  function getDifficultyColor(difficulty: string) {
    switch (difficulty) {
      case 'easy':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'hard':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  }

  function getDifficultyLabel(difficulty: string) {
    switch (difficulty) {
      case 'easy':
        return 'Легко';
      case 'medium':
        return 'Средне';
      case 'hard':
        return 'Сложно';
      default:
        return difficulty;
    }
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Загрузка заданий...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadAssignments}>
          <Text style={styles.retryButtonText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Практические задания</Text>
        <Text style={styles.headerSubtitle}>
          Применяйте знания на практике
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {assignments.length === 0 ? (
          <View style={styles.emptyState}>
            <ClipboardList size={64} color="#d1d5db" />
            <Text style={styles.emptyText}>
              Задания пока не добавлены.{'\n'}Скоро здесь появятся практические
              упражнения!
            </Text>
          </View>
        ) : (
          assignments.map((assignment) => (
            <TouchableOpacity
              key={assignment.id}
              style={styles.assignmentCard}
              activeOpacity={0.7}>
              <View style={styles.assignmentHeader}>
                <View
                  style={[
                    styles.difficultyBadge,
                    {
                      backgroundColor: `${getDifficultyColor(assignment.difficulty)}15`,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(assignment.difficulty) },
                    ]}>
                    {getDifficultyLabel(assignment.difficulty)}
                  </Text>
                </View>

                <View style={styles.pointsContainer}>
                  <Award
                    size={16}
                    color={getDifficultyColor(assignment.difficulty)}
                  />
                  <Text style={styles.pointsText}>
                    {assignment.max_points} баллов
                  </Text>
                </View>
              </View>

              <Text style={styles.assignmentTitle}>{assignment.title}</Text>
              <Text
                style={styles.assignmentDescription}
                numberOfLines={3}
                ellipsizeMode="tail">
                {assignment.description}
              </Text>

              <View style={styles.assignmentFooter}>
                <Text style={styles.viewDetailsText}>Открыть задание</Text>
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
  assignmentCard: {
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
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  assignmentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  viewDetailsText: {
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
