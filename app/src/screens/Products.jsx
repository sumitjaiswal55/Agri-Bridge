import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import ProductCard from '../components/ProductCard';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Tomatoes', price: '₹40/kg', category: 'Vegetables', rating: 4.8 },
  { id: '2', name: 'Potatoes', price: '₹20/kg', category: 'Vegetables', rating: 4.5 },
  { id: '3', name: 'Onions', price: '₹30/kg', category: 'Vegetables', rating: 4.6 },
  { id: '4', name: 'Carrots', price: '₹35/kg', category: 'Vegetables', rating: 4.7 },
  { id: '5', name: 'Lettuce', price: '₹50/kg', category: 'Leafy Greens', rating: 4.4 },
  { id: '6', name: 'Spinach', price: '₹45/kg', category: 'Leafy Greens', rating: 4.6 },
];

export default function Products({ navigation }) {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(MOCK_PRODUCTS);

  const handleSearch = (text) => {
    setSearch(text);
    if (text === '') {
      setFiltered(MOCK_PRODUCTS);
    } else {
      setFiltered(
        MOCK_PRODUCTS.filter(p =>
          p.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fresh Produce</Text>
        <Text style={styles.headerSubtitle}>From Local Farmers</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={search}
          onChangeText={handleSearch}
          placeholderTextColor="#bbb"
        />
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate('ProductDetails', { item })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
      />
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#d4edda',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchInput: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
