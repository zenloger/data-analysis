/*
  # Create Data Analysis Course App Schema

  ## Tables Created

  1. **profiles**
     - `id` (uuid, primary key) - User ID from auth.users
     - `full_name` (text) - User's full name
     - `avatar_url` (text) - Profile picture URL
     - `total_points` (integer) - Accumulated points
     - `level` (integer) - User level
     - `created_at` (timestamptz) - Account creation time
     - `updated_at` (timestamptz) - Last update time

  2. **courses**
     - `id` (uuid, primary key)
     - `title` (text) - Course title
     - `description` (text) - Course description
     - `order_index` (integer) - Display order
     - `is_published` (boolean) - Publication status
     - `created_at` (timestamptz)

  3. **lessons**
     - `id` (uuid, primary key)
     - `course_id` (uuid, foreign key) - References courses
     - `title` (text) - Lesson title
     - `content` (text) - Lesson content
     - `order_index` (integer) - Display order
     - `duration_minutes` (integer) - Estimated duration
     - `created_at` (timestamptz)

  4. **assignments**
     - `id` (uuid, primary key)
     - `lesson_id` (uuid, foreign key) - References lessons
     - `title` (text) - Assignment title
     - `description` (text) - Assignment description
     - `max_points` (integer) - Maximum points
     - `difficulty` (text) - easy, medium, hard
     - `created_at` (timestamptz)

  5. **tests**
     - `id` (uuid, primary key)
     - `course_id` (uuid, foreign key) - References courses
     - `title` (text) - Test title
     - `type` (text) - quiz, control_test
     - `max_points` (integer) - Maximum points
     - `time_limit_minutes` (integer) - Time limit
     - `created_at` (timestamptz)

  6. **test_questions**
     - `id` (uuid, primary key)
     - `test_id` (uuid, foreign key) - References tests
     - `question_text` (text) - Question
     - `question_type` (text) - multiple_choice, true_false, short_answer
     - `options` (jsonb) - Answer options
     - `correct_answer` (text) - Correct answer
     - `points` (integer) - Points for correct answer
     - `order_index` (integer)

  7. **user_progress**
     - `id` (uuid, primary key)
     - `user_id` (uuid, foreign key) - References auth.users
     - `lesson_id` (uuid, foreign key) - References lessons
     - `completed` (boolean) - Completion status
     - `completed_at` (timestamptz)

  8. **user_assignment_submissions**
     - `id` (uuid, primary key)
     - `user_id` (uuid, foreign key) - References auth.users
     - `assignment_id` (uuid, foreign key) - References assignments
     - `content` (text) - Submission content
     - `points_earned` (integer) - Points received
     - `submitted_at` (timestamptz)

  9. **user_test_results**
     - `id` (uuid, primary key)
     - `user_id` (uuid, foreign key) - References auth.users
     - `test_id` (uuid, foreign key) - References tests
     - `score` (integer) - Test score
     - `max_score` (integer) - Maximum possible score
     - `answers` (jsonb) - User answers
     - `completed_at` (timestamptz)

  10. **analyst_quiz_questions**
      - `id` (uuid, primary key)
      - `question_text` (text) - Quiz question
      - `options` (jsonb) - Answer options with analyst type weights
      - `order_index` (integer)

  11. **analyst_types**
      - `id` (uuid, primary key)
      - `name` (text) - Analyst type name
      - `description` (text) - Type description
      - `characteristics` (text) - Key characteristics
      - `icon` (text) - Icon identifier

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their own data
  - Add policies for reading public course content

  ## Notes
  1. All tables use UUID primary keys with automatic generation
  2. Timestamps use `timestamptz` for timezone awareness
  3. Default values set for booleans and timestamps
  4. Foreign key constraints ensure data integrity
  5. RLS policies restrict access appropriately
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  avatar_url text DEFAULT '',
  total_points integer DEFAULT 0,
  level integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  order_index integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  TO authenticated
  USING (is_published = true);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text DEFAULT '',
  order_index integer DEFAULT 0,
  duration_minutes integer DEFAULT 30,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  max_points integer DEFAULT 100,
  difficulty text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view assignments"
  ON assignments FOR SELECT
  TO authenticated
  USING (true);

-- Create tests table
CREATE TABLE IF NOT EXISTS tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text DEFAULT 'quiz',
  max_points integer DEFAULT 100,
  time_limit_minutes integer DEFAULT 60,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tests"
  ON tests FOR SELECT
  TO authenticated
  USING (true);

-- Create test_questions table
CREATE TABLE IF NOT EXISTS test_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type text DEFAULT 'multiple_choice',
  options jsonb DEFAULT '[]'::jsonb,
  correct_answer text DEFAULT '',
  points integer DEFAULT 10,
  order_index integer DEFAULT 0
);

ALTER TABLE test_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view test questions"
  ON test_questions FOR SELECT
  TO authenticated
  USING (true);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create user_assignment_submissions table
CREATE TABLE IF NOT EXISTS user_assignment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE,
  content text DEFAULT '',
  points_earned integer DEFAULT 0,
  submitted_at timestamptz DEFAULT now()
);

ALTER TABLE user_assignment_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own submissions"
  ON user_assignment_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own submissions"
  ON user_assignment_submissions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create user_test_results table
CREATE TABLE IF NOT EXISTS user_test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id uuid REFERENCES tests(id) ON DELETE CASCADE,
  score integer DEFAULT 0,
  max_score integer DEFAULT 100,
  answers jsonb DEFAULT '{}'::jsonb,
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE user_test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own test results"
  ON user_test_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own test results"
  ON user_test_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create analyst_quiz_questions table
CREATE TABLE IF NOT EXISTS analyst_quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  options jsonb DEFAULT '[]'::jsonb,
  order_index integer DEFAULT 0
);

ALTER TABLE analyst_quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view analyst quiz questions"
  ON analyst_quiz_questions FOR SELECT
  TO authenticated
  USING (true);

-- Create analyst_types table
CREATE TABLE IF NOT EXISTS analyst_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  characteristics text DEFAULT '',
  icon text DEFAULT 'chart-bar'
);

ALTER TABLE analyst_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view analyst types"
  ON analyst_types FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_assignments_lesson_id ON assignments(lesson_id);
CREATE INDEX IF NOT EXISTS idx_tests_course_id ON tests(course_id);
CREATE INDEX IF NOT EXISTS idx_test_questions_test_id ON test_questions(test_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_assignment_submissions_user_id ON user_assignment_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_test_results_user_id ON user_test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_total_points ON profiles(total_points DESC);