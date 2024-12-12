import { initializeApp } from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDpceyEUTGQfBw8xCmR8-5lKWC1yTS_yg",
    authDomain: "fake-store-auth-11a88.firebaseapp.com",
    projectId: "fake-store-auth-11a88",
    storageBucket: "fake-store-auth-11a88.firebasestorage.app",
    messagingSenderId: "642738835431",
    appId: "1:642738835431:web:279619ae7864990fb77742",
    measurementId: "G-N9N69LJ0CE"
  };

const app = initializeApp(firebaseConfig);

export default app;
