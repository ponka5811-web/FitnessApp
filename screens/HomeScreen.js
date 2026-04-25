// screens/HomeScreen.js
// Entry screen showing the full exercise list + quick stats.

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useExercises } from '../context/ExerciseContext';
import ExerciseCard from '../components/ExerciseCard';
import StatsBar from '../components/StatsBar';

export default function HomeScreen({ navigation }) {
  const { exercises, completedIds, completedExercises } = useExercises();

  // ── Render each exercise as a card ──────────────────────────────────────────
  const renderItem = ({ item }) => (
    <ExerciseCard
      exercise={item}
      isCompleted={completedIds.has(item.id)}
      onPress={() =>
        navigation.navigate('ExerciseDetail', { exercise: item })
      }
    />
  );

  // ── Empty state ──────────────────────────────────────────────────────────────
  const EmptyState = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>🏋️</Text>
      <Text style={styles.emptyTitle}>No exercises yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the + button to add your first exercise
      </Text>
    </View>
  );

  // ── Header (rendered as FlatList ListHeaderComponent) ───────────────────────
  const ListHeader = () => (
    <View>
      {/* Hero greeting */}
      <View style={styles.hero}>
        <Text style={styles.greeting}>Good workout,</Text>
        <Text style={styles.heroTitle}>Let's get moving 🔥</Text>
      </View>

      {/* Stats strip */}
      <StatsBar
        total={exercises.length}
        completed={completedExercises.length}
      />

      {/* Section title + shortcut to completed list */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>All Exercises</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Completed')}>
          <Text style={styles.sectionLink}>Completed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Add button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddExercise')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  list: {
    paddingBottom: 100,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
  },
  greeting: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#F0F0F0',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginTop: 4,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
  },
  sectionTitle: {
    color: '#F0F0F0',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  sectionLink: {
    color: '#E8FF47',
    fontSize: 13,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#F0F0F0',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  // Floating action button
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8FF47',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E8FF47',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  fabIcon: {
    fontSize: 32,
    color: '#0D0D0D',
    fontWeight: '700',
    lineHeight: 36,
  },
});
