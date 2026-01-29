import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

const FEATURED_PRODUCTS = [
  { id: '1', name: 'Fresh Tomatoes', price: '₹40/kg', category: 'Vegetables', rating: 4.8 },
  { id: '2', name: 'Organic Spinach', price: '₹45/kg', category: 'Leafy Greens', rating: 4.7 },
  { id: '3', name: 'Carrots', price: '₹35/kg', category: 'Root Vegetables', rating: 4.9 },
];

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🌾</Text>
          <Text style={styles.heroTitle}>AgriBridge</Text>
          <Text style={styles.heroSubtitle}>Fresh Produce Straight from Farmers</Text>
          <View style={styles.heroButtons}>
            <Button
              title="Browse as Buyer"
              onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}
            />
          </View>
        </View>

        {/* Why Choose Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose AgriBridge?</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🚚</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Fast Delivery</Text>
                <Text style={styles.featureDesc}>Delivered within 24 hours</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>💚</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>100% Fresh</Text>
                <Text style={styles.featureDesc}>Picked at peak ripeness</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>💰</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Best Prices</Text>
                <Text style={styles.featureDesc}>No middlemen, fair rates</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🌱</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>100% Organic</Text>
                <Text style={styles.featureDesc}>No pesticides or chemicals</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Farmers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50K+</Text>
            <Text style={styles.statLabel}>Happy Customers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Satisfied</Text>
          </View>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Today</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}>
              <Text style={styles.viewAll}>View All →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsContainer}>
            {FEATURED_PRODUCTS.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}
              />
            ))}
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepsList}>
            <View style={styles.stepCard}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepTitle}>Sign Up</Text>
              <Text style={styles.stepDesc}>Create your buyer account</Text>
            </View>
            <View style={styles.stepCard}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepTitle}>Browse</Text>
              <Text style={styles.stepDesc}>Explore fresh products</Text>
            </View>
            <View style={styles.stepCard}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepTitle}>Order</Text>
              <Text style={styles.stepDesc}>Place your order</Text>
            </View>
            <View style={styles.stepCard}>
              <Text style={styles.stepNumber}>4</Text>
              <Text style={styles.stepTitle}>Enjoy</Text>
              <Text style={styles.stepDesc}>Fresh delivery to home</Text>
            </View>
          </View>
        </View>

        {/* Farmer CTA */}
        <View style={styles.farmerSection}>
          <Text style={styles.farmerTitle}>Are You a Farmer?</Text>
          <Text style={styles.farmerDesc}>
            Join thousands of farmers earning better prices by selling directly to customers
          </Text>
          <Button
            title="Register as Farmer"
            onPress={() => navigation.navigate('AuthStack', { screen: 'Signup' })}
            variant="secondary"
          />
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Our Customers Say</Text>
          <View style={styles.testimonialsList}>
            <View style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>
                "Best quality vegetables I've ever bought! Fresh and delivered on time." - Priya
              </Text>
              <Text style={styles.rating}>⭐⭐⭐⭐⭐</Text>
            </View>
            <View style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>
                "Amazing prices and super fast delivery. Highly recommended!" - Rajesh
              </Text>
              <Text style={styles.rating}>⭐⭐⭐⭐⭐</Text>
            </View>
          </View>
        </View>

        {/* Download App Section */}
        <View style={styles.downloadSection}>
          <Text style={styles.downloadTitle}>Get Started Today</Text>
          <Button
            title="Login to Browse"
            onPress={() => navigation.navigate('AuthStack', { screen: 'Login' })}
          />
          <TouchableOpacity style={styles.signupLink} onPress={() => navigation.navigate('AuthStack', { screen: 'Signup' })}>
            <Text style={styles.signupText}>Don't have an account? Sign up now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  hero: {
    backgroundColor: '#2d5016',
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 70,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#d4edda',
    marginBottom: 24,
    textAlign: 'center',
  },
  heroButtons: {
    width: '100%',
  },
  section: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5016',
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    gap: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  featureEmoji: {
    fontSize: 28,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#999',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d5016',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  productsContainer: {
    gap: 12,
  },
  stepsList: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stepCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2d5016',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  farmerSection: {
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: '#f0f7f1',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2d5016',
  },
  farmerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  farmerDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  testimonialsList: {
    gap: 12,
  },
  testimonialCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  testimonialText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  rating: {
    fontSize: 14,
  },
  downloadSection: {
    marginHorizontal: 16,
    marginVertical: 24,
    marginBottom: 40,
  },
  downloadTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  signupLink: {
    marginTop: 12,
    alignItems: 'center',
  },
  signupText: {
    color: '#2d5016',
    fontSize: 14,
    fontWeight: '600',
  },
});
