"use client";

import NotificationPopup from "@/app/components/notificationPopup";

import { useEffect, useState } from "react";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import NotificationPopup from "@/app/components/notificationPopup";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const db = getFirestore();
      const notificationsCollection = collection(db, "notifications");
      const notificationsSnapshot = await getDocs(notificationsCollection);
      const notificationsList = notificationsSnapshot.docs.map((doc) =>
        doc.data()
      );
      setNotifications(notificationsList);
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>User Notifications</h1>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <NotificationPopup key={index} notification={notification} />
        ))
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
};

export default NotificationsPage;
