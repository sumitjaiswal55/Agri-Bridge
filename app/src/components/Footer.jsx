import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2026 AgriBridge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff'
  },
  text: {
    color: '#666',
    fontSize: 12,
  },
});
