import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import Home from '../screens/Home';
import Products from '../screens/Products';
import ProductDetails from '../screens/ProductDetails';
import FarmerDashboard from '../screens/Farmer/Dashboard';
import AddListing from '../screens/Farmer/AddListing';
import MyListings from '../screens/Farmer/MyListings';
import Orders from '../screens/Farmer/Orders';
import BuyerDashboard from '../screens/Buyer/BuyerDashboard';
import Cart from '../screens/Buyer/Cart';
import Profile from '../screens/Buyer/Profile';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ isLoggedIn }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          // AUTH & PUBLIC FLOW
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
          </Stack.Group>
        ) : (
          // APP FLOW (Farmer & Buyer)
          <Stack.Group>
            {/* Common Screens for Logged In Users */}
            <Stack.Screen name="Home" component={Home} />
            
            {/* Farmer Screens */}
            <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} />
            <Stack.Screen name="AddListing" component={AddListing} />
            <Stack.Screen name="MyListings" component={MyListings} />
            <Stack.Screen name="Orders" component={Orders} />

            {/* Buyer Screens */}
            <Stack.Screen name="BuyerDashboard" component={BuyerDashboard} />
            <Stack.Screen name="Products" component={Products} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}