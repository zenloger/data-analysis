export type TestType = 'quiz' | 'control';

export interface TestQuestionOption {
  id: string;
  text: string;
}

export interface TestQuestion {
  id: string;
  order: number;
  prompt: string;
  options: TestQuestionOption[];
  correctOption: string;
}

export interface TestTopic {
  id: string;
  title: string;
  subtitle: string;
  type: TestType;
  durationMinutes: number;
  maxPoints: number;
  questions: TestQuestion[];
}

export const testTopics: TestTopic[] = [
  {
    "id": "topic-1",
    "title": "Тема 1. Введение в анализ данных. Жизненный цикл данных",
    "subtitle": "Быстрый тематический квиз",
    "type": "quiz",
    "durationMinutes": 20,
    "maxPoints": 35,
    "questions": [
      {
        "id": "q1-1",
        "order": 1,
        "prompt": "Что такое CRISP-DM?",
        "options": [
          {
            "id": "a",
            "text": "Библиотека для визуализации данных"
          },
          {
            "id": "b",
            "text": "Методология анализа данных"
          },
          {
            "id": "c",
            "text": "Язык программирования для анализа"
          },
          {
            "id": "d",
            "text": "Алгоритм машинного обучения"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q1-2",
        "order": 2,
        "prompt": "Какой этап жизненного цикла данных следует после \"Понимания бизнес-задачи\"?",
        "options": [
          {
            "id": "a",
            "text": "Подготовка данных"
          },
          {
            "id": "b",
            "text": "Моделирование"
          },
          {
            "id": "c",
            "text": "Понимание данных"
          },
          {
            "id": "d",
            "text": "Внедрение"
          }
        ],
        "correctOption": "c"
      },
      {
        "id": "q1-3",
        "order": 3,
        "prompt": "Какой тип анализа отвечает на вопрос \"Что произойдет в будущем?\"",
        "options": [
          {
            "id": "a",
            "text": "Описательный анализ"
          },
          {
            "id": "b",
            "text": "Диагностический анализ"
          },
          {
            "id": "c",
            "text": "Предиктивный анализ"
          },
          {
            "id": "d",
            "text": "Предписывающий анализ"
          }
        ],
        "correctOption": "c"
      },
      {
        "id": "q1-4",
        "order": 4,
        "prompt": "На каком этапе CRISP-DM определяется критерии успеха проекта?",
        "options": [
          {
            "id": "a",
            "text": "Понимание бизнеса"
          },
          {
            "id": "b",
            "text": "Понимание данных"
          },
          {
            "id": "c",
            "text": "Подготовка данных"
          },
          {
            "id": "d",
            "text": "Моделирование"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q1-5",
        "order": 5,
        "prompt": "Что означает аббревиатура EDA?",
        "options": [
          {
            "id": "a",
            "text": "Exploratory Data Analysis"
          },
          {
            "id": "b",
            "text": "Experimental Data Assessment"
          },
          {
            "id": "c",
            "text": "Extended Data Analytics"
          },
          {
            "id": "d",
            "text": "Executive Data Analysis"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-2",
    "title": "Тема 2. Основы работы в Python для анализа данных",
    "subtitle": "Быстрый тематический квиз",
    "type": "quiz",
    "durationMinutes": 22,
    "maxPoints": 40,
    "questions": [
      {
        "id": "q2-1",
        "order": 6,
        "prompt": "Какая библиотека НЕ используется для анализа данных в Python?",
        "options": [
          {
            "id": "a",
            "text": "Pandas"
          },
          {
            "id": "b",
            "text": "NumPy"
          },
          {
            "id": "c",
            "text": "Matplotlib"
          },
          {
            "id": "d",
            "text": "Django"
          }
        ],
        "correctOption": "d"
      },
      {
        "id": "q2-2",
        "order": 7,
        "prompt": "Что такое list comprehension?",
        "options": [
          {
            "id": "a",
            "text": "Метод сортировки списков"
          },
          {
            "id": "b",
            "text": "Лаконичный способ создания списков"
          },
          {
            "id": "c",
            "text": "Функция для очистки данных"
          },
          {
            "id": "d",
            "text": "Алгоритм машинного обучения"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q2-3",
        "order": 8,
        "prompt": "Какая из перечисленных библиотек используется для работы с регулярными выражениями?",
        "options": [
          {
            "id": "a",
            "text": "re"
          },
          {
            "id": "b",
            "text": "regex"
          },
          {
            "id": "c",
            "text": "string"
          },
          {
            "id": "d",
            "text": "text"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q2-4",
        "order": 9,
        "prompt": "Для чего используется виртуальное окружение?",
        "options": [
          {
            "id": "a",
            "text": "Для изоляции зависимостей проекта"
          },
          {
            "id": "b",
            "text": "Для ускорения выполнения кода"
          },
          {
            "id": "c",
            "text": "Для создания графиков"
          },
          {
            "id": "d",
            "text": "Для работы с базами данных"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q2-5",
        "order": 10,
        "prompt": "Какая команда используется для установки библиотеки через pip?",
        "options": [
          {
            "id": "a",
            "text": "pip install"
          },
          {
            "id": "b",
            "text": "python install"
          },
          {
            "id": "c",
            "text": "install pip"
          },
          {
            "id": "d",
            "text": "library install"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q2-6",
        "order": 11,
        "prompt": "Для чего используется Jupyter Notebook?",
        "options": [
          {
            "id": "a",
            "text": "Для интерактивной работы с кодом и данными"
          },
          {
            "id": "b",
            "text": "Для компиляции программ"
          },
          {
            "id": "c",
            "text": "Для работы с базами данных"
          },
          {
            "id": "d",
            "text": "Для создания веб-приложений"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-3",
    "title": "Тема 3. Типы данных, структуры и коллекции в Python",
    "subtitle": "Расширенная контрольная работа",
    "type": "control",
    "durationMinutes": 28,
    "maxPoints": 50,
    "questions": [
      {
        "id": "q3-1",
        "order": 12,
        "prompt": "Какая структура данных является изменяемой?",
        "options": [
          {
            "id": "a",
            "text": "Tuple"
          },
          {
            "id": "b",
            "text": "String"
          },
          {
            "id": "c",
            "text": "List"
          },
          {
            "id": "d",
            "text": "None of above"
          }
        ],
        "correctOption": "c"
      },
      {
        "id": "q3-2",
        "order": 13,
        "prompt": "Как получить все ключи словаря?",
        "options": [
          {
            "id": "a",
            "text": "dict.keys()"
          },
          {
            "id": "b",
            "text": "dict.values()"
          },
          {
            "id": "c",
            "text": "dict.items()"
          },
          {
            "id": "d",
            "text": "dict.elements()"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q3-3",
        "order": 14,
        "prompt": "Что вернет выражение: [i for i in range(5) if i % 2 == 0]?",
        "options": [
          {
            "id": "a",
            "text": "[0, 2, 4]"
          },
          {
            "id": "b",
            "text": "[0, 1, 2, 3, 4]"
          },
          {
            "id": "c",
            "text": "[1, 3]"
          },
          {
            "id": "d",
            "text": "[2, 4]"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q3-4",
        "order": 15,
        "prompt": "Как создать множество из списка?",
        "options": [
          {
            "id": "a",
            "text": "set([1,2,3])"
          },
          {
            "id": "b",
            "text": "{1,2,3}"
          },
          {
            "id": "c",
            "text": "list_to_set([1,2,3])"
          },
          {
            "id": "d",
            "text": "Варианты a и b верны"
          }
        ],
        "correctOption": "d"
      },
      {
        "id": "q3-5",
        "order": 16,
        "prompt": "Как добавить элемент в конец списка?",
        "options": [
          {
            "id": "a",
            "text": "list.append()"
          },
          {
            "id": "b",
            "text": "list.add()"
          },
          {
            "id": "c",
            "text": "list.insert()"
          },
          {
            "id": "d",
            "text": "list.extend()"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q3-6",
        "order": 17,
        "prompt": "Что вернет выражение: 'hello'[::-1]?",
        "options": [
          {
            "id": "a",
            "text": "'olleh'"
          },
          {
            "id": "b",
            "text": "'hello'"
          },
          {
            "id": "c",
            "text": "'h'"
          },
          {
            "id": "d",
            "text": "Error"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-4",
    "title": "Тема 4. Основы работы с библиотекой NumPy",
    "subtitle": "Быстрый тематический квиз",
    "type": "quiz",
    "durationMinutes": 22,
    "maxPoints": 40,
    "questions": [
      {
        "id": "q4-1",
        "order": 18,
        "prompt": "Что такое векторные операции в NumPy?",
        "options": [
          {
            "id": "a",
            "text": "Операции с текстовыми данными"
          },
          {
            "id": "b",
            "text": "Операции, выполняемые поэлементно над массивами"
          },
          {
            "id": "c",
            "text": "Операции с трехмерными векторами"
          },
          {
            "id": "d",
            "text": "Специальные математические функции"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q4-2",
        "order": 19,
        "prompt": "Как создать массив от 0 до 10 с шагом 2?",
        "options": [
          {
            "id": "a",
            "text": "np.array([0, 2, 4, 6, 8, 10])"
          },
          {
            "id": "b",
            "text": "np.arange(0, 10, 2)"
          },
          {
            "id": "c",
            "text": "np.linspace(0, 10, 2)"
          },
          {
            "id": "d",
            "text": "np.range(0, 10, 2)"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q4-3",
        "order": 20,
        "prompt": "Как создать массив 3x3 из единиц?",
        "options": [
          {
            "id": "a",
            "text": "np.ones((3,3))"
          },
          {
            "id": "b",
            "text": "np.ones(3,3)"
          },
          {
            "id": "c",
            "text": "np.array([[1,1,1],[1,1,1],[1,1,1]])"
          },
          {
            "id": "d",
            "text": "Оба варианта a и c верны"
          }
        ],
        "correctOption": "d"
      },
      {
        "id": "q4-4",
        "order": 21,
        "prompt": "Как изменить форму массива без изменения данных?",
        "options": [
          {
            "id": "a",
            "text": "np.reshape()"
          },
          {
            "id": "b",
            "text": "np.resize()"
          },
          {
            "id": "c",
            "text": "np.shape()"
          },
          {
            "id": "d",
            "text": "np.reformat()"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q4-5",
        "order": 22,
        "prompt": "Как создать массив 2x3 со случайными числами от 0 до 1?",
        "options": [
          {
            "id": "a",
            "text": "np.random.random((2,3))"
          },
          {
            "id": "b",
            "text": "np.random.rand(2,3)"
          },
          {
            "id": "c",
            "text": "np.rand(2,3)"
          },
          {
            "id": "d",
            "text": "Оба варианта a и b верны"
          }
        ],
        "correctOption": "d"
      },
      {
        "id": "q4-6",
        "order": 23,
        "prompt": "Как вычислить стандартное отклонение массива?",
        "options": [
          {
            "id": "a",
            "text": "np.std()"
          },
          {
            "id": "b",
            "text": "np.standard_deviation()"
          },
          {
            "id": "c",
            "text": "np.dev()"
          },
          {
            "id": "d",
            "text": "np.stdev()"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-5",
    "title": "Тема 5. Работа с табличными данными в Pandas",
    "subtitle": "Быстрый тематический квиз",
    "type": "quiz",
    "durationMinutes": 24,
    "maxPoints": 45,
    "questions": [
      {
        "id": "q5-1",
        "order": 24,
        "prompt": "Как загрузить данные из CSV файла?",
        "options": [
          {
            "id": "a",
            "text": "pd.read_csv()"
          },
          {
            "id": "b",
            "text": "pd.load_csv()"
          },
          {
            "id": "c",
            "text": "pd.import_csv()"
          },
          {
            "id": "d",
            "text": "pd.open_csv()"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q5-2",
        "order": 25,
        "prompt": "Как выбрать столбцы 'name' и 'age' из DataFrame df?",
        "options": [
          {
            "id": "a",
            "text": "df['name', 'age']"
          },
          {
            "id": "b",
            "text": "df[['name', 'age']]"
          },
          {
            "id": "c",
            "text": "df.select('name', 'age')"
          },
          {
            "id": "d",
            "text": "df.columns('name', 'age')"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q5-3",
        "order": 26,
        "prompt": "Как сгруппировать данные по столбцу 'city' и посчитать среднее?",
        "options": [
          {
            "id": "a",
            "text": "df.group('city').mean()"
          },
          {
            "id": "b",
            "text": "df.groupby('city').mean()"
          },
          {
            "id": "c",
            "text": "df.aggregate('city').mean()"
          },
          {
            "id": "d",
            "text": "df.pivot('city').mean()"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q5-4",
        "order": 27,
        "prompt": "Как объединить два DataFrame по индексу?",
        "options": [
          {
            "id": "a",
            "text": "pd.concat([df1, df2])"
          },
          {
            "id": "b",
            "text": "df1.join(df2)"
          },
          {
            "id": "c",
            "text": "pd.merge(df1, df2, left_index=True, right_index=True)"
          },
          {
            "id": "d",
            "text": "Все вышеперечисленные"
          }
        ],
        "correctOption": "d"
      },
      {
        "id": "q5-5",
        "order": 28,
        "prompt": "Как применить функцию к каждому элементу DataFrame?",
        "options": [
          {
            "id": "a",
            "text": "df.applymap()"
          },
          {
            "id": "b",
            "text": "df.apply()"
          },
          {
            "id": "c",
            "text": "df.map()"
          },
          {
            "id": "d",
            "text": "df.function()"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q5-6",
        "order": 29,
        "prompt": "Как переименовать столбец в DataFrame?",
        "options": [
          {
            "id": "a",
            "text": "df.rename(columns={'old':'new'})"
          },
          {
            "id": "b",
            "text": "df.column_rename('old','new')"
          },
          {
            "id": "c",
            "text": "df.set_column_name('old','new')"
          },
          {
            "id": "d",
            "text": "df.change_column('old','new')"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q5-7",
        "order": 30,
        "prompt": "Как отсортировать DataFrame по столбцу 'age'?",
        "options": [
          {
            "id": "a",
            "text": "df.sort('age')"
          },
          {
            "id": "b",
            "text": "df.sort_values('age')"
          },
          {
            "id": "c",
            "text": "df.order_by('age')"
          },
          {
            "id": "d",
            "text": "df.arrange('age')"
          }
        ],
        "correctOption": "b"
      }
    ]
  },
  {
    "id": "topic-6",
    "title": "Тема 6. Операции очистки и предобработки данных",
    "subtitle": "Расширенная контрольная работа",
    "type": "control",
    "durationMinutes": 28,
    "maxPoints": 50,
    "questions": [
      {
        "id": "q6-1",
        "order": 31,
        "prompt": "Какой метод НЕ используется для обработки пропущенных значений?",
        "options": [
          {
            "id": "a",
            "text": "fillna()"
          },
          {
            "id": "b",
            "text": "dropna()"
          },
          {
            "id": "c",
            "text": "removena()"
          },
          {
            "id": "d",
            "text": "interpolate()"
          }
        ],
        "correctOption": "c"
      },
      {
        "id": "q6-2",
        "order": 32,
        "prompt": "Что такое One-Hot Encoding?",
        "options": [
          {
            "id": "a",
            "text": "Преобразование категорий в бинарные признаки"
          },
          {
            "id": "b",
            "text": "Нормализация числовых данных"
          },
          {
            "id": "c",
            "text": "Удаление выбросов"
          },
          {
            "id": "d",
            "text": "Метод кластеризации"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q6-3",
        "order": 33,
        "prompt": "Какой метод используется для кодирования категориальных переменных в числа?",
        "options": [
          {
            "id": "a",
            "text": "LabelEncoder"
          },
          {
            "id": "b",
            "text": "OneHotEncoder"
          },
          {
            "id": "c",
            "text": "OrdinalEncoder"
          },
          {
            "id": "d",
            "text": "Все вышеперечисленные"
          }
        ],
        "correctOption": "d"
      },
      {
        "id": "q6-4",
        "order": 34,
        "prompt": "В чем разница между MinMaxScaler и StandardScaler?",
        "options": [
          {
            "id": "a",
            "text": "MinMaxScaler масштабирует к [0,1], StandardScaler к нулевому среднему и единичной дисперсии"
          },
          {
            "id": "b",
            "text": "MinMaxScaler для категориальных данных, StandardScaler для числовых"
          },
          {
            "id": "c",
            "text": "MinMaxScaler быстрее, StandardScaler точнее"
          },
          {
            "id": "d",
            "text": "Разницы нет"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q6-5",
        "order": 35,
        "prompt": "Что такое Feature Engineering?",
        "options": [
          {
            "id": "a",
            "text": "Создание новых признаков из существующих данных"
          },
          {
            "id": "b",
            "text": "Удаление ненужных признаков"
          },
          {
            "id": "c",
            "text": "Нормализация данных"
          },
          {
            "id": "d",
            "text": "Визуализация признаков"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q6-6",
        "order": 36,
        "prompt": "Какой метод кодирования создает бинарные столбцы для каждой категории?",
        "options": [
          {
            "id": "a",
            "text": "One-Hot Encoding"
          },
          {
            "id": "b",
            "text": "Label Encoding"
          },
          {
            "id": "c",
            "text": "Ordinal Encoding"
          },
          {
            "id": "d",
            "text": "Binary Encoding"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-7",
    "title": "Тема 7. Работа с пропущенными значениями и выбросами",
    "subtitle": "Быстрый тематический квиз",
    "type": "quiz",
    "durationMinutes": 22,
    "maxPoints": 40,
    "questions": [
      {
        "id": "q7-1",
        "order": 37,
        "prompt": "Как обнаружить пропущенные значения в Pandas?",
        "options": [
          {
            "id": "a",
            "text": "df.find_na()"
          },
          {
            "id": "b",
            "text": "df.isnull()"
          },
          {
            "id": "c",
            "text": "df.missing()"
          },
          {
            "id": "d",
            "text": "df.na_values()"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q7-2",
        "order": 38,
        "prompt": "Какой метод НЕ используется для обработки выбросов?",
        "options": [
          {
            "id": "a",
            "text": "IQR метод"
          },
          {
            "id": "b",
            "text": "Z-score метод"
          },
          {
            "id": "c",
            "text": "K-means метод"
          },
          {
            "id": "d",
            "text": "Изоляционный лес"
          }
        ],
        "correctOption": "c"
      },
      {
        "id": "q7-3",
        "order": 39,
        "prompt": "Какой метод использует межквартильный размах для обнаружения выбросов?",
        "options": [
          {
            "id": "a",
            "text": "IQR метод"
          },
          {
            "id": "b",
            "text": "Z-score метод"
          },
          {
            "id": "c",
            "text": "Метод изоляционного леса"
          },
          {
            "id": "d",
            "text": "DBSCAN"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q7-4",
        "order": 40,
        "prompt": "Какие типы пропущенных данных НЕ существуют?",
        "options": [
          {
            "id": "a",
            "text": "MCAR (полностью случайные)"
          },
          {
            "id": "b",
            "text": "MAR (случайные)"
          },
          {
            "id": "c",
            "text": "MNAR (неслучайные)"
          },
          {
            "id": "d",
            "text": "MCR (условно случайные)"
          }
        ],
        "correctOption": "d"
      },
      {
        "id": "q7-5",
        "order": 41,
        "prompt": "Какой метод использует стандартное отклонение для обнаружения выбросов?",
        "options": [
          {
            "id": "a",
            "text": "Z-score метод"
          },
          {
            "id": "b",
            "text": "IQR метод"
          },
          {
            "id": "c",
            "text": "Метод изоляционного леса"
          },
          {
            "id": "d",
            "text": "Метод локтя"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q7-6",
        "order": 42,
        "prompt": "Что такое RobustScaler?",
        "options": [
          {
            "id": "a",
            "text": "Масштабатор, устойчивый к выбросам"
          },
          {
            "id": "b",
            "text": "Метод кодирования категориальных переменных"
          },
          {
            "id": "c",
            "text": "Алгоритм кластеризации"
          },
          {
            "id": "d",
            "text": "Метод снижения размерности"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-8",
    "title": "Тема 8. Визуализация данных",
    "subtitle": "Быстрый тематический квиз",
    "type": "quiz",
    "durationMinutes": 22,
    "maxPoints": 40,
    "questions": [
      {
        "id": "q8-1",
        "order": 43,
        "prompt": "Какая библиотека используется для статистической графики?",
        "options": [
          {
            "id": "a",
            "text": "Matplotlib"
          },
          {
            "id": "b",
            "text": "Seaborn"
          },
          {
            "id": "c",
            "text": "Plotly"
          },
          {
            "id": "d",
            "text": "Bokeh"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q8-2",
        "order": 44,
        "prompt": "Какой график показывает распределение данных?",
        "options": [
          {
            "id": "a",
            "text": "Scatter plot"
          },
          {
            "id": "b",
            "text": "Line plot"
          },
          {
            "id": "c",
            "text": "Histogram"
          },
          {
            "id": "d",
            "text": "Bar plot"
          }
        ],
        "correctOption": "c"
      },
      {
        "id": "q8-3",
        "order": 45,
        "prompt": "Какой график позволяет увидеть взаимосвязь между двумя переменными?",
        "options": [
          {
            "id": "a",
            "text": "Scatter plot"
          },
          {
            "id": "b",
            "text": "Histogram"
          },
          {
            "id": "c",
            "text": "Box plot"
          },
          {
            "id": "d",
            "text": "Bar plot"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q8-4",
        "order": 46,
        "prompt": "Что показывает pairplot в Seaborn?",
        "options": [
          {
            "id": "a",
            "text": "Попарные зависимости между несколькими переменными"
          },
          {
            "id": "b",
            "text": "Распределение одной переменной"
          },
          {
            "id": "c",
            "text": "Временной ряд"
          },
          {
            "id": "d",
            "text": "Корреляционную матрицу"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q8-5",
        "order": 47,
        "prompt": "Какой график показывает распределение и выбросы данных?",
        "options": [
          {
            "id": "a",
            "text": "Box plot"
          },
          {
            "id": "b",
            "text": "Line plot"
          },
          {
            "id": "c",
            "text": "Bar plot"
          },
          {
            "id": "d",
            "text": "Pie chart"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q8-6",
        "order": 48,
        "prompt": "Что такое FacetGrid в Seaborn?",
        "options": [
          {
            "id": "a",
            "text": "Метод для создания множества графиков на основе категорий"
          },
          {
            "id": "b",
            "text": "Тип гистограммы"
          },
          {
            "id": "c",
            "text": "Метод для 3D визуализации"
          },
          {
            "id": "d",
            "text": "Алгоритм кластеризации"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-9",
    "title": "Тема 9. Исследовательский анализ данных (EDA)",
    "subtitle": "Расширенная контрольная работа",
    "type": "control",
    "durationMinutes": 28,
    "maxPoints": 50,
    "questions": [
      {
        "id": "q9-1",
        "order": 49,
        "prompt": "Какова основная цель EDA?",
        "options": [
          {
            "id": "a",
            "text": "Построение прогнозных моделей"
          },
          {
            "id": "b",
            "text": "Понимание структуры и характеристик данных"
          },
          {
            "id": "c",
            "text": "Создание финальных отчетов"
          },
          {
            "id": "d",
            "text": "Оптимизация производительности"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q9-2",
        "order": 50,
        "prompt": "Какой метод НЕ является частью EDA?",
        "options": [
          {
            "id": "a",
            "text": "Анализ распределений"
          },
          {
            "id": "b",
            "text": "Анализ корреляций"
          },
          {
            "id": "c",
            "text": "Обучение сложных моделей"
          },
          {
            "id": "d",
            "text": "Визуализация данных"
          }
        ],
        "correctOption": "c"
      },
      {
        "id": "q9-3",
        "order": 51,
        "prompt": "Какой метод НЕ используется для анализа многомерных данных?",
        "options": [
          {
            "id": "a",
            "text": "Матрица scatter plots"
          },
          {
            "id": "b",
            "text": "Pairplot"
          },
          {
            "id": "c",
            "text": "Heatmap корреляций"
          },
          {
            "id": "d",
            "text": "Line plot одного признака"
          }
        ],
        "correctOption": "d"
      },
      {
        "id": "q9-4",
        "order": 52,
        "prompt": "Что такое \"five-number summary\" в описательной статистике?",
        "options": [
          {
            "id": "a",
            "text": "Min, Q1, Median, Q3, Max"
          },
          {
            "id": "b",
            "text": "Mean, Median, Mode, Variance, STD"
          },
          {
            "id": "c",
            "text": "Count, Mean, STD, Min, Max"
          },
          {
            "id": "d",
            "text": "Range, IQR, Variance, STD, Mean"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q9-5",
        "order": 53,
        "prompt": "Какой метод используется для анализа распределения категориальной переменной?",
        "options": [
          {
            "id": "a",
            "text": "Count plot"
          },
          {
            "id": "b",
            "text": "Scatter plot"
          },
          {
            "id": "c",
            "text": "Line plot"
          },
          {
            "id": "d",
            "text": "Area plot"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q9-6",
        "order": 54,
        "prompt": "Что такое \"data profiling\"?",
        "options": [
          {
            "id": "a",
            "text": "Автоматический анализ характеристик данных"
          },
          {
            "id": "b",
            "text": "Создание профилей пользователей"
          },
          {
            "id": "c",
            "text": "Визуализация данных"
          },
          {
            "id": "d",
            "text": "Статистическое тестирование"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-10",
    "title": "Тема 10. Работа с временными рядами в Pandas",
    "subtitle": "Быстрый тематический квиз",
    "type": "quiz",
    "durationMinutes": 22,
    "maxPoints": 40,
    "questions": [
      {
        "id": "q10-1",
        "order": 55,
        "prompt": "Как преобразовать строку в datetime в Pandas?",
        "options": [
          {
            "id": "a",
            "text": "pd.to_datetime()"
          },
          {
            "id": "b",
            "text": "pd.convert_date()"
          },
          {
            "id": "c",
            "text": "pd.datetime_parse()"
          },
          {
            "id": "d",
            "text": "pd.date_convert()"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q10-2",
        "order": 56,
        "prompt": "Что такое ресемплинг временного ряда?",
        "options": [
          {
            "id": "a",
            "text": "Изменение частоты временного ряда"
          },
          {
            "id": "b",
            "text": "Удаление пропущенных значений"
          },
          {
            "id": "c",
            "text": "Нормализация данных"
          },
          {
            "id": "d",
            "text": "Построение прогнозов"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q10-3",
        "order": 57,
        "prompt": "Что такое стационарность временного ряда?",
        "options": [
          {
            "id": "a",
            "text": "Постоянство среднего и дисперсии во времени"
          },
          {
            "id": "b",
            "text": "Наличие тренда"
          },
          {
            "id": "c",
            "text": "Наличие сезонности"
          },
          {
            "id": "d",
            "text": "Отсутствие шума"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q10-4",
        "order": 58,
        "prompt": "Какой метод НЕ используется для проверки стационарности?",
        "options": [
          {
            "id": "a",
            "text": "Тест Дики-Фуллера"
          },
          {
            "id": "b",
            "text": "Тест КПСС"
          },
          {
            "id": "c",
            "text": "Тест Стьюдента"
          },
          {
            "id": "d",
            "text": "Тест на единичные корни"
          }
        ],
        "correctOption": "c"
      },
      {
        "id": "q10-5",
        "order": 59,
        "prompt": "Что такое \"lag\" в временных рядах?",
        "options": [
          {
            "id": "a",
            "text": "Предыдущее значение ряда"
          },
          {
            "id": "b",
            "text": "Следующее значение ряда"
          },
          {
            "id": "c",
            "text": "Среднее значение ряда"
          },
          {
            "id": "d",
            "text": "Тренд ряда"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q10-6",
        "order": 60,
        "prompt": "Какой метод используется для декомпозиции временного ряда?",
        "options": [
          {
            "id": "a",
            "text": "seasonal_decompose"
          },
          {
            "id": "b",
            "text": "time_series_split"
          },
          {
            "id": "c",
            "text": "trend_analysis"
          },
          {
            "id": "d",
            "text": "cycle_detection"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-11",
    "title": "Тема 11. Основы статистики для анализа данных",
    "subtitle": "Быстрый тематический квиз",
    "type": "quiz",
    "durationMinutes": 22,
    "maxPoints": 40,
    "questions": [
      {
        "id": "q11-1",
        "order": 61,
        "prompt": "Какая мера центральной тенденции наиболее устойчива к выбросам?",
        "options": [
          {
            "id": "a",
            "text": "Среднее арифметическое"
          },
          {
            "id": "b",
            "text": "Медиана"
          },
          {
            "id": "c",
            "text": "Мода"
          },
          {
            "id": "d",
            "text": "Дисперсия"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q11-2",
        "order": 62,
        "prompt": "Что показывает стандартное отклонение?",
        "options": [
          {
            "id": "a",
            "text": "Разброс данных относительно среднего"
          },
          {
            "id": "b",
            "text": "Асимметрию распределения"
          },
          {
            "id": "c",
            "text": "Центр распределения"
          },
          {
            "id": "d",
            "text": "Количество наблюдений"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q11-3",
        "order": 63,
        "prompt": "Что такое доверительный интервал?",
        "options": [
          {
            "id": "a",
            "text": "Интервал, в котором с заданной вероятностью лежит параметр популяции"
          },
          {
            "id": "b",
            "text": "Интервал, содержащий все наблюдения"
          },
          {
            "id": "c",
            "text": "Интервал между минимальным и максимальным значением"
          },
          {
            "id": "d",
            "text": "Интервал, содержащий среднее значение"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q11-4",
        "order": 64,
        "prompt": "Что измеряет асимметрия (skewness)?",
        "options": [
          {
            "id": "a",
            "text": "Симметричность распределения"
          },
          {
            "id": "b",
            "text": "Остроту пика распределения"
          },
          {
            "id": "c",
            "text": "Разброс данных"
          },
          {
            "id": "d",
            "text": "Центральную тенденцию"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q11-5",
        "order": 65,
        "prompt": "Что такое доверительный интервал 95%?",
        "options": [
          {
            "id": "a",
            "text": "Интервал, содержащий истинный параметр с вероятностью 95%"
          },
          {
            "id": "b",
            "text": "Интервал, содержащий 95% данных"
          },
          {
            "id": "c",
            "text": "Интервал от 0 до 95"
          },
          {
            "id": "d",
            "text": "Интервал средних значений"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q11-6",
        "order": 66,
        "prompt": "Что измеряет эксцесс (kurtosis)?",
        "options": [
          {
            "id": "a",
            "text": "Остроту пика распределения"
          },
          {
            "id": "b",
            "text": "Симметричность распределения"
          },
          {
            "id": "c",
            "text": "Разброс данных"
          },
          {
            "id": "d",
            "text": "Центральную тенденцию"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-12",
    "title": "Тема 12. Корреляция и ковариация. Проверка гипотез",
    "subtitle": "Расширенная контрольная работа",
    "type": "control",
    "durationMinutes": 28,
    "maxPoints": 50,
    "questions": [
      {
        "id": "q12-1",
        "order": 67,
        "prompt": "Коэффициент корреляции +0.9 означает:",
        "options": [
          {
            "id": "a",
            "text": "Сильную прямую зависимость"
          },
          {
            "id": "b",
            "text": "Сильную обратную зависимость"
          },
          {
            "id": "c",
            "text": "Отсутствие зависимости"
          },
          {
            "id": "d",
            "text": "Слабую зависимость"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q12-2",
        "order": 68,
        "prompt": "Что такое p-value?",
        "options": [
          {
            "id": "a",
            "text": "Вероятность получить наблюдаемые данные при верной нулевой гипотезе"
          },
          {
            "id": "b",
            "text": "Вероятность того, что альтернативная гипотеза верна"
          },
          {
            "id": "c",
            "text": "Уровень значимости"
          },
          {
            "id": "d",
            "text": "Мощность теста"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q12-3",
        "order": 69,
        "prompt": "Если p-value меньше уровня значимости, то:",
        "options": [
          {
            "id": "a",
            "text": "Отвергаем нулевую гипотезу"
          },
          {
            "id": "b",
            "text": "Принимаем нулевую гипотезу"
          },
          {
            "id": "c",
            "text": "Не можем принять решение"
          },
          {
            "id": "d",
            "text": "Повторяем эксперимент"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q12-4",
        "order": 70,
        "prompt": "Когда используется корреляция Спирмена?",
        "options": [
          {
            "id": "a",
            "text": "Когда данные не нормально распределены"
          },
          {
            "id": "b",
            "text": "Только для нормально распределенных данных"
          },
          {
            "id": "c",
            "text": "Для категориальных данных"
          },
          {
            "id": "d",
            "text": "Для временных рядов"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q12-5",
        "order": 71,
        "prompt": "Если p-value = 0.03 при alpha = 0.05, то:",
        "options": [
          {
            "id": "a",
            "text": "Отвергаем нулевую гипотезу"
          },
          {
            "id": "b",
            "text": "Принимаем нулевую гипотезу"
          },
          {
            "id": "c",
            "text": "Не можем принять решение"
          },
          {
            "id": "d",
            "text": "Увеличиваем alpha"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q12-6",
        "order": 72,
        "prompt": "Что такое мощность статистического теста?",
        "options": [
          {
            "id": "a",
            "text": "Вероятность отвергнуть ложную нулевую гипотезу"
          },
          {
            "id": "b",
            "text": "Вероятность принять верную нулевую гипотезу"
          },
          {
            "id": "c",
            "text": "Уровень значимости"
          },
          {
            "id": "d",
            "text": "p-value"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-13",
    "title": "Тема 13. Основы машинного обучения",
    "subtitle": "Быстрый тематический квиз",
    "type": "quiz",
    "durationMinutes": 18,
    "maxPoints": 30,
    "questions": [
      {
        "id": "q13-1",
        "order": 73,
        "prompt": "Что такое переобучение (overfitting)?",
        "options": [
          {
            "id": "a",
            "text": "Модель слишком простая для данных"
          },
          {
            "id": "b",
            "text": "Модель слишком хорошо учится на тренировочных данных"
          },
          {
            "id": "c",
            "text": "Модель не обучается вообще"
          },
          {
            "id": "d",
            "text": "Модель работает одинаково на всех данных"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q13-2",
        "order": 74,
        "prompt": "Какой метод борьбы с переобучением НЕ существует?",
        "options": [
          {
            "id": "a",
            "text": "Регуляризация"
          },
          {
            "id": "b",
            "text": "Увеличение количества параметров"
          },
          {
            "id": "c",
            "text": "Кросс-валидация"
          },
          {
            "id": "d",
            "text": "Упрощение модели"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q13-3",
        "order": 75,
        "prompt": "Что такое кросс-валидация?",
        "options": [
          {
            "id": "a",
            "text": "Метод оценки модели на нескольких подвыборках"
          },
          {
            "id": "b",
            "text": "Метод увеличения данных"
          },
          {
            "id": "c",
            "text": "Метод отбора признаков"
          },
          {
            "id": "d",
            "text": "Метод борьбы с переобучением"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q13-4",
        "order": 76,
        "prompt": "Какой процент данных обычно идет в тестовую выборку?",
        "options": [
          {
            "id": "a",
            "text": "20-30%"
          },
          {
            "id": "b",
            "text": "50%"
          },
          {
            "id": "c",
            "text": "70-80%"
          },
          {
            "id": "d",
            "text": "90%"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-14",
    "title": "Тема 14. Линейная и логистическая регрессия",
    "subtitle": "Быстрый тематический квиз",
    "type": "quiz",
    "durationMinutes": 18,
    "maxPoints": 30,
    "questions": [
      {
        "id": "q14-1",
        "order": 77,
        "prompt": "Линейная регрессия решает задачу:",
        "options": [
          {
            "id": "a",
            "text": "Классификации"
          },
          {
            "id": "b",
            "text": "Кластеризации"
          },
          {
            "id": "c",
            "text": "Регрессии"
          },
          {
            "id": "d",
            "text": "Снижения размерности"
          }
        ],
        "correctOption": "c"
      },
      {
        "id": "q14-2",
        "order": 78,
        "prompt": "Логистическая регрессия возвращает:",
        "options": [
          {
            "id": "a",
            "text": "Непрерывное числовое значение"
          },
          {
            "id": "b",
            "text": "Вероятность принадлежности к классу"
          },
          {
            "id": "c",
            "text": "Расстояние до центра кластера"
          },
          {
            "id": "d",
            "text": "Коэффициенты важности признаков"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q14-3",
        "order": 79,
        "prompt": "Что такое регуляризация в линейной регрессии?",
        "options": [
          {
            "id": "a",
            "text": "Добавление штрафа за большие коэффициенты"
          },
          {
            "id": "b",
            "text": "Увеличение сложности модели"
          },
          {
            "id": "c",
            "text": "Удаление незначимых признаков"
          },
          {
            "id": "d",
            "text": "Нормализация данных"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q14-4",
        "order": 80,
        "prompt": "Какая функция активации используется в логистической регрессии?",
        "options": [
          {
            "id": "a",
            "text": "Сигмоида"
          },
          {
            "id": "b",
            "text": "ReLU"
          },
          {
            "id": "c",
            "text": "Tanh"
          },
          {
            "id": "d",
            "text": "Linear"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-15",
    "title": "Тема 15. Методы кластеризации данных",
    "subtitle": "Расширенная контрольная работа",
    "type": "control",
    "durationMinutes": 22,
    "maxPoints": 40,
    "questions": [
      {
        "id": "q15-1",
        "order": 81,
        "prompt": "Какой алгоритм кластеризации требует указания количества кластеров?",
        "options": [
          {
            "id": "a",
            "text": "K-means"
          },
          {
            "id": "b",
            "text": "DBSCAN"
          },
          {
            "id": "c",
            "text": "Иерархическая кластеризация"
          },
          {
            "id": "d",
            "text": "OPTICS"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q15-2",
        "order": 82,
        "prompt": "Что такое метод локтя (elbow method)?",
        "options": [
          {
            "id": "a",
            "text": "Метод выбора оптимального k в K-means"
          },
          {
            "id": "b",
            "text": "Алгоритм кластеризации"
          },
          {
            "id": "c",
            "text": "Метод визуализации данных"
          },
          {
            "id": "d",
            "text": "Статистический тест"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q15-3",
        "order": 83,
        "prompt": "Какой алгоритм кластеризации может обнаруживать кластеры произвольной формы?",
        "options": [
          {
            "id": "a",
            "text": "DBSCAN"
          },
          {
            "id": "b",
            "text": "K-means"
          },
          {
            "id": "c",
            "text": "Иерархическая кластеризация"
          },
          {
            "id": "d",
            "text": "Gaussian Mixture Models"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q15-4",
        "order": 84,
        "prompt": "Что такое \"silhouette score\"?",
        "options": [
          {
            "id": "a",
            "text": "Метрика качества кластеризации"
          },
          {
            "id": "b",
            "text": "Метод выбора количества кластеров"
          },
          {
            "id": "c",
            "text": "Алгоритм кластеризации"
          },
          {
            "id": "d",
            "text": "Метод визуализации кластеров"
          }
        ],
        "correctOption": "a"
      }
    ]
  },
  {
    "id": "topic-16",
    "title": "Тема 16. Снижение размерности данных",
    "subtitle": "Быстрый тематический квиз",
    "type": "quiz",
    "durationMinutes": 18,
    "maxPoints": 30,
    "questions": [
      {
        "id": "q16-1",
        "order": 85,
        "prompt": "Какова основная цель PCA?",
        "options": [
          {
            "id": "a",
            "text": "Увеличение количества признаков"
          },
          {
            "id": "b",
            "text": "Уменьшение размерности с сохранением информации"
          },
          {
            "id": "c",
            "text": "Классификация данных"
          },
          {
            "id": "d",
            "text": "Нормализация данных"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q16-2",
        "order": 86,
        "prompt": "Как интерпретировать главные компоненты в PCA?",
        "options": [
          {
            "id": "a",
            "text": "Это случайные комбинации признаков"
          },
          {
            "id": "b",
            "text": "Это направления максимальной дисперсии"
          },
          {
            "id": "c",
            "text": "Это центры кластеров"
          },
          {
            "id": "d",
            "text": "Это средние значения признаков"
          }
        ],
        "correctOption": "b"
      },
      {
        "id": "q16-3",
        "order": 87,
        "prompt": "Какой метод снижения размерности является линейным?",
        "options": [
          {
            "id": "a",
            "text": "PCA"
          },
          {
            "id": "b",
            "text": "t-SNE"
          },
          {
            "id": "c",
            "text": "UMAP"
          },
          {
            "id": "d",
            "text": "Isomap"
          }
        ],
        "correctOption": "a"
      },
      {
        "id": "q16-4",
        "order": 88,
        "prompt": "Как выбрать количество главных компонент в PCA?",
        "options": [
          {
            "id": "a",
            "text": "По точке излома на графике объясненной дисперсии"
          },
          {
            "id": "b",
            "text": "Случайным образом"
          },
          {
            "id": "c",
            "text": "Всегда брать 2 компоненты"
          },
          {
            "id": "d",
            "text": "По количеству исходных признаков"
          }
        ],
        "correctOption": "a"
      }
    ]
  }
] as const;
