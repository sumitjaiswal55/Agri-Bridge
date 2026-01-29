import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';

const FARMER_STATS = [
  { label: 'Active Listings', value: '12', icon: '📦' },
  { label: 'Total Sales', value: '₹5,240', icon: '💰' },
  { label: 'Pending Orders', value: '3', icon: '📋' },
];

const RECENT_ORDERS = [
  { id: '1', buyer: 'Sumit Kumar', product: 'Tomatoes (5kg)', price: '₹200', status: 'Pending' },
  { id: '2', buyer: 'Priya Singh', product: 'Spinach (3kg)', price: '₹135', status: 'Packed' },
];

export default function FarmerDashboard({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome, Farmer! 👨‍🌾</Text>
            <Text style={styles.farmName}>Green Valley Farm</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {FARMER_STATS.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('AddListing')}>
              <Text style={styles.actionIcon}>➕</Text>
              <Text style={styles.actionTitle}>Add Listing</Text>
              <Text style={styles.actionDesc}>New product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('MyListings')}>
              <Text style={styles.actionIcon}>📦</Text>
              <Text style={styles.actionTitle}>My Listings</Text>
              <Text style={styles.actionDesc}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Orders')}>
              <Text style={styles.actionIcon}>📋</Text>
              <Text style={styles.actionTitle}>Orders</Text>
              <Text style={styles.actionDesc}>Incoming</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => {}}>
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionTitle}>Analytics</Text>
              <Text style={styles.actionDesc}>Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pending Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending Orders</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
              <Text style={styles.viewAll}>View All →</Text>
            </TouchableOpacity>
          </View>

          {RECENT_ORDERS.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderContent}>
                <View>
                  <Text style={styles.buyerName}>{order.buyer}</Text>
                  <Text style={styles.productName}>{order.product}</Text>
                </View>
                <View style={styles.orderRight}>
                  <Text style={styles.orderPrice}>{order.price}</Text>
                  <Text
                    style={[
                      styles.orderStatus,
                      order.status === 'Pending'
                        ? styles.statusPending
                        : styles.statusPacked,
                    ]}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>
              <View style={styles.actionButtons}>
                <Button title="Pack" size="small" onPress={() => {}} />
                <Button title="Ship" size="small" variant="secondary" onPress={() => {}} />
              </View>
            </View>
          ))}
        </View>

        {/* Performance Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips to Increase Sales</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipCard}>
              <Text style={styles.tipNumber}>1</Text>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Update Photos Regularly</Text>
                <Text style={styles.tipDesc}>Fresh photos increase buyer confidence</Text>
              </View>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipNumber}>2</Text>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Offer Competitive Pricing</Text>
                <Text style={styles.tipDesc}>Check other farmers' prices</Text>
              </View>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipNumber}>3</Text>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Respond Quickly</Text>
                <Text style={styles.tipDesc}>Fast responses increase conversion</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Logout */}
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
  farmName: {
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 20,
    gap: 12,
  },
  statCard: {
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
  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d5016',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
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
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  actionDesc: {
    fontSize: 12,
    color: '#999',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  buyerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  productName: {
    fontSize: 12,
    color: '#666',
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2d5016',
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusPending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  statusPacked: {
    backgroundColor: '#cfe2ff',
    color: '#084298',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  tipsContainer: {
    gap: 12,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    gap: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  tipNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2d5016',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  tipDesc: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});
