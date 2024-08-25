import { db } from "./firebase/config";

const products = [
  {
    id: "12345",
    name: "Wireless Bluetooth Headphones",
    image: "https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_1280.jpg",
    description: "High-quality wireless Bluetooth headphones with noise cancellation and long battery life.",
    price: 89.99,
    category: "Electronics",
    stock: 150,
    rating: 4.5,
    specifications: {
      batteryLife: "20 hours",
      weight: "250 grams",
      connectivity: "Bluetooth 5.0",
      color: "Black"
    }
  },
  {
    id: "54321",
    name: "Portable Blender",
    image: "https://cdn.pixabay.com/photo/2011/12/05/14/49/blender-10934_1280.jpg",
    description: "Compact and powerful portable blender perfect for smoothies and shakes on the go.",
    price: 29.99,
    category: "Kitchen Appliances",
    stock: 200,
    rating: 4.8,
    specifications: {
      batteryLife: "15 blends",
      weight: "350 grams",
      capacity: "400 ml",
      color: "Red"
    }
  },
  {
    id: "67890",
    name: "Smart Fitness Watch",
    image: "https://cdn.pixabay.com/photo/2022/01/24/18/06/smart-watch-6964296_1280.jpg",
    description: "A stylish smartwatch with fitness tracking, heart rate monitoring, and customizable watch faces.",
    price: 149.99,
    category: "Wearables",
    stock: 75,
    rating: 2.2,
    specifications: {
      batteryLife: "7 days",
      weight: "45 grams",
      connectivity: "Bluetooth 5.1",
      color: "Silver"
    }
  }
];

const reviews = [
  {
    reviewId: "r1",
    productId: "12345",
    userId: "u001",
    reviewerName: "Alice Johnson",
    rating: 5,
    comment: "Excellent headphones! The sound quality is amazing and the noise cancellation is top-notch.",
    date: "2024-08-15"
  },
  {
    reviewId: "r2",
    productId: "12345",
    userId: "u002",
    reviewerName: "Bob Smith",
    rating: 4,
    comment: "Good value for the price. Comfortable to wear, but the battery life could be better.",
    date: "2024-08-16"
  },
  // Add more reviews...
];

const cart = [
  {
    id: "67890",
    name: "Smart Fitness Watch",
    image: "https://cdn.pixabay.com/photo/2022/01/24/18/06/smart-watch-6964296_1280.jpg",
    description: "A stylish smartwatch with fitness tracking, heart rate monitoring, and customizable watch faces.",
    price: 149.99,
    category: "Wearables",
    stock: 75,
    rating: 2.2,
    specifications: {
      batteryLife: "7 days",
      weight: "45 grams",
      connectivity: "Bluetooth 5.1",
      color: "Silver"
    },
    quantity: 4
  }
];

async function seedData() {
  try {
    // Add products
    const productsRef = db.collection('products');
    for (const product of products) {
      await productsRef.doc(product.id).set(product);
    }

    // Add reviews
    const reviewsRef = db.collection('reviews');
    for (const review of reviews) {
      await reviewsRef.doc(review.reviewId).set(review);
    }

    // Add cart
    const cartRef = db.collection('cart');
    for (const item of cart) {
      await cartRef.doc(item.id).set(item);
    }

    console.log('Data successfully added to Firestore!');
  } catch (error) {
    console.error('Error adding data to Firestore: ', error);
  }
}

seedData();
