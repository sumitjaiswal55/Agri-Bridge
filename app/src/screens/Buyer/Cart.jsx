import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const MOCK = [
  { id: '1', name: 'Tomatoes', qty: 2, price: '₹80' },
];

export default function Cart() {
  return (
    <View style={styles.container}>
      <Header title="Cart" />
      <FlatList data={MOCK} keyExtractor={(i)=>i.id} contentContainerStyle={{padding:16}} renderItem={({item})=> (
        <View style={styles.item}><Text>{item.name} x{item.qty}</Text><Text>{item.price}</Text></View>
      )} />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({ container:{flex:1, backgroundColor:'#fff'}, item:{padding:12, borderBottomWidth:1, borderBottomColor:'#eee', flexDirection:'row', justifyContent:'space-between'} });
