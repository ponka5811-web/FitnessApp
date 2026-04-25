// screens/CompletedScreen.js
// Shows all exercises the user has marked as completed, plus a motivational quote.

import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useExercises } from '../context/ExerciseContext';
import ExerciseCard from '../components/ExerciseCard';

// Rotating motivational quotes
const QUOTES = [
  { text: 'The body achieves what the mind believes.', author: 'Napoleon Hill' },
  { text: 'Strength does not come from the body. It comes from the will of the soul.', author: 'Gandhi' },
  { text: 'Take care of your body. It\'s the only place you have to live.', author: 'Jim Rohn' },
  { text: 'The last three or four reps is what makes the muscle grow.', author: 'Arnold Schwarzenegger' },
  { text: 'A one-hour workout is 4% of your day. No excuses.', author: 'Unknown' },
];

export default function CompletedScreen({ navigation }) {
  const { completedExercises, completedIds } = useExercises();

  // Pick a random quote once on mount
  const quote = useMemo(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
    [],
  );

  const renderItem = ({ item }) => (
    <ExerciseCard
      exercise={item}
      isCompleted={completedIds.has(item.id)}
      onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
    />
  );

  const EmptyState = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>🎯</Text>
      <Text style={styles.emptyTitle}>No completed exercises yet</Text>
      <Text style={styles.emptySubtitle}>
        Open any exercise and tap "Mark as Completed" to track your progress.
      </Text>
      <TouchableOpacity
        style={styles.emptyBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.emptyBtnText}>Browse Exercises →</Text>
      </TouchableOpacity>
    </View>
  );

  const ListHeader = () => (
    <View>
      {/* Motivational quote card */}
      <View style={styles.quoteCard}>
        <Text style={styles.quoteIcon}>"</Text>
        <Text style={styles.quoteText}>{quote.text}</Text>
        <Text style={styles.quoteAuthor}>— {quote.author}</Text>
      </View>

      {completedExercises.length > 0 && (
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>
            Completed ({completedExercises.length})
          </Text>
          <Text style={styles.congrats}>Keep it up! 💪</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={completedExercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={completedExercises.length === 0 ? EmptyState : null}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  list: {
    paddingBottom: 40,
  },
  // ── Quote card ──
  quoteCard: {
    backgroundColor: '#1A1A1A',
    margin: 16,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderLeftWidth: 4,
    borderLeftColor: '#E8FF47',
  },
  quoteIcon: {
    color: '#E8FF47',
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 40,
    marginBottom: 4,
  },
  quoteText: {
    color: '#DDDDDD',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 26,
    fontWeight: '500',
  },
  quoteAuthor: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  sectionTitle: {
    color: '#F0F0F0',
    fontSize: 17,
    fontWeight: '800',
  },
  congrats: {
    color: '#888',
    fontSize: 13,
    fontWeight: '600',
  },
  // ── Empty state ──
  empty: {
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingTop: 20,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#F0F0F0',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyBtn: {
    backgroundColor: '#E8FF47',
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 12,
  },
  emptyBtnText: {
    color: '#0D0D0D',
    fontWeight: '800',
    fontSize: 14,
  },
});
