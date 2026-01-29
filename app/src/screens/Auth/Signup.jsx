import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

export default function Signup({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('buyer'); // 'buyer' or 'farmer'
  const [farmName, setFarmName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (userRole === 'farmer' && !farmName) {
      Alert.alert('Error', 'Please enter farm name');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        Alert.alert('Success', 'Account created! Please login.');
        setLoading(false);
        navigation.navigate('Login');
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Signup failed');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.emoji}>🌾</Text>
          <Text style={styles.appName}>AgriBridge</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join AgriBridge to get started</Text>

          {/* Role Selection */}
          <View style={styles.roleSection}>
            <Text style={styles.roleLabel}>Sign up as:</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity
                style={[styles.roleButton, userRole === 'buyer' && styles.roleButtonActive]}
                onPress={() => setUserRole('buyer')}
              >
                <Text style={styles.roleButtonEmoji}>🛒</Text>
                <Text style={[styles.roleButtonText, userRole === 'buyer' && styles.roleButtonTextActive]}>
                  Buyer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.roleButton, userRole === 'farmer' && styles.roleButtonActive]}
                onPress={() => setUserRole('farmer')}
              >
                <Text style={styles.roleButtonEmoji}>👨‍🌾</Text>
                <Text style={[styles.roleButtonText, userRole === 'farmer' && styles.roleButtonTextActive]}>
                  Farmer
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.form}>
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              editable={!loading}
            />

            {userRole === 'farmer' && (
              <InputField
                label="Farm Name"
                placeholder="Enter your farm name"
                value={farmName}
                onChangeText={setFarmName}
                editable={!loading}
              />
            )}

            <InputField
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!loading}
            />

            {userRole === 'farmer' && (
              <InputField
                label="Phone Number"
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                editable={!loading}
              />
            )}

            <InputField
              label="Password"
              placeholder="At least 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />

            <InputField
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!loading}
            />

            <Button
              title={loading ? 'Creating Account...' : 'Create Account'}
              onPress={handleSignup}
              loading={loading}
            />

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.line} />
            </View>

            <Button
              title="Continue as Guest"
              onPress={() => navigation.navigate('Home', { screen: 'Home' })}
              variant="secondary"
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d5016',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  roleSection: {
    marginBottom: 24,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  roleButtonActive: {
    borderColor: '#2d5016',
    backgroundColor: '#f0f7f1',
  },
  roleButtonEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  roleButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#2d5016',
  },
  form: {
    gap: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#999',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  link: {
    color: '#2d5016',
    fontSize: 14,
    fontWeight: '700',
  },
});
