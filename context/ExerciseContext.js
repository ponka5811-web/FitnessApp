// context/ExerciseContext.js
// Global state management using React Context API.
// Provides exercises list and completed exercises to all screens.

import React, { createContext, useContext, useState } from 'react';

// ── Default seed data ──────────────────────────────────────────────────────────
const DEFAULT_EXERCISES = [
  {
    id: '1',
    name: 'Push-Ups',
    description:
      'A classic upper-body exercise that targets the chest, shoulders, and triceps. Keep your core tight and lower yourself until your chest nearly touches the floor.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    duration: '3 sets × 15 reps',
    category: 'Strength',
  },
  {
    id: '2',
    name: 'Squats',
    description:
      'The king of lower-body exercises. Targets quads, hamstrings, and glutes. Keep your chest up, weight in your heels, and knees tracking over your toes.',
    image: 'https://images.unsplash.com/photo-1567598508481-65985588e295?w=400&q=80',
    duration: '4 sets × 12 reps',
    category: 'Strength',
  },
  {
    id: '3',
    name: 'Plank',
    description:
      'An isometric core exercise that strengthens your entire midsection. Keep your body in a straight line from head to heels. Breathe steadily throughout.',
    image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&q=80',
    duration: '3 sets × 60 sec',
    category: 'Core',
  },
  {
    id: '4',
    name: 'Jumping Jacks',
    description:
      'A full-body cardio warm-up that elevates your heart rate and loosens your joints. Coordinate arms and legs for smooth, rhythmic movement.',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400&q=80',
    duration: '3 sets × 30 reps',
    category: 'Cardio',
  },
  {
    id: '5',
    name: 'Lunges',
    description:
      'A unilateral lower-body movement that improves balance and leg strength. Step forward, lower your back knee toward the floor, then drive back up.',
    image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=400&q=80',
    duration: '3 sets × 10 each leg',
    category: 'Strength',
  },
  {
    id: '6',
    name: 'Burpees',
    description:
      'A high-intensity full-body exercise combining a squat, plank, push-up, and jump. Excellent for cardiovascular endurance and burning calories fast.',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&q=80',
    duration: '3 sets × 10 reps',
    category: 'Cardio',
  },
];

// ── Context creation ───────────────────────────────────────────────────────────
const ExerciseContext = createContext(null);

// ── Provider component ─────────────────────────────────────────────────────────
export function ExerciseProvider({ children }) {
  const [exercises, setExercises] = useState(DEFAULT_EXERCISES);
  const [completedIds, setCompletedIds] = useState(new Set());

  /** Add a brand-new exercise to the list */
  const addExercise = (exercise) => {
    const newExercise = {
      ...exercise,
      id: Date.now().toString(), // simple unique ID
    };
    setExercises((prev) => [newExercise, ...prev]);
  };

  /** Toggle the completed state of an exercise */
  const toggleComplete = (id) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const isCompleted = (id) => completedIds.has(id);

  const completedExercises = exercises.filter((e) => completedIds.has(e.id));

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        completedExercises,
        completedIds,
        addExercise,
        toggleComplete,
        isCompleted,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

// ── Custom hook ────────────────────────────────────────────────────────────────
export function useExercises() {
  const ctx = useContext(ExerciseContext);
  if (!ctx) throw new Error('useExercises must be used inside ExerciseProvider');
  return ctx;
}
