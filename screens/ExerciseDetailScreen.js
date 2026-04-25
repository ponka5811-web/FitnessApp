// screens/ExerciseDetailScreen.js
// Full-detail view of a single exercise with a complete/undo toggle.

import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useExercises } from '../context/ExerciseContext';

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80';

// Category badge colours (must match ExerciseCard)
const CATEGORY_COLORS = {
  Strength:    '#E8FF47',
  Cardio:      '#FF6B6B',
  Core:        '#47C9FF',
  Flexibility: '#B47FFF',
};

export default function ExerciseDetailScreen({ route }) {
  // Exercise data is passed via navigation params
  const { exercise } = route.params;
  const { toggleComplete, isCompleted } = useExercises();

  const completed = isCompleted(exercise.id);
  const badgeColor = CATEGORY_COLORS[exercise.category] || '#E8FF47';

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: exercise.image || PLACEHOLDER }}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Overlay gradient text */}
          {completed && (
            <View style={styles.completedOverlay}>
              <Text style={styles.completedOverlayText}>✓  Completed</Text>
            </View>
          )}
        </View>

        {/* Content block */}
        <View style={styles.body}>
          {/* Category badge */}
          {exercise.category && (
            <View style={[styles.badge, { backgroundColor: badgeColor + '22', borderColor: badgeColor }]}>
              <Text style={[styles.badgeText, { color: badgeColor }]}>
                {exercise.category}
              </Text>
            </View>
          )}

          {/* Title */}
          <Text style={styles.title}>{exercise.name}</Text>

          {/* Duration / sets info */}
          {exercise.duration && (
            <View style={styles.durationRow}>
              <Text style={styles.durationIcon}>⏱</Text>
              <Text style={styles.durationText}>{exercise.duration}</Text>
            </View>
          )}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionLabel}>About this exercise</Text>
          <Text style={styles.description}>{exercise.description}</Text>

          {/* Tips block */}
          <View style={styles.tipsBox}>
            <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
            <Text style={styles.tipsText}>
              • Focus on form over speed{'\n'}
              • Breathe out on exertion{'\n'}
              • Rest 60–90 sec between sets{'\n'}
              • Hydrate before and after
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky bottom CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.ctaButton, completed && styles.ctaButtonDone]}
          onPress={() => toggleComplete(exercise.id)}
          activeOpacity={0.85}
        >
          <Text style={[styles.ctaText, completed && styles.ctaTextDone]}>
            {completed ? '✓  Mark as Incomplete' : 'Mark as Completed'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 30,
  },
  // ── Image ──
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 260,
  },
  completedOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E8FF4799',
    paddingVertical: 10,
    alignItems: 'center',
  },
  completedOverlayText: {
    color: '#0D0D0D',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  // ── Body ──
  body: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: '#F0F0F0',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  durationIcon: {
    fontSize: 16,
  },
  durationText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 20,
  },
  sectionLabel: {
    color: '#666',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  description: {
    color: '#CCCCCC',
    fontSize: 15,
    lineHeight: 25,
    fontWeight: '400',
  },
  tipsBox: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 18,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  tipsTitle: {
    color: '#F0F0F0',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  tipsText: {
    color: '#999',
    fontSize: 14,
    lineHeight: 24,
  },
  // ── Footer CTA ──
  footer: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#0D0D0D',
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
  },
  ctaButton: {
    backgroundColor: '#E8FF47',
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: '#E8FF47',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  ctaButtonDone: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1.5,
    borderColor: '#E8FF47',
    shadowOpacity: 0,
    elevation: 0,
  },
  ctaText: {
    color: '#0D0D0D',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  ctaTextDone: {
    color: '#E8FF47',
  },
});
