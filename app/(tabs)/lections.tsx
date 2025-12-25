import { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { BookOpen, ChevronRight, List, ArrowLeft, CheckCircle } from 'lucide-react-native';
import { lectionTopics, LectionHeader } from '@/data/lections';

type ViewMode = 'topics' | 'sections' | 'content';

export default function LectionsScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('topics');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedHeader, setSelectedHeader] = useState<LectionHeader | null>(null);
  const [readLections, setReadLections] = useState<Set<string>>(new Set());
  const scrollViewRef = useRef<ScrollView>(null);
  const headerPositions = useRef<{ [key: string]: number }>({});

  const currentTopic = useMemo(() => {
    return lectionTopics.find((topic) => topic.id === selectedTopic);
  }, [selectedTopic]);

  const handleTopicPress = (topicId: string) => {
    setSelectedTopic(topicId);
    setViewMode('sections');
    // Очищаем позиции при смене темы
    headerPositions.current = {};
  };

  const handleHeaderPress = (header: LectionHeader) => {
    const position = headerPositions.current[header.id];
    if (position !== undefined && scrollViewRef.current) {
      // Учитываем padding contentContainer (16) и небольшой отступ сверху (20)
      scrollViewRef.current.scrollTo({ y: Math.max(0, position - 20), animated: true });
    }
  };

  const handleHeaderLayout = (headerId: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    headerPositions.current[headerId] = y;
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

  const handleMarkAsRead = (headerId: string) => {
    setReadLections((prev) => {
      const newSet = new Set(prev);
      newSet.add(headerId);
      return newSet;
    });
  };

  const isLectionRead = (headerId: string) => {
    return readLections.has(headerId);
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
            {lectionTopics.map((topic) => {
              const readCount = topic.headers.filter((h) => isLectionRead(h.id)).length;
              const allRead = readCount === topic.headers.length && topic.headers.length > 0;
              return (
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
                      <View style={styles.topicCardInfo}>
                        <Text style={styles.topicCardCount}>
                          {topic.headers.length} разделов
                        </Text>
                        {allRead && (
                          <View style={styles.readBadge}>
                            <CheckCircle size={14} color="#10b981" />
                            <Text style={styles.readBadgeText}>Прочитано</Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <ChevronRight size={20} color="#9ca3af" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        {viewMode === 'sections' && currentTopic && (
          <ScrollView
            ref={scrollViewRef}
            style={styles.sectionsList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sectionsListContent}>
            {/* Кнопки выбора разделов */}
            {currentTopic.headers.map((header) => {
              const isRead = isLectionRead(header.id);
              return (
                <TouchableOpacity
                  key={header.id}
                  style={[styles.sectionCard, isRead && styles.sectionCardRead]}
                  activeOpacity={0.7}
                  onPress={() => handleHeaderPress(header)}>
                  <View style={styles.sectionCardHeader}>
                    <View style={[styles.sectionCardNumber, isRead && styles.sectionCardNumberRead]}>
                      <Text style={[styles.sectionCardNumberText, isRead && styles.sectionCardNumberTextRead]}>
                        {header.order}
                      </Text>
                    </View>
                    <View style={styles.sectionCardContent}>
                      <Text style={styles.sectionCardTitle}>{header.title}</Text>
                    </View>
                    {isRead ? (
                      <CheckCircle size={20} color="#10b981" />
                    ) : (
                      <ChevronRight size={20} color="#9ca3af" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
            
            {/* Сами лекции и заголовки разделов */}
            {currentTopic.headers.map((header) => {
              const isRead = isLectionRead(header.id);
              return (
                <View 
                  key={`content-${header.id}`} 
                  onLayout={(event) => handleHeaderLayout(header.id, event)}
                  style={styles.sectionContent}>
                  <View style={styles.contentHeader}>
                    <View style={styles.contentHeaderNumber}>
                      <Text style={styles.contentHeaderNumberText}>
                        {header.order}
                      </Text>
                    </View>
                    <Text style={styles.contentHeaderTitle}>
                      {header.title}
                    </Text>
                  </View>
                  <View style={styles.contentText}>
                    <Text style={styles.contentTextBody}>
                      {header.content}
                    </Text>
                  </View>
                  {!isRead && (
                    <TouchableOpacity
                      style={styles.readButton}
                      activeOpacity={0.7}
                      onPress={() => handleMarkAsRead(header.id)}>
                      <CheckCircle size={20} color="#ffffff" />
                      <Text style={styles.readButtonText}>Прочитано</Text>
                    </TouchableOpacity>
                  )}
                  {isRead && (
                    <View style={styles.readIndicator}>
                      <CheckCircle size={20} color="#10b981" />
                      <Text style={styles.readIndicatorText}>Прочитано</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        )}

        {viewMode === 'content' && selectedHeader && (() => {
          const isRead = isLectionRead(selectedHeader.id);
          return (
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
              {!isRead && (
                <TouchableOpacity
                  style={styles.readButton}
                  activeOpacity={0.7}
                  onPress={() => handleMarkAsRead(selectedHeader.id)}>
                  <CheckCircle size={20} color="#ffffff" />
                  <Text style={styles.readButtonText}>Прочитано</Text>
                </TouchableOpacity>
              )}
              {isRead && (
                <View style={styles.readIndicator}>
                  <CheckCircle size={20} color="#10b981" />
                  <Text style={styles.readIndicatorText}>Прочитано</Text>
                </View>
              )}
            </ScrollView>
          );
        })()}
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
  topicCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  readBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  readBadgeText: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '600',
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
  sectionCardRead: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  sectionCardNumberRead: {
    backgroundColor: '#10b981',
    borderColor: '#059669',
  },
  sectionCardNumberTextRead: {
    color: '#ffffff',
  },
  sectionContent: {
    marginTop: 24,
    marginBottom: 8,
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
    textAlign: 'justify',
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  readButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  readIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d1fae5',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
  },
  readIndicatorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
});

