import { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  XCircle,
  Trophy,
  Clock,
  Target,
  RotateCcw,
  Home,
} from 'lucide-react-native';
import { testTopics, TestTopic, TestQuestion } from '@/data/testTopics';
import { useTestResults } from '@/contexts/TestResultsContext';

type QuizPhase = 'topic_selection' | 'quiz' | 'result';

interface AnswerRecord {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
}

export default function TopicQuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ topicId?: string }>();
  const { saveResult, getResult } = useTestResults();

  const [phase, setPhase] = useState<QuizPhase>('topic_selection');
  const [selectedTopic, setSelectedTopic] = useState<TestTopic | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  // If topicId passed as param, auto-select topic
  useEffect(() => {
    if (params.topicId) {
      const topic = testTopics.find((t) => t.id === params.topicId);
      if (topic) {
        handleTopicSelect(topic);
      }
    }
  }, [params.topicId]);

  function handleTopicSelect(topic: TestTopic) {
    setSelectedTopic(topic);
    setPhase('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowFeedback(false);
    setStartTime(new Date());
    setEndTime(null);
  }

  function handleOptionSelect(optionId: string) {
    if (showFeedback || !selectedTopic) return;
    setSelectedOption(optionId);
  }

  function handleConfirmAnswer() {
    if (!selectedOption || !selectedTopic) return;

    const currentQuestion = selectedTopic.questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctOption;

    const newAnswer: AnswerRecord = {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect,
    };

    setAnswers([...answers, newAnswer]);
    setShowFeedback(true);
  }

  function handleNextQuestion() {
    if (!selectedTopic) return;

    if (currentQuestionIndex < selectedTopic.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      const now = new Date();
      setEndTime(now);
      
      // Calculate and save results
      const correctCount = [...answers, {
        questionId: selectedTopic.questions[currentQuestionIndex].id,
        selectedOption: selectedOption!,
        isCorrect: selectedOption === selectedTopic.questions[currentQuestionIndex].correctOption,
      }].filter((a) => a.isCorrect).length;
      
      const totalQuestions = selectedTopic.questions.length;
      const percentage = Math.round((correctCount / totalQuestions) * 100);
      const earnedPoints = Math.round((correctCount / totalQuestions) * selectedTopic.maxPoints);
      
      saveResult({
        topicId: selectedTopic.id,
        correctCount,
        totalQuestions,
        percentage,
        earnedPoints,
        maxPoints: selectedTopic.maxPoints,
        completedAt: now,
      });
      
      setPhase('result');
    }
  }

  function restartQuiz() {
    if (selectedTopic) {
      handleTopicSelect(selectedTopic);
    }
  }

  function goToTopicSelection() {
    setPhase('topic_selection');
    setSelectedTopic(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowFeedback(false);
  }

  const results = useMemo(() => {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const totalQuestions = selectedTopic?.questions.length || 0;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const maxPoints = selectedTopic?.maxPoints || 0;
    const earnedPoints = totalQuestions > 0 
      ? Math.round((correctCount / totalQuestions) * maxPoints) 
      : 0;

    let timeTaken = '';
    if (startTime && endTime) {
      const diffMs = endTime.getTime() - startTime.getTime();
      const minutes = Math.floor(diffMs / 60000);
      const seconds = Math.floor((diffMs % 60000) / 1000);
      timeTaken = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    let grade: string;
    let gradeColor: string;
    if (percentage >= 90) {
      grade = 'Отлично!';
      gradeColor = '#10b981';
    } else if (percentage >= 70) {
      grade = 'Хорошо!';
      gradeColor = '#3b82f6';
    } else if (percentage >= 50) {
      grade = 'Удовлетворительно';
      gradeColor = '#f59e0b';
    } else {
      grade = 'Нужно подтянуть';
      gradeColor = '#ef4444';
    }

    return {
      correctCount,
      totalQuestions,
      percentage,
      earnedPoints,
      maxPoints,
      timeTaken,
      grade,
      gradeColor,
    };
  }, [answers, selectedTopic, startTime, endTime]);

  // Topic Selection Screen
  if (phase === 'topic_selection') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Выбор темы</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Выберите тему для тестирования</Text>

          {testTopics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={styles.topicCard}
              onPress={() => handleTopicSelect(topic)}
              activeOpacity={0.7}>
              <View style={styles.topicCardContent}>
                <View
                  style={[
                    styles.topicTypeBadge,
                    {
                      backgroundColor:
                        topic.type === 'quiz' ? '#dbeafe' : '#f3e8ff',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.topicTypeText,
                      {
                        color: topic.type === 'quiz' ? '#3b82f6' : '#8b5cf6',
                      },
                    ]}>
                    {topic.type === 'quiz' ? 'Тест' : 'Контрольная'}
                  </Text>
                </View>

                <Text style={styles.topicCardTitle}>{topic.title}</Text>
                <Text style={styles.topicCardSubtitle}>{topic.subtitle}</Text>

                <View style={styles.topicMeta}>
                  <View style={styles.topicMetaItem}>
                    <BookOpen size={14} color="#6b7280" />
                    <Text style={styles.topicMetaText}>
                      {topic.questions.length} вопросов
                    </Text>
                  </View>
                  <View style={styles.topicMetaItem}>
                    <Clock size={14} color="#6b7280" />
                    <Text style={styles.topicMetaText}>
                      {topic.durationMinutes} мин
                    </Text>
                  </View>
                  <View style={styles.topicMetaItem}>
                    <Trophy size={14} color="#6b7280" />
                    <Text style={styles.topicMetaText}>
                      {topic.maxPoints} баллов
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Result Screen
  if (phase === 'result') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goToTopicSelection} style={styles.backButton}>
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Результаты</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.resultCard}>
            <View
              style={[
                styles.resultIconContainer,
                { backgroundColor: `${results.gradeColor}15` },
              ]}>
              <Trophy size={64} color={results.gradeColor} />
            </View>

            <Text style={[styles.resultGrade, { color: results.gradeColor }]}>
              {results.grade}
            </Text>

            <Text style={styles.resultTopicTitle}>{selectedTopic?.title}</Text>

            <View style={styles.resultStatsContainer}>
              <View style={styles.resultStatCard}>
                <Target size={24} color="#3b82f6" />
                <Text style={styles.resultStatValue}>
                  {results.correctCount}/{results.totalQuestions}
                </Text>
                <Text style={styles.resultStatLabel}>Правильных</Text>
              </View>

              <View style={styles.resultStatCard}>
                <Trophy size={24} color="#f59e0b" />
                <Text style={styles.resultStatValue}>{results.percentage}%</Text>
                <Text style={styles.resultStatLabel}>Результат</Text>
              </View>

              <View style={styles.resultStatCard}>
                <Clock size={24} color="#8b5cf6" />
                <Text style={styles.resultStatValue}>{results.timeTaken}</Text>
                <Text style={styles.resultStatLabel}>Время</Text>
              </View>
            </View>

            <View style={styles.pointsBox}>
              <Text style={styles.pointsTitle}>Набрано баллов</Text>
              <Text style={styles.pointsValue}>
                {results.earnedPoints} из {results.maxPoints}
              </Text>
            </View>

            {/* Answer Review */}
            <View style={styles.reviewSection}>
              <Text style={styles.reviewTitle}>Обзор ответов</Text>
              {selectedTopic?.questions.map((question, index) => {
                const answer = answers.find((a) => a.questionId === question.id);
                const isCorrect = answer?.isCorrect;
                return (
                  <View key={question.id} style={styles.reviewItem}>
                    <View
                      style={[
                        styles.reviewBadge,
                        {
                          backgroundColor: isCorrect ? '#dcfce7' : '#fee2e2',
                        },
                      ]}>
                      {isCorrect ? (
                        <CheckCircle size={16} color="#10b981" />
                      ) : (
                        <XCircle size={16} color="#ef4444" />
                      )}
                    </View>
                    <View style={styles.reviewContent}>
                      <Text style={styles.reviewQuestionNum}>
                        Вопрос {index + 1}
                      </Text>
                      <Text style={styles.reviewQuestionText} numberOfLines={2}>
                        {question.prompt}
                      </Text>
                      {!isCorrect && (
                        <Text style={styles.reviewCorrectAnswer}>
                          Правильный ответ:{' '}
                          {question.options.find(
                            (o) => o.id === question.correctOption
                          )?.text}
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity
              style={styles.restartButton}
              onPress={restartQuiz}
              activeOpacity={0.8}>
              <RotateCcw size={20} color="#ffffff" />
              <Text style={styles.restartButtonText}>Пройти ещё раз</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToTopicsButton}
              onPress={goToTopicSelection}
              activeOpacity={0.8}>
              <Home size={20} color="#6b7280" />
              <Text style={styles.backToTopicsButtonText}>Выбрать другую тему</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Quiz Screen
  if (!selectedTopic) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  const currentQuestion = selectedTopic.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / selectedTopic.questions.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToTopicSelection} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {selectedTopic.title.length > 25
            ? selectedTopic.title.substring(0, 25) + '...'
            : selectedTopic.title}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Вопрос {currentQuestionIndex + 1} из {selectedTopic.questions.length}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <View style={styles.questionBadge}>
              <Text style={styles.questionBadgeText}>
                Вопрос {currentQuestion.order}
              </Text>
            </View>
          </View>

          <Text style={styles.questionText}>{currentQuestion.prompt}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isCorrect = option.id === currentQuestion.correctOption;
              const showCorrect = showFeedback && isCorrect;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    isSelected && !showFeedback && styles.optionButtonSelected,
                    showCorrect && styles.optionButtonCorrect,
                    showWrong && styles.optionButtonWrong,
                  ]}
                  onPress={() => handleOptionSelect(option.id)}
                  activeOpacity={showFeedback ? 1 : 0.7}
                  disabled={showFeedback}>
                  <View
                    style={[
                      styles.optionBubble,
                      isSelected && !showFeedback && styles.optionBubbleSelected,
                      showCorrect && styles.optionBubbleCorrect,
                      showWrong && styles.optionBubbleWrong,
                    ]}>
                    <Text
                      style={[
                        styles.optionBubbleText,
                        (isSelected || showCorrect || showWrong) &&
                          styles.optionBubbleTextActive,
                      ]}>
                      {option.id.toUpperCase()}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      showCorrect && styles.optionTextCorrect,
                      showWrong && styles.optionTextWrong,
                    ]}>
                    {option.text}
                  </Text>
                  {showCorrect && <CheckCircle size={20} color="#10b981" />}
                  {showWrong && <XCircle size={20} color="#ef4444" />}
                </TouchableOpacity>
              );
            })}
          </View>

          {showFeedback && (
            <View
              style={[
                styles.feedbackBox,
                answers[answers.length - 1]?.isCorrect
                  ? styles.feedbackBoxCorrect
                  : styles.feedbackBoxWrong,
              ]}>
              <Text
                style={[
                  styles.feedbackText,
                  answers[answers.length - 1]?.isCorrect
                    ? styles.feedbackTextCorrect
                    : styles.feedbackTextWrong,
                ]}>
                {answers[answers.length - 1]?.isCorrect
                  ? '✓ Правильно!'
                  : '✗ Неправильно'}
              </Text>
            </View>
          )}

          {!showFeedback ? (
            <TouchableOpacity
              style={[
                styles.confirmButton,
                !selectedOption && styles.confirmButtonDisabled,
              ]}
              onPress={handleConfirmAnswer}
              activeOpacity={0.8}
              disabled={!selectedOption}>
              <Text style={styles.confirmButtonText}>Подтвердить ответ</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextQuestion}
              activeOpacity={0.8}>
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < selectedTopic.questions.length - 1
                  ? 'Следующий вопрос'
                  : 'Завершить тест'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  progressContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 16,
  },
  // Topic Selection Styles
  topicCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  topicCardContent: {
    padding: 16,
  },
  topicTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  topicTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  topicCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  topicCardSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  topicMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  topicMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  topicMetaText: {
    fontSize: 13,
    color: '#6b7280',
  },
  // Question Styles
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  questionHeader: {
    marginBottom: 16,
  },
  questionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  questionBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3b82f6',
    textTransform: 'uppercase',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    gap: 12,
  },
  optionButtonSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  optionButtonCorrect: {
    borderColor: '#10b981',
    backgroundColor: '#dcfce7',
  },
  optionButtonWrong: {
    borderColor: '#ef4444',
    backgroundColor: '#fee2e2',
  },
  optionBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  optionBubbleSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
  },
  optionBubbleCorrect: {
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  },
  optionBubbleWrong: {
    borderColor: '#ef4444',
    backgroundColor: '#ef4444',
  },
  optionBubbleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b7280',
  },
  optionBubbleTextActive: {
    color: '#ffffff',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  optionTextCorrect: {
    color: '#065f46',
    fontWeight: '600',
  },
  optionTextWrong: {
    color: '#991b1b',
  },
  feedbackBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  feedbackBoxCorrect: {
    backgroundColor: '#dcfce7',
  },
  feedbackBoxWrong: {
    backgroundColor: '#fee2e2',
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '700',
  },
  feedbackTextCorrect: {
    color: '#10b981',
  },
  feedbackTextWrong: {
    color: '#ef4444',
  },
  confirmButton: {
    marginTop: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  nextButton: {
    marginTop: 24,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  // Result Styles
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  resultIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultGrade: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  resultTopicTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  resultStatsContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 20,
  },
  resultStatCard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  resultStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  resultStatLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  pointsBox: {
    width: '100%',
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  pointsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#78350f',
  },
  reviewSection: {
    width: '100%',
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  reviewBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewContent: {
    flex: 1,
  },
  reviewQuestionNum: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 2,
  },
  reviewQuestionText: {
    fontSize: 14,
    color: '#111827',
  },
  reviewCorrectAnswer: {
    fontSize: 12,
    color: '#10b981',
    marginTop: 4,
    fontWeight: '500',
  },
  restartButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  backToTopicsButton: {
    width: '100%',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  backToTopicsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
});

