'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import styles from './PushNotificationPrompt.module.css';

export default function PushNotificationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      return;
    }

    // Check if the user has already made a choice
    if (Notification.permission === 'granted') {
      setIsSubscribed(true);
      return;
    }

    // Show prompt if not denied and not granted
    if (Notification.permission === 'default' && !localStorage.getItem('pushPromptDismissed')) {
      // Delay showing it slightly so it's not too aggressive
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const handleSubscribe = async () => {
    try {
      // Request permission
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        // Register Service Worker
        const registration = await navigator.serviceWorker.register('/sw.js');
        
        // Subscribe to push notifications
        const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        });

        // Send to backend
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription),
        });

        setIsSubscribed(true);
        setShowPrompt(false);
      } else {
        handleDismiss();
      }
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pushPromptDismissed', 'true');
  };

  if (!showPrompt || isSubscribed) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <Bell size={24} />
        </div>
        <h3 className={styles.title}>সর্বশেষ খবর পান!</h3>
      </div>
      <p className={styles.description}>
        আমাদের ওয়েবসাইটের ব্রেকিং নিউজ এবং গুরুত্বপূর্ণ আপডেট পেতে নোটিফিকেশন চালু করুন।
      </p>
      <div className={styles.buttons}>
        <button onClick={handleSubscribe} className={styles.allowBtn}>চালু করুন</button>
        <button onClick={handleDismiss} className={styles.denyBtn}>পরে</button>
      </div>
    </div>
  );
}
