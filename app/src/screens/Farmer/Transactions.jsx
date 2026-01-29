import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MOCK = [
  { id: '1', tx: 'TX-001', amount: '₹2000' },
  { id: '2', tx: 'TX-002', amount: '₹800' },
];

export default function Transactions() {
  return (
    <View style={styles.container}>
      <Header title="Transactions" />
      <FlatList data={MOCK} keyExtractor={(i) => i.id} contentContainerStyle={{ padding: 16 }} renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.tx}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
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
  amount: { color: '#2d5016', fontWeight: '700' }
});
