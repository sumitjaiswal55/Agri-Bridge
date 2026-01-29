import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import Button from '../../components/Button';

const QUICK_LINKS = [
  { id: '1', title: 'Browse Products', icon: '🛒', screen: 'Products' },
  { id: '2', title: 'My Cart', icon: '🛍️', screen: 'Cart' },
  { id: '3', title: 'Orders', icon: '📦', screen: 'Orders' },
  { id: '4', title: 'My Profile', icon: '👤', screen: 'Profile' },
];

const RECENT_ORDERS = [
  { id: '1', name: 'Tomatoes (2kg)', price: '₹80', date: 'Today', status: 'Delivered' },
  { id: '2', name: 'Spinach (1kg)', price: '₹45', date: 'Yesterday', status: 'In Transit' },
];

export default function BuyerDashboard({ navigation }) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Sumit! 👋</Text>
            <Text style={styles.subtitle}>Welcome to AgriBridge</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Links Grid */}
        <View style={styles.quickLinksSection}>
          <View style={styles.linksRow}>
            {QUICK_LINKS.slice(0, 2).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.linkCard}
                onPress={() => navigation.navigate('Products')}
              >
                <Text style={styles.linkEmoji}>{item.icon}</Text>
                <Text style={styles.linkTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.linksRow}>
            {QUICK_LINKS.slice(2, 4).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.linkCard}
                onPress={() => navigation.navigate('Products')}
              >
                <Text style={styles.linkEmoji}>{item.icon}</Text>
                <Text style={styles.linkTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoTitle}>🎉 Fresh Harvest Sale</Text>
          <Text style={styles.promoDesc}>Get 20% off on all vegetables this week!</Text>
          <Button title="Shop Now" onPress={() => navigation.navigate('Products')} />
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All →</Text>
            </TouchableOpacity>
          </View>

          {RECENT_ORDERS.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderName}>{order.name}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={styles.orderStatus}>
                <Text style={styles.orderPrice}>{order.price}</Text>
                <Text
                  style={[
                    styles.orderStatusText,
                    order.status === 'Delivered'
                      ? styles.statusDelivered
                      : styles.statusInTransit,
                  ]}
                >
                  {order.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Featured Farmers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Farmers</Text>
          <View style={styles.farmersContainer}>
            {[1, 2, 3].map((i) => (
              <TouchableOpacity key={i} style={styles.farmerCard}>
                <Text style={styles.farmerAvatar}>👨‍🌾</Text>
                <Text style={styles.farmerName}>Farmer {i}</Text>
                <Text style={styles.farmerLocation}>🌱 Local Farm</Text>
                <Button title="Visit" size="small" onPress={() => {}} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Why AgriBridge */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Shop with Us?</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureRow}>
              <Text style={styles.checkmark}>✓</Text>
              <View>
                <Text style={styles.featureTitle}>Fresh Daily</Text>
                <Text style={styles.featureDesc}>Picked & delivered same day</Text>
              </View>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.checkmark}>✓</Text>
              <View>
                <Text style={styles.featureTitle}>Fair Prices</Text>
                <Text style={styles.featureDesc}>Direct from farmers, no markup</Text>
              </View>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.checkmark}>✓</Text>
              <View>
                <Text style={styles.featureTitle}>Quality Assured</Text>
                <Text style={styles.featureDesc}>100% organic, pesticide-free</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.footer}>
          <Button
            title="Logout"
            onPress={() => navigation.navigate('HomeStack', { screen: 'Home' })}
            variant="secondary"
          />
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
  header: {
    backgroundColor: '#2d5016',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#d4edda',
    marginTop: 4,
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    fontSize: 20,
  },
  quickLinksSection: {
    paddingHorizontal: 16,
    marginVertical: 20,
    gap: 12,
  },
  linksRow: {
    flexDirection: 'row',
    gap: 12,
  },
  linkCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  linkEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  linkTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  promoBanner: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  promoDesc: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5016',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  orderInfo: {
    flex: 1,
  },
  orderName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
  },
  orderStatus: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2d5016',
    marginBottom: 4,
  },
  orderStatusText: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusDelivered: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusInTransit: {
    backgroundColor: '#cfe2ff',
    color: '#084298',
  },
  farmersContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  farmerCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  farmerAvatar: {
    fontSize: 32,
    marginBottom: 8,
  },
  farmerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  farmerLocation: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  featuresList: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    gap: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  checkmark: {
    fontSize: 18,
    color: '#2d5016',
    fontWeight: '700',
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});
