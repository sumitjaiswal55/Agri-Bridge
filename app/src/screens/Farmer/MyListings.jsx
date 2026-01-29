import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MOCK = [
  { id: '1', name: 'Wheat - 50kg', price: '₹2000' },
  { id: '2', name: 'Rice - 10kg', price: '₹800' },
];

export default function MyListings() {
  return (
    <View style={styles.container}>
      <Header title="My Listings" />
      <FlatList data={MOCK} keyExtractor={(i) => i.id} contentContainerStyle={{ padding: 16 }} renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      )} />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontWeight: '600' },
  price: { color: '#2d5016', fontWeight: '700' }
});
