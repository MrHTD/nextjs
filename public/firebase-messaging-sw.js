importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

try {
  firebase.initializeApp({
    apiKey: "AIzaSyBdb2c-tO-YAlOd7PlfTV9iEYJXvjby9SI",
    authDomain: "mawrid-3c27b.firebaseapp.com",
    projectId: "mawrid-3c27b",
    storageBucket: "mawrid-3c27b.firebasestorage.app",
    messagingSenderId: "526643003659",
    appId: "1:526643003659:web:5f9f24720da1d360bd220e",
    measurementId: "G-MG31N6RW0F"
  });

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/assets/images/appsLogo.png',
      badge: '/assets/images/appsLogo.png',
      data: payload.data
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  });

  self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    self.skipWaiting();
  });

  self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
    event.waitUntil(clients.claim());
  });

} catch (error) {
  console.error('Error in firebase-messaging-sw.js:', error);
}
