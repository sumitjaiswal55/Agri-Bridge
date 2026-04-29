// src/data/dummyData.js

export const slides = [
    { 
      id: 1, 
      title: 'Summer Harvest Festival 2026', 
      subtitle: 'Fresh Vegetables & Grains - Bulk Prices for Restaurants', 
      cta: 'Shop Bulk Deals', 
      image: 'https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?q=80&w=1600&auto=format&fit=crop' 
    },
    { 
      id: 2, 
      title: 'Organic Farm Direct', 
      subtitle: 'Certified Organic Produce delivered from Nashik to your doorstep', 
      cta: 'Explore Organic', 
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    { 
      id: 3, 
      title: 'Real-time Mandi Rates', 
      subtitle: 'Transparent Pricing - Direct Farmer-to-Buyer connection', 
      cta: 'Check Today\'s Rates', 
      image: 'https://images.unsplash.com/photo-1582451649124-577d6d6e1990?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    }
  ];
  
  export const categories = [
    { 
      id: 1, 
      name: 'Grains', 
      count: '150+ Products',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop' 
    },
    { 
      id: 2, 
      name: 'Vegetables', 
      count: '80+ Products',
      image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    { 
      id: 3, 
      name: 'Fruits', 
      count: '60+ Products',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&auto=format&fit=crop' 
    },
    { 
      id: 4, 
      name: 'Spices', 
      count: '40+ Products',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop' 
    },
  ];
  
  export const products = [
      { 
        id: 1, 
        name: 'Premium Wheat (Lokwan)', 
        farm: 'Singh Farms, Punjab', 
        price: 2450, 
        oldPrice: 2800,
        unit: 'Quintal', 
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop', 
        category: 'Grains', 
        stock: 500,
        rating: 4.8,
        isBestseller: true
      },
      { 
        id: 2, 
        name: 'Organic Red Onions', 
        farm: 'Joshi Organic Farms, Nashik', 
        price: 1850, 
        oldPrice: 2100,
        unit: '50Kg Bag', 
        image: 'https://images.unsplash.com/photo-1639172486437-28d0e1ce6493?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        category: 'Vegetables', 
        stock: 120,
        rating: 4.5,
        isBestseller: false
      },
      { 
        id: 3, 
        name: 'Ratnagiri Alphonso', 
        farm: 'Desai Orchards, Ratnagiri', 
        price: 1200, 
        oldPrice: 1500,
        unit: 'Dozen', 
        image: 'https://images.unsplash.com/photo-1713273576831-a81cb528853a?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        category: 'Fruits', 
        stock: 80,
        rating: 4.9,
        isBestseller: true
      },
      { 
        id: 4, 
        name: 'Basmati Rice (Extra Long)', 
        farm: 'Rawat Farms, Dehradun', 
        price: 7200, 
        oldPrice: 8000,
        unit: 'Quintal', 
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop', 
        category: 'Grains', 
        stock: 300,
        rating: 4.7,
        isBestseller: false
      },
      { 
        id: 5, 
        name: 'Hybrid Tomatoes', 
        farm: 'Patel Farms, Anand', 
        price: 850, 
        oldPrice: 1000,
        unit: '25Kg Crate', 
        image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        category: 'Vegetables', 
        stock: 200,
        rating: 4.2,
        isBestseller: false
      },
      { 
        id: 6, 
        name: 'Dry Guntur Chillies', 
        farm: 'Reddy Spices, Andhra', 
        price: 450, 
        oldPrice: 550,
        unit: 'Kg', 
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop', 
        category: 'Spices', 
        stock: 50,
        rating: 4.6,
        isBestseller: true
      },
      { 
        id: 1, 
        name: 'Premium Wheat (Lokwan)', 
        farm: 'Singh Farms, Punjab', 
        price: 2450, 
        oldPrice: 2800,
        unit: 'Quintal', 
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop', 
        category: 'Grains', 
        stock: 500,
        rating: 4.8,
        isBestseller: true
      },
      { 
        id: 2, 
        name: 'Organic Red Onions', 
        farm: 'Joshi Organic Farms, Nashik', 
        price: 1850, 
        oldPrice: 2100,
        unit: '50Kg Bag', 
        image: 'https://images.unsplash.com/photo-1639172486437-28d0e1ce6493?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        category: 'Vegetables', 
        stock: 120,
        rating: 4.5,
        isBestseller: false
      },
      { 
        id: 3, 
        name: 'Ratnagiri Alphonso', 
        farm: 'Desai Orchards, Ratnagiri', 
        price: 1200, 
        oldPrice: 1500,
        unit: 'Dozen', 
        image: 'https://images.unsplash.com/photo-1713273576831-a81cb528853a?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        category: 'Fruits', 
        stock: 80,
        rating: 4.9,
        isBestseller: true
      },
      { 
        id: 4, 
        name: 'Basmati Rice (Extra Long)', 
        farm: 'Rawat Farms, Dehradun', 
        price: 7200, 
        oldPrice: 8000,
        unit: 'Quintal', 
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop', 
        category: 'Grains', 
        stock: 300,
        rating: 4.7,
        isBestseller: false
      },
      { 
        id: 5, 
        name: 'Hybrid Tomatoes', 
        farm: 'Patel Farms, Anand', 
        price: 850, 
        oldPrice: 1000,
        unit: '25Kg Crate', 
        image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
        category: 'Vegetables', 
        stock: 200,
        rating: 4.2,
        isBestseller: false
      },
      { 
        id: 6, 
        name: 'Dry Guntur Chillies', 
        farm: 'Reddy Spices, Andhra', 
        price: 450, 
        oldPrice: 550,
        unit: 'Kg', 
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop', 
        category: 'Spices', 
        stock: 50,
        rating: 4.6,
        isBestseller: true
      },
  ];