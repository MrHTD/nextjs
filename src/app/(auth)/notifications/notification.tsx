'use client';

import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '@/services/vendor';
import moment from 'moment';
import { BiArrowBack, BiCheck } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge';

// Define a type for a single notification item
interface Notification {
    id: string;
    user_id: string;
    title: string;
    body: string;
    data: string;
    read: boolean;
    created_at: string;
}

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAllNotifications = async () => {
        try {
            setLoading(true);
            const response = await getNotifications();
            setNotifications(response?.notifications || []);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllNotifications();
    }, []);

    const handleMarkAsRead = async (id: string) => {
        try {
            await markNotificationAsRead(id);
            setNotifications(prev =>
                prev.map(notif =>
                    notif.id === id ? { ...notif, read: true } : notif
                )
            );
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            // Mark all unread notifications as read
            const unreadNotifications = notifications.filter(notif => !notif.read);
            await Promise.all(unreadNotifications.map(notif => markNotificationAsRead(notif.id)));
            setNotifications(prev =>
                prev.map(notif => ({ ...notif, read: true }))
            );
        } catch (error) {
            console.error("Error marking all notifications as read:", error);
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-4">
            <div
                className={twMerge(
                    "bg-white text-gray-900 rounded-xl shadow-lg p-6 w-full max-w-2xl",
                    "space-y-6"
                )}
            >
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                    <button
                        onClick={handleGoBack}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                        aria-label="Go back"
                    >
                        {/* Replaced FiArrowLeft with inline SVG */}
                        <BiArrowBack size={20} />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-800">All Notifications</h1>
                    {notifications.some(notif => !notif.read) && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="text-green-600 hover:text-green-800"
                        >
                            Mark All as Read
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Loading notifications...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No notifications found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map(notification => (
                            <div
                                key={notification.id}
                                className={`p-4 rounded-lg border ${
                                    !notification.read ? 'bg-green-50 border-green-100' : 'bg-white border-gray-200'
                                }`}
                                onClick={() => handleMarkAsRead(notification.id)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-gray-800">{notification.title}</h3>
                                        <p className="text-gray-600 mt-1">{notification.body}</p>
                                        {/* <p className="text-sm text-gray-400 mt-2">
                                            {moment(notification.created_at).fromNow(true)} ago
                                        </p> */}
                                    </div>
                                    {!notification.read && (
                                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
