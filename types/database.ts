export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  total_points: number;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  order_index: number;
  is_published: boolean;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  content: string;
  order_index: number;
  duration_minutes: number;
  created_at: string;
}

export interface Assignment {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  max_points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
}

export interface Test {
  id: string;
  course_id: string;
  title: string;
  type: 'quiz' | 'control_test';
  max_points: number;
  time_limit_minutes: number;
  created_at: string;
}

export interface TestQuestion {
  id: string;
  test_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer';
  options: any[];
  correct_answer: string;
  points: number;
  order_index: number;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string;
}

export interface UserAssignmentSubmission {
  id: string;
  user_id: string;
  assignment_id: string;
  content: string;
  points_earned: number;
  submitted_at: string;
}

export interface UserTestResult {
  id: string;
  user_id: string;
  test_id: string;
  score: number;
  max_score: number;
  answers: any;
  completed_at: string;
}

export interface AnalystQuizQuestion {
  id: string;
  question_text: string;
  options: any[];
  order_index: number;
}

export interface AnalystType {
  id: string;
  name: string;
  description: string;
  characteristics: string;
  icon: string;
}
