'use client';

import { useEffect, useRef } from 'react';

export default function PushNotificationPrompt() {
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    // Check if notifications are supported
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      return;
    }

    // Only request if permission is default and we haven't requested yet in this session
    if (Notification.permission === 'default' && !hasRequestedRef.current) {
      hasRequestedRef.current = true;
      
      const requestNativePermission = async () => {
        try {
          const permission = await Notification.requestPermission();
          
          if (permission === 'granted') {
            const registration = await navigator.serviceWorker.register('/sw.js');
            
            const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
            
            // Function to convert base64 to Uint8Array
            const urlBase64ToUint8Array = (base64String) => {
              const padding = '='.repeat((4 - base64String.length % 4) % 4);
              const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
              const rawData = window.atob(base64);
              const outputArray = new Uint8Array(rawData.length);
              for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
              }
              return outputArray;
            };

            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey
            });

            await fetch('/api/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subscription),
            });
          }
        } catch (error) {
          console.error('Error requesting push notification permission:', error);
        }
      };

      // Slight delay to ensure page load is somewhat complete before asking
      const timer = setTimeout(() => requestNativePermission(), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Render nothing, we only want the native browser prompt
  return null;
}

