import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  Award,
  Brain,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [userPoints] = useState(1250);
  const [userLevel] = useState(5);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Профиль</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <User size={48} color="#3b82f6" />
          </View>

          <Text style={styles.userName}>Студент</Text>
          <Text style={styles.userEmail}>student@example.com</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{userPoints}</Text>
              <Text style={styles.statLabel}>Баллов</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{userLevel}</Text>
              <Text style={styles.statLabel}>Уровень</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Игры</Text>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => router.push('/analyst-quiz' as any)}>
            <View style={styles.menuIconContainer}>
              <Brain size={22} color="#8b5cf6" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Кто ты из аналитиков?</Text>
              <Text style={styles.menuDescription}>
                Узнай свой тип личности аналитика
              </Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Достижения</Text>

          <View style={styles.achievementsGrid}>
            <View style={styles.achievementCard}>
              <Award size={32} color="#fbbf24" />
              <Text style={styles.achievementTitle}>Новичок</Text>
              <Text style={styles.achievementDesc}>Пройден 1 курс</Text>
            </View>

            <View style={styles.achievementCard}>
              <Award size={32} color="#d1d5db" />
              <Text style={styles.achievementTitle}>Исследователь</Text>
              <Text style={styles.achievementDesc}>Пройдено 5 курсов</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Настройки</Text>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIconContainer}>
              <Settings size={22} color="#6b7280" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Настройки</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIconContainer}>
              <LogOut size={22} color="#ef4444" />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: '#ef4444' }]}>
                Выйти
              </Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  menuDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  achievementsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});
