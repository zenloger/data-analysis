import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { BookOpen, ChevronRight, List, ArrowLeft } from 'lucide-react-native';
import { lectionTopics, LectionHeader } from '@/data/lections';

type ViewMode = 'topics' | 'sections' | 'content';

export default function LectionsScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('topics');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedHeader, setSelectedHeader] = useState<LectionHeader | null>(null);

  const currentTopic = useMemo(() => {
    return lectionTopics.find((topic) => topic.id === selectedTopic);
  }, [selectedTopic]);

  const handleTopicPress = (topicId: string) => {
    setSelectedTopic(topicId);
    setViewMode('sections');
  };

  const handleHeaderPress = (header: LectionHeader) => {
    setSelectedHeader(header);
    setViewMode('content');
  };

  const handleBack = () => {
    if (viewMode === 'content') {
      setViewMode('sections');
      setSelectedHeader(null);
    } else if (viewMode === 'sections') {
      setViewMode('topics');
      setSelectedTopic(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          {viewMode !== 'topics' && (
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backButton}
              activeOpacity={0.7}>
              <ArrowLeft size={24} color="#3b82f6" />
            </TouchableOpacity>
          )}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Лекции</Text>
            <Text style={styles.headerSubtitle}>
              {viewMode === 'topics' && 'Изучайте материалы курса'}
              {viewMode === 'sections' && currentTopic?.title}
              {viewMode === 'content' && selectedHeader?.title}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {viewMode === 'topics' && (
          <ScrollView
            style={styles.topicsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.topicsListContent}>
            {lectionTopics.map((topic) => (
              <TouchableOpacity
                key={topic.id}
                style={styles.topicCard}
                activeOpacity={0.7}
                onPress={() => handleTopicPress(topic.id)}>
                <View style={styles.topicCardHeader}>
                  <View style={styles.topicCardIcon}>
                    <BookOpen size={24} color="#3b82f6" />
                  </View>
                  <View style={styles.topicCardContent}>
                    <Text style={styles.topicCardTitle}>{topic.title}</Text>
                    <Text style={styles.topicCardCount}>
                      {topic.headers.length} разделов
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#9ca3af" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {viewMode === 'sections' && currentTopic && (
          <ScrollView
            style={styles.sectionsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sectionsListContent}>
            {currentTopic.headers.map((header) => (
              <TouchableOpacity
                key={header.id}
                style={styles.sectionCard}
                activeOpacity={0.7}
                onPress={() => handleHeaderPress(header)}>
                <View style={styles.sectionCardHeader}>
                  <View style={styles.sectionCardNumber}>
                    <Text style={styles.sectionCardNumberText}>
                      {header.order}
                    </Text>
                  </View>
                  <View style={styles.sectionCardContent}>
                    <Text style={styles.sectionCardTitle}>{header.title}</Text>
                  </View>
                  <ChevronRight size={20} color="#9ca3af" />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {viewMode === 'content' && selectedHeader && (
          <ScrollView
            style={styles.contentView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentViewContent}>
            <View style={styles.contentHeader}>
              <View style={styles.contentHeaderNumber}>
                <Text style={styles.contentHeaderNumberText}>
                  {selectedHeader.order}
                </Text>
              </View>
              <Text style={styles.contentHeaderTitle}>
                {selectedHeader.title}
              </Text>
            </View>
            <View style={styles.contentText}>
              <Text style={styles.contentTextBody}>
                {selectedHeader.content}
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTextContainer: {
    flex: 1,
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
  content: {
    flex: 1,
  },
  topicsList: {
    flex: 1,
  },
  topicsListContent: {
    padding: 16,
    gap: 12,
  },
  topicCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  topicCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  topicCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicCardContent: {
    flex: 1,
  },
  topicCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 22,
  },
  topicCardCount: {
    fontSize: 13,
    color: '#6b7280',
  },
  sectionsList: {
    flex: 1,
  },
  sectionsListContent: {
    padding: 16,
    gap: 12,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionCardNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionCardNumberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3b82f6',
  },
  sectionCardContent: {
    flex: 1,
  },
  sectionCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 22,
  },
  contentView: {
    flex: 1,
  },
  contentViewContent: {
    padding: 16,
  },
  contentHeader: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contentHeaderNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  contentHeaderNumberText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b82f6',
  },
  contentHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 28,
  },
  contentText: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contentTextBody: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
});

