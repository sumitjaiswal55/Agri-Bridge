import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Button from '../components/Button';

export default function ProductDetails({ route, navigation }) {
  const { item } = route.params || { item: { name: 'Product', price: '₹0' } };
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`Added ${quantity} kg of ${item.name} to cart!`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Text style={styles.productEmoji}>🌾</Text>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.category}>{item.category || 'Fresh Produce'}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ {item.rating || 4.5}</Text>
            <Text style={styles.reviews}>(256 reviews)</Text>
          </View>

          <View style={styles.priceSection}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.priceLabel}>per kilogram</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About This Product</Text>
            <Text style={styles.description}>
              Fresh, organic {item.name.toLowerCase()} directly from local farmers. Picked at peak ripeness and delivered to your doorstep within 24 hours. No pesticides, no chemicals - just pure, natural goodness.
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Why Choose This?</Text>
            <View style={styles.featureRow}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>100% Organic & Fresh</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>Direct from Farmers</Text>
            </View>
            <View style={styles.featureRow}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>Fast Delivery Available</Text>
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity (kg)</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Text style={styles.quantityBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityBtn}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.quantityBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart Button */}
          <Button
            title={`Add to Cart (${quantity} kg)`}
            onPress={handleAddToCart}
          />
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
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d5016',
  },
  imageContainer: {
    height: 280,
    backgroundColor: '#f0f7f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  productEmoji: {
    fontSize: 120,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  category: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
  },
  reviews: {
    fontSize: 14,
    color: '#999',
  },
  priceSection: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2d5016',
  },
  priceLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  featuresSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  featureIcon: {
    fontSize: 18,
    color: '#2d5016',
    fontWeight: '700',
  },
  featureText: {
    fontSize: 14,
    color: '#333',
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#2d5016',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d5016',
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    minWidth: 40,
    textAlign: 'center',
  },
});
