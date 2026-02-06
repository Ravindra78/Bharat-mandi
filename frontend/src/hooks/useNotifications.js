import { useEffect, useState } from 'react';
import { messaging, getToken, onMessage } from '../firebase';
import { apiFetch } from '../services/api';
import { useSelector } from 'react-redux';

const useNotifications = () => {
  const { user } = useSelector((state) => state.auth);
  const [notificationPermission, setNotificationPermission] = useState('default');

  useEffect(() => {
    if (user) {
      const requestPermission = async () => {
        try {
          const permission = await Notification.requestPermission();
          setNotificationPermission(permission);
          if (permission === 'granted') {
            const token = await getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY });
            await apiFetch('/users/fcm-token', {
              method: 'POST',
              body: JSON.stringify({ fcmToken: token }),
            });
          }
        } catch (err) {
          console.error('Notification error:', err);
        }
      };
      requestPermission();

      onMessage(messaging, (payload) => {
        alert(`${payload.notification.title}: ${payload.notification.body}`);
      });
    }
  }, [user]);

  return { notificationPermission };
};

export default useNotifications;