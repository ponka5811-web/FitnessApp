// components/ExerciseCard.js
// Reusable card displayed in the Home screen FlatList.

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Fallback image when no URL is provided
const PLACEHOLDER =
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80';

// Category badge accent colours
const CATEGORY_COLORS = {
  Strength: '#E8FF47',
  Cardio:   '#FF6B6B',
  Core:     '#47C9FF',
  Flexibility: '#B47FFF',
};

export default function ExerciseCard({ exercise, onPress, isCompleted }) {
  const badgeColor = CATEGORY_COLORS[exercise.category] || '#E8FF47';

  return (
    <TouchableOpacity
      style={[styles.card, isCompleted && styles.cardCompleted]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Thumbnail */}
      <Image
        source={{ uri: exercise.image || PLACEHOLDER }}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      {/* Text content */}
      <View style={styles.info}>
        <View style={styles.topRow}>
          {/* Category badge */}
          {exercise.category ? (
            <View style={[styles.badge, { backgroundColor: badgeColor + '22', borderColor: badgeColor }]}>
              <Text style={[styles.badgeText, { color: badgeColor }]}>
                {exercise.category}
              </Text>
            </View>
          ) : null}

          {/* Completed tick */}
          {isCompleted && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </View>

        <Text style={styles.name} numberOfLines={1}>{exercise.name}</Text>

        {exercise.duration ? (
          <Text style={styles.duration}>{exercise.duration}</Text>
        ) : null}
      </View>

      {/* Right chevron */}
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 7,
    overflow: 'hidden',
    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    // Elevation (Android)
    elevation: 6,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  cardCompleted: {
    borderColor: '#E8FF4760',
    opacity: 0.85,
  },
  thumbnail: {
    width: 84,
    height: 84,
  },
  info: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  checkmark: {
    color: '#E8FF47',
    fontSize: 16,
    fontWeight: '900',
  },
  name: {
    color: '#F0F0F0',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  duration: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  chevron: {
    color: '#555',
    fontSize: 28,
    paddingRight: 14,
    fontWeight: '300',
  },
});
