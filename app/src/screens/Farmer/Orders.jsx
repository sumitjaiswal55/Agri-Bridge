import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MOCK = [
  { id: '1', order: 'Order #101', status: 'Pending' },
  { id: '2', order: 'Order #102', status: 'Delivered' },
];

export default function Orders() {
  return (
    <View style={styles.container}>
      <Header title="Orders" />
      <FlatList data={MOCK} keyExtractor={(i) => i.id} contentContainerStyle={{ padding: 16 }} renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.order}</Text>
          <Text style={styles.status}>{item.status}</Text>
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
  status: { color: '#2d5016', fontWeight: '700' }
});
