import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FileCheck, Clock, Award, ChevronRight, Play, CheckCircle } from 'lucide-react-native';
import { testTopics, TestTopic, TestType } from '@/data/testTopics';
import { useTestResults, TestResult } from '@/contexts/TestResultsContext';

type FilterValue = 'all' | TestType;

const filterChips: { id: FilterValue; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'quiz', label: 'Тесты' },
  { id: 'control', label: 'Контрольные' },
];

export default function TestsScreen() {
  const router = useRouter();
  const { results, getResult } = useTestResults();
  const [filter, setFilter] = useState<FilterValue>('all');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(
    () => (testTopics.length ? [testTopics[0].id] : [])
  );

  function getResultColor(percentage: number): string {
    if (percentage >= 90) return '#10b981'; // green
    if (percentage >= 70) return '#3b82f6'; // blue
    if (percentage >= 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
  }

  function getResultBgColor(percentage: number): string {
    if (percentage >= 90) return '#dcfce7';
    if (percentage >= 70) return '#dbeafe';
    if (percentage >= 50) return '#fef3c7';
    return '#fee2e2';
  }

  const summary = useMemo(() => {
    const totalQuestions = testTopics.reduce(
      (total: number, topic: TestTopic) => total + topic.questions.length,
      0
    );
    
    const completedTopics = Object.keys(results).length;

    return {
      totalTopics: testTopics.length,
      totalQuestions,
      completedTopics,
    };
  }, [results]);

  const filteredTopics = useMemo<TestTopic[]>(() => {
    if (filter === 'all') return testTopics;
    return testTopics.filter((topic) => topic.type === filter);
  }, [filter]);

  function getTestTypeLabel(type: TestType) {
    return type === 'quiz' ? 'Тест' : 'Контрольная';
  }

  function getTestTypeColor(type: TestType) {
    return type === 'quiz' ? '#3b82f6' : '#8b5cf6';
  }

  function toggleTopic(topicId: string) {
    setExpandedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Тесты и контрольные</Text>
        <Text style={styles.headerSubtitle}>Проверьте свои знания</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{summary.totalTopics}</Text>
            <Text style={styles.statLabel}>Тем доступно</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{summary.totalQuestions}</Text>
            <Text style={styles.statLabel}>Вопросов</Text>
          </View>
          <View style={[styles.statCard, styles.statCardCompleted]}>
            <Text style={styles.statValueCompleted}>{summary.completedTopics}</Text>
            <Text style={styles.statLabel}>Пройдено</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startQuizButton}
          activeOpacity={0.8}
          onPress={() => router.push('/topic-quiz')}>
          <Play size={20} color="#ffffff" />
          <Text style={styles.startQuizButtonText}>Начать тестирование</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterChipsContainer}
        style={styles.filterChipsScroll}>
        {filterChips.map((chip) => {
          const isActive = chip.id === filter;
          return (
            <TouchableOpacity
              key={chip.id}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              activeOpacity={0.7}
              onPress={() => setFilter(chip.id)}>
              <Text
                style={[
                  styles.filterChipText,
                  isActive && styles.filterChipTextActive,
                ]}>
                {chip.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {filteredTopics.length === 0 ? (
          <View style={styles.emptyState}>
            <FileCheck size={64} color="#d1d5db" />
            <Text style={styles.emptyText}>
              Ничего не найдено.{'\n'}Попробуйте изменить фильтры.
            </Text>
          </View>
        ) : (
          filteredTopics.map((topic) => {
            const topicResult = getResult(topic.id);
            const hasResult = !!topicResult;
            
            return (
            <View 
              key={topic.id} 
              style={[
                styles.topicCard,
                hasResult && {
                  borderColor: getResultColor(topicResult.percentage),
                  borderWidth: 2,
                },
              ]}>
              {hasResult && (
                <View 
                  style={[
                    styles.resultBadge, 
                    { backgroundColor: getResultBgColor(topicResult.percentage) }
                  ]}>
                  <CheckCircle size={16} color={getResultColor(topicResult.percentage)} />
                  <Text 
                    style={[
                      styles.resultBadgeText, 
                      { color: getResultColor(topicResult.percentage) }
                    ]}>
                    {topicResult.correctCount}/{topicResult.totalQuestions} ({topicResult.percentage}%)
                  </Text>
                </View>
              )}
              
              <TouchableOpacity
                style={styles.topicHeader}
                activeOpacity={0.8}
                onPress={() => toggleTopic(topic.id)}>
                <View style={styles.topicHeaderLeft}>
                  <View
                    style={[
                      styles.testTypeBadge,
                      {
                        backgroundColor: `${getTestTypeColor(topic.type)}15`,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.testTypeText,
                        { color: getTestTypeColor(topic.type) },
                      ]}>
                      {getTestTypeLabel(topic.type)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    <Text style={styles.topicSubtitle}>{topic.subtitle}</Text>
                  </View>
                </View>
                <View style={styles.topicHeaderRight}>
                  <View style={styles.metaItem}>
                    <Clock size={16} color="#6b7280" />
                    <Text style={styles.metaText}>
                      {topic.durationMinutes} мин
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Award size={16} color="#6b7280" />
                    <Text style={styles.metaText}>
                      {topic.maxPoints} баллов
                    </Text>
                  </View>
                  <ChevronRight
                    size={18}
                    color="#3b82f6"
                    style={
                      expandedTopics.includes(topic.id)
                        ? styles.chevronExpanded
                        : undefined
                    }
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.startTopicButton,
                  hasResult && styles.startTopicButtonCompleted,
                ]}
                activeOpacity={0.7}
                onPress={() => router.push(`/topic-quiz?topicId=${topic.id}`)}>
                <Play size={16} color={hasResult ? '#10b981' : '#3b82f6'} />
                <Text style={[
                  styles.startTopicButtonText,
                  hasResult && styles.startTopicButtonTextCompleted,
                ]}>
                  {hasResult ? 'Пройти заново' : 'Начать тест'}
                </Text>
              </TouchableOpacity>

              {expandedTopics.includes(topic.id) && (
                <View style={styles.topicBody}>
                  {topic.questions.map((question) => (
                    <View key={question.id} style={styles.questionCard}>
                      <View style={styles.questionHeader}>
                        <Text style={styles.questionOrder}>
                          Вопрос {question.order}
                        </Text>
                        <View style={styles.questionDivider} />
                      </View>
                      <Text style={styles.questionPrompt}>
                        {question.prompt}
                      </Text>
                      <View style={styles.optionsList}>
                        {question.options.map((option) => {
                          const isCorrect =
                            option.id === question.correctOption;
                          return (
                            <View
                              key={option.id}
                              style={[
                                styles.optionRow,
                                isCorrect && styles.optionRowCorrect,
                              ]}>
                              <View
                                style={[
                                  styles.optionBubble,
                                  isCorrect && styles.optionBubbleCorrect,
                                ]}>
                                <Text
                                  style={[
                                    styles.optionBubbleText,
                                    isCorrect && styles.optionBubbleTextCorrect,
                                  ]}>
                                  {option.id.toUpperCase()}
                                </Text>
                              </View>
                              <Text
                                style={[
                                  styles.optionText,
                                  isCorrect && styles.optionTextCorrect,
                                ]}>
                                {option.text}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
          })
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: '#6b7280',
  },
  statCardCompleted: {
    backgroundColor: '#dcfce7',
  },
  statValueCompleted: {
    fontSize: 22,
    fontWeight: '700',
    color: '#10b981',
  },
  startQuizButton: {
    marginTop: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startQuizButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  topicCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  resultBadgeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  topicHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  topicHeaderRight: {
    alignItems: 'flex-end',
    gap: 8,
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
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#6b7280',
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
  filterChipsScroll: {
    maxHeight: 60,
  },
  filterChipsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  filterChipActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterChipText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  topicSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: '#6b7280',
  },
  chevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  startTopicButton: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#eff6ff',
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  startTopicButtonCompleted: {
    backgroundColor: '#dcfce7',
    borderColor: '#86efac',
  },
  startTopicButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  startTopicButtonTextCompleted: {
    color: '#10b981',
  },
  topicBody: {
    marginTop: 18,
    gap: 12,
  },
  questionCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    padding: 14,
    backgroundColor: '#f9fafb',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  questionOrder: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
    textTransform: 'uppercase',
  },
  questionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  questionPrompt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  optionsList: {
    gap: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  optionRowCorrect: {
    borderColor: '#3b82f6',
    backgroundColor: '#dbeafe',
  },
  optionBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  optionBubbleCorrect: {
    borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
  },
  optionBubbleText: {
    fontWeight: '700',
    color: '#6b7280',
  },
  optionBubbleTextCorrect: {
    color: '#ffffff',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  optionTextCorrect: {
    fontWeight: '600',
    color: '#1d4ed8',
  },
});
