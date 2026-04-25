// screens/AddExerciseScreen.js
// Form screen to create a new exercise and add it to the global list.

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useExercises } from '../context/ExerciseContext';
import FormInput from '../components/FormInput';

// Available categories for the picker
const CATEGORIES = ['Strength', 'Cardio', 'Core', 'Flexibility'];
const CATEGORY_COLORS = {
  Strength:    '#E8FF47',
  Cardio:      '#FF6B6B',
  Core:        '#47C9FF',
  Flexibility: '#B47FFF',
};

export default function AddExerciseScreen({ navigation }) {
  const { addExercise } = useExercises();

  // ── Form state ───────────────────────────────────────────────────────────────
  const [name, setName]             = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl]     = useState('');
  const [duration, setDuration]     = useState('');
  const [category, setCategory]     = useState('Strength');

  // ── Validation errors ────────────────────────────────────────────────────────
  const [errors, setErrors] = useState({});

  // ── Validation logic ─────────────────────────────────────────────────────────
  const validate = () => {
    const next = {};

    if (!name.trim()) {
      next.name = 'Exercise name is required.';
    } else if (name.trim().length < 2) {
      next.name = 'Name must be at least 2 characters.';
    }

    if (!description.trim()) {
      next.description = 'Description is required.';
    } else if (description.trim().length < 10) {
      next.description = 'Please write a slightly longer description (10+ chars).';
    }

    // Optional image URL – validate format only if provided
    if (imageUrl.trim() && !imageUrl.trim().startsWith('http')) {
      next.imageUrl = 'Please enter a valid URL starting with http(s)://';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // ── Submit handler ───────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!validate()) return;

    addExercise({
      name:        name.trim(),
      description: description.trim(),
      image:       imageUrl.trim() || null,
      duration:    duration.trim() || null,
      category,
    });

    Alert.alert(
      '🎉 Exercise Added!',
      `"${name.trim()}" has been added to your workout list.`,
      [{ text: "Let's go!", onPress: () => navigation.goBack() }],
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Page header */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>New Exercise</Text>
            <Text style={styles.pageSubtitle}>
              Fill in the details below to add to your workout library.
            </Text>
          </View>

          {/* ── Category picker ── */}
          <Text style={styles.fieldLabel}>Category</Text>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              const color  = CATEGORY_COLORS[cat];
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    active && { backgroundColor: color + '22', borderColor: color },
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[styles.categoryChipText, active && { color }]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Form inputs ── */}
          <FormInput
            label="Exercise Name *"
            value={name}
            onChangeText={(t) => { setName(t); setErrors((e) => ({ ...e, name: '' })); }}
            placeholder="e.g. Diamond Push-Ups"
            error={errors.name}
          />

          <FormInput
            label="Description *"
            value={description}
            onChangeText={(t) => { setDescription(t); setErrors((e) => ({ ...e, description: '' })); }}
            placeholder="Describe how to perform this exercise..."
            multiline
            numberOfLines={4}
            error={errors.description}
          />

          <FormInput
            label="Duration / Sets"
            value={duration}
            onChangeText={setDuration}
            placeholder="e.g. 3 sets × 12 reps"
          />

          <FormInput
            label="Image URL (optional)"
            value={imageUrl}
            onChangeText={(t) => { setImageUrl(t); setErrors((e) => ({ ...e, imageUrl: '' })); }}
            placeholder="https://example.com/image.jpg"
            keyboardType="url"
            error={errors.imageUrl}
          />

          {/* ── Submit button ── */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.submitText}>Add Exercise</Text>
          </TouchableOpacity>

          {/* Cancel link */}
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  pageHeader: {
    marginBottom: 26,
  },
  pageTitle: {
    color: '#F0F0F0',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  pageSubtitle: {
    color: '#666',
    fontSize: 14,
    marginTop: 6,
    lineHeight: 22,
  },
  fieldLabel: {
    color: '#AAAAAA',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#2E2E2E',
    backgroundColor: 'transparent',
  },
  categoryChipText: {
    color: '#666',
    fontSize: 13,
    fontWeight: '700',
  },
  submitBtn: {
    backgroundColor: '#E8FF47',
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#E8FF47',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  submitText: {
    color: '#0D0D0D',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 4,
  },
  cancelText: {
    color: '#555',
    fontSize: 15,
    fontWeight: '600',
  },
});
