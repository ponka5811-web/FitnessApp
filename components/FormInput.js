// components/FormInput.js
// Reusable styled text input used in the Add Exercise form.

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  error,
  keyboardType = 'default',
}) {
  // Track focus state for an active border highlight
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {/* Field label */}
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          focused && styles.inputFocused,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#555"
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        keyboardType={keyboardType}
        autoCapitalize="sentences"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // Prevent weird scroll on Android multiline
        textAlignVertical={multiline ? 'top' : 'center'}
      />

      {/* Inline validation error */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    color: '#AAAAAA',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1.5,
    borderColor: '#2E2E2E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#F0F0F0',
    fontSize: 15,
    fontWeight: '500',
  },
  inputFocused: {
    borderColor: '#E8FF47',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  multiline: {
    minHeight: 100,
    paddingTop: 14,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },
});
