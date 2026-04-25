// navigation/AppNavigator.js
// Stack navigator wiring all screens together.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import AddExerciseScreen from '../screens/AddExerciseScreen';
import CompletedScreen from '../screens/CompletedScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

// Shared dark header style used across the whole app
const HEADER_STYLE = {
  headerStyle: { backgroundColor: '#0D0D0D' },
  headerTintColor: '#E8FF47',          // neon-lime accent
  headerTitleStyle: {
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  headerBackTitleVisible: false,
};

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={HEADER_STYLE}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }} // hide header ONLY here
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '💪 FitTrack' }}
      />

      <Stack.Screen
        name="ExerciseDetail"
        component={ExerciseDetailScreen}
        options={{ title: 'Exercise Detail' }}
      />

      <Stack.Screen
        name="AddExercise"
        component={AddExerciseScreen}
        options={{ title: 'Add Exercise' }}
      />

      <Stack.Screen
        name="Completed"
        component={CompletedScreen}
        options={{ title: 'Completed ✅' }}
      />
    </Stack.Navigator>
  );
}
