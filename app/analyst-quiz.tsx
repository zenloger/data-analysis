import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { AnalystQuizQuestion, AnalystType } from '@/types/database';
import { ArrowLeft, Brain, CheckCircle } from 'lucide-react-native';

interface Answer {
  text: string;
  type: string;
  weight: number;
}

export default function AnalystQuizScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<AnalystQuizQuestion[]>([]);
  const [analystTypes, setAnalystTypes] = useState<AnalystType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AnalystType | null>(null);

  useEffect(() => {
    loadQuizData();
  }, []);

  async function loadQuizData() {
    try {
      setLoading(true);

      // const [questionsResponse, typesResponse] = await Promise.all([
      //   supabase
      //     .from('analyst_quiz_questions')
      //     .select('*')
      //     .order('order_index', { ascending: true }),
      //   supabase.from('analyst_types').select('*'),
      // ]);
      const questionsResponse = {error: null, data: null};
      const typesResponse = {error: null, data: null};

      if (questionsResponse.error) throw questionsResponse.error;
      if (typesResponse.error) throw typesResponse.error;

      const questionsData = questionsResponse.data || [];
      const typesData = typesResponse.data || [];

      if (questionsData.length === 0) {
        setQuestions(getDefaultQuestions());
      } else {
        setQuestions(questionsData);
      }

      if (typesData.length === 0) {
        setAnalystTypes(getDefaultTypes());
      } else {
        setAnalystTypes(typesData);
      }
    } catch (err) {
      console.error('Error loading quiz data:', err);
      setQuestions(getDefaultQuestions());
      setAnalystTypes(getDefaultTypes());
    } finally {
      setLoading(false);
    }
  }

  function getDefaultQuestions(): AnalystQuizQuestion[] {
    return [
      {
        id: '1',
        question_text: 'Как вы предпочитаете работать с данными?',
        options: [
          {
            text: 'Создаю визуализации и дашборды',
            type: 'visualizer',
            weight: 3,
          },
          {
            text: 'Строю статистические модели',
            type: 'statistician',
            weight: 3,
          },
          {
            text: 'Программирую сложные алгоритмы',
            type: 'engineer',
            weight: 3,
          },
          {
            text: 'Ищу бизнес-инсайты',
            type: 'business',
            weight: 3,
          },
        ],
        order_index: 0,
      },
      {
        id: '2',
        question_text: 'Какой инструмент вам ближе?',
        options: [
          { text: 'Tableau/Power BI', type: 'visualizer', weight: 3 },
          { text: 'R/SPSS', type: 'statistician', weight: 3 },
          { text: 'Python/SQL', type: 'engineer', weight: 3 },
          { text: 'Excel/Google Sheets', type: 'business', weight: 3 },
        ],
        order_index: 1,
      },
      {
        id: '3',
        question_text: 'Что вас мотивирует больше всего?',
        options: [
          {
            text: 'Красивые и понятные визуализации',
            type: 'visualizer',
            weight: 3,
          },
          {
            text: 'Точные прогнозы и модели',
            type: 'statistician',
            weight: 3,
          },
          {
            text: 'Оптимизация и автоматизация',
            type: 'engineer',
            weight: 3,
          },
          { text: 'Рост бизнес-метрик', type: 'business', weight: 3 },
        ],
        order_index: 2,
      },
    ];
  }

  function getDefaultTypes(): AnalystType[] {
    return [
      {
        id: '1',
        name: 'Визуализатор',
        description:
          'Вы мастер визуализации данных! Превращаете сложные данные в понятные истории через графики и дашборды.',
        characteristics:
          'Творческий подход, внимание к деталям, коммуникабельность',
        icon: 'chart-bar',
      },
      {
        id: '2',
        name: 'Статистик',
        description:
          'Вы математический гений! Строите модели, проводите A/B тесты и находите статистические закономерности.',
        characteristics:
          'Аналитический ум, глубокое понимание математики, точность',
        icon: 'calculator',
      },
      {
        id: '3',
        name: 'Инженер данных',
        description:
          'Вы архитектор данных! Создаёте ETL-пайплайны, оптимизируете запросы и автоматизируете процессы.',
        characteristics:
          'Техническая экспертиза, системное мышление, любовь к коду',
        icon: 'code',
      },
      {
        id: '4',
        name: 'Бизнес-аналитик',
        description:
          'Вы бизнес-партнёр! Переводите данные в бизнес-решения и помогаете компании расти.',
        characteristics:
          'Понимание бизнеса, коммуникация, стратегическое мышление',
        icon: 'briefcase',
      },
    ];
  }

  function handleAnswer(answer: Answer) {
    const newScores = { ...scores };
    newScores[answer.type] = (newScores[answer.type] || 0) + answer.weight;
    setScores(newScores);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newScores);
    }
  }

  function calculateResult(finalScores: Record<string, number>) {
    const typeMapping: Record<string, string> = {
      visualizer: 'Визуализатор',
      statistician: 'Статистик',
      engineer: 'Инженер данных',
      business: 'Бизнес-аналитик',
    };

    let maxScore = 0;
    let winningType = 'visualizer';

    Object.entries(finalScores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winningType = type;
      }
    });

    const resultType = analystTypes.find(
      (type) => type.name === typeMapping[winningType]
    );

    if (resultType) {
      setResult(resultType);
    } else {
      setResult(getDefaultTypes()[0]);
    }
  }

  function restartQuiz() {
    setCurrentQuestionIndex(0);
    setScores({});
    setResult(null);
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#8b5cf6" />
        <Text style={styles.loadingText}>Загрузка викторины...</Text>
      </View>
    );
  }

  if (result) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}>
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Результат</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.resultCard}>
            <View style={styles.resultIconContainer}>
              <Brain size={64} color="#8b5cf6" />
            </View>

            <Text style={styles.resultTitle}>Вы - {result.name}!</Text>
            <Text style={styles.resultDescription}>{result.description}</Text>

            <View style={styles.characteristicsBox}>
              <Text style={styles.characteristicsTitle}>
                Ключевые качества:
              </Text>
              <Text style={styles.characteristicsText}>
                {result.characteristics}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.restartButton}
              onPress={restartQuiz}
              activeOpacity={0.8}>
              <Text style={styles.restartButtonText}>Пройти ещё раз</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToProfileButton}
              onPress={() => router.back()}
              activeOpacity={0.8}>
              <Text style={styles.backToProfileButtonText}>
                Вернуться в профиль
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Кто ты из аналитиков?</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Вопрос {currentQuestionIndex + 1} из {questions.length}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.questionCard}>
          <View style={styles.questionIconContainer}>
            <Brain size={32} color="#8b5cf6" />
          </View>

          <Text style={styles.questionText}>{currentQuestion.question_text}</Text>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option: Answer, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
                activeOpacity={0.7}>
                <Text style={styles.optionText}>{option.text}</Text>
                <CheckCircle size={20} color="#e5e7eb" />
              </TouchableOpacity>
            ))}
          </View>
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
    fontSize: 24,
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
    backgroundColor: '#8b5cf6',
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
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  questionIconContainer: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
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
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  resultDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  characteristicsBox: {
    width: '100%',
    backgroundColor: '#f3e8ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  characteristicsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8b5cf6',
    marginBottom: 8,
  },
  characteristicsText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  restartButton: {
    width: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  backToProfileButton: {
    width: '100%',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  backToProfileButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
});
