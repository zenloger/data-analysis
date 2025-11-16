import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { TrendingUp } from 'lucide-react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)' as any);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TrendingUp size={80} color="#3b82f6" strokeWidth={2.5} />
      </View>

      <Text style={styles.title}>Анализ Данных</Text>
      <Text style={styles.subtitle}>Обучение от основ до профессионала</Text>

      <View style={styles.loader}>
        <View style={styles.loaderDot} />
        <View style={[styles.loaderDot, styles.loaderDotDelay1]} />
        <View style={[styles.loaderDot, styles.loaderDotDelay2]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 48,
  },
  loader: {
    flexDirection: 'row',
    gap: 8,
  },
  loaderDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3b82f6',
  },
  loaderDotDelay1: {
    opacity: 0.6,
  },
  loaderDotDelay2: {
    opacity: 0.3,
  },
});
