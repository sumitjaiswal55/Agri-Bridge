import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton';
import Footer from '../../components/Footer';

export default function AddListing({ navigation }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  return (
    <View style={styles.container}>
      <Header title="Add Listing" />
      <View style={styles.form}>
        <TextInput placeholder="Product name" value={title} onChangeText={setTitle} style={styles.input} />
        <TextInput placeholder="Price" value={price} onChangeText={setPrice} style={styles.input} />
        <PrimaryButton title="Create" onPress={() => navigation.goBack()} />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  form: { padding: 16 },
  input: { borderWidth: 1, borderColor: '#eee', padding: 12, borderRadius: 8, marginBottom: 12 }
});
