import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/database';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react-native';

export default function LeaderboardScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    loadLeaderboard();
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
  }

  async function loadLeaderboard() {
    try {
      setLoading(true);
      setError(null);

      // const { data, error: fetchError } = await supabase
      //   .from('profiles')
      //   .select('*')
      //   .order('total_points', { ascending: false })
      //   .limit(100);

      const data = null;
      const fetchError = null;

      if (fetchError) throw fetchError;
      setProfiles(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось загрузить рейтинг'
      );
    } finally {
      setLoading(false);
    }
  }

  function getRankIcon(rank: number) {
    switch (rank) {
      case 1:
        return <Trophy size={24} color="#fbbf24" />;
      case 2:
        return <Medal size={24} color="#9ca3af" />;
      case 3:
        return <Medal size={24} color="#d97706" />;
      default:
        return null;
    }
  }

  function calculatePercentile(rank: number, total: number): number {
    if (total === 0) return 0;
    return Math.round(((total - rank + 1) / total) * 100);
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Загрузка рейтинга...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadLeaderboard}>
          <Text style={styles.retryButtonText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Рейтинг</Text>
        <Text style={styles.headerSubtitle}>
          Топ {profiles.length} участников
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {profiles.length === 0 ? (
          <View style={styles.emptyState}>
            <Trophy size={64} color="#d1d5db" />
            <Text style={styles.emptyText}>
              Рейтинг пока пуст.{'\n'}Начните проходить курсы и зарабатывайте
              баллы!
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <TrendingUp size={20} color="#3b82f6" />
                <Text style={styles.statLabel}>Всего участников</Text>
                <Text style={styles.statValue}>{profiles.length}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Award size={20} color="#10b981" />
                <Text style={styles.statLabel}>Лучший результат</Text>
                <Text style={styles.statValue}>
                  {profiles[0]?.total_points || 0} баллов
                </Text>
              </View>
            </View>

            {profiles.map((profile, index) => {
              const rank = index + 1;
              const percentile = calculatePercentile(rank, profiles.length);
              const isCurrentUser = profile.id === currentUserId;

              return (
                <View
                  key={profile.id}
                  style={[
                    styles.userCard,
                    isCurrentUser && styles.currentUserCard,
                  ]}>
                  <View style={styles.rankContainer}>
                    {rank <= 3 ? (
                      getRankIcon(rank)
                    ) : (
                      <Text style={styles.rankText}>{rank}</Text>
                    )}
                  </View>

                  <View style={styles.userInfo}>
                    <View style={styles.userNameRow}>
                      <Text
                        style={[
                          styles.userName,
                          isCurrentUser && styles.currentUserName,
                        ]}>
                        {profile.full_name || 'Аноним'}
                      </Text>
                      {isCurrentUser && (
                        <View style={styles.youBadge}>
                          <Text style={styles.youBadgeText}>Вы</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.userMetaRow}>
                      <Text style={styles.levelText}>
                        Уровень {profile.level}
                      </Text>
                      <Text style={styles.percentileText}>
                        Топ {percentile}%
                      </Text>
                    </View>
                  </View>

                  <View style={styles.pointsContainer}>
                    <Text style={styles.pointsText}>{profile.total_points}</Text>
                    <Text style={styles.pointsLabel}>баллов</Text>
                  </View>
                </View>
              );
            })}
          </>
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
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  currentUserCard: {
    borderColor: '#3b82f6',
    borderWidth: 2,
    backgroundColor: '#eff6ff',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6b7280',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  currentUserName: {
    color: '#3b82f6',
  },
  youBadge: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  youBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },
  userMetaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  levelText: {
    fontSize: 13,
    color: '#6b7280',
  },
  percentileText: {
    fontSize: 13,
    color: '#10b981',
    fontWeight: '600',
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  pointsLabel: {
    fontSize: 11,
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
