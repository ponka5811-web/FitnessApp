// App.js
// Root component. Wires together:
//   - NavigationContainer  (React Navigation)
//   - SafeAreaProvider     (for notch / status-bar aware layout)
//   - ExerciseProvider     (global Context API state)
//   - AppNavigator         (Stack screens)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { ExerciseProvider } from './context/ExerciseContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    // SafeAreaProvider must wrap the whole tree so SafeAreaView works everywhere
    <SafeAreaProvider>
      {/* ExerciseProvider gives all screens access to shared exercise state */}
      <ExerciseProvider>
        {/* NavigationContainer manages the navigation tree */}
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ExerciseProvider>

      {/* Light-content icons on the dark background */}
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
