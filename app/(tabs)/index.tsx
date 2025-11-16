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
import { Course } from '@/types/database';
import { BookOpen, Clock, ChevronRight } from 'lucide-react-native';

export default function CoursesScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (fetchError) throw fetchError;
      setCourses(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось загрузить курсы'
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Загрузка курсов...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadCourses}>
          <Text style={styles.retryButtonText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Курсы</Text>
        <Text style={styles.headerSubtitle}>
          Анализ данных от основ до профи
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {courses.length === 0 ? (
          <View style={styles.emptyState}>
            <BookOpen size={64} color="#d1d5db" />
            <Text style={styles.emptyText}>
              Курсы пока не добавлены.{'\n'}Скоро здесь появятся новые материалы!
            </Text>
          </View>
        ) : (
          courses.map((course) => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              activeOpacity={0.7}>
              <View style={styles.courseIconContainer}>
                <BookOpen size={28} color="#3b82f6" />
              </View>

              <View style={styles.courseContent}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text
                  style={styles.courseDescription}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {course.description}
                </Text>

                <View style={styles.courseFooter}>
                  <View style={styles.courseMetaContainer}>
                    <Clock size={14} color="#6b7280" />
                    <Text style={styles.courseMetaText}>8 уроков</Text>
                  </View>
                </View>
              </View>

              <ChevronRight size={20} color="#9ca3af" />
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
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  courseIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  courseContent: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  courseFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courseMetaText: {
    fontSize: 13,
    color: '#6b7280',
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
