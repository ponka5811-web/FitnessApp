// components/StatsBar.js
// Small summary strip shown at the top of the Home screen.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function StatItem({ value, label, accent }) {
  return (
    <View style={styles.item}>
      <Text style={[styles.value, { color: accent }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default function StatsBar({ total, completed }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={styles.bar}>
      <StatItem value={total}     label="Total"     accent="#E8FF47" />
      <View style={styles.divider} />
      <StatItem value={completed} label="Done"      accent="#47C9FF" />
      <View style={styles.divider} />
      <StatItem value={`${pct}%`} label="Progress"  accent="#B47FFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  label: {
    color: '#666',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: '#2E2E2E',
  },
});
