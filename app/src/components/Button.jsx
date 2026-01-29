import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function Button({ title, onPress, loading = false, variant = 'primary', size = 'medium' }) {
  const isSmall = size === 'small';
  
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        variant === 'primary' ? styles.primary : styles.secondary,
        isSmall && styles.smallBtn,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#2d5016'} />
      ) : (
        <Text style={[
          styles.text,
          variant === 'primary' ? styles.primaryText : styles.secondaryText,
          isSmall && styles.smallText,
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: '#2d5016',
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2d5016',
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
  },
  smallText: {
    fontSize: 14,
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#2d5016',
  },
});
