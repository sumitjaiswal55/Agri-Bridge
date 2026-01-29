import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <View style={styles.content}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john@example.com</Text>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({ container:{flex:1, backgroundColor:'#fff'}, content:{padding:16}, name:{fontWeight:'700', fontSize:18, color:'#2d5016'}, email:{color:'#666', marginTop:6} });
