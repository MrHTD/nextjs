import React from 'react';
import Notification from './notification';
import Sidebar from '@/components/Base/Sidebar';

const NotificationsPage: React.FC = () => {
    return (
        <div className="flex flex-row justify-start bg-backgroundcolor">
          <Sidebar />
          <Notification />
        </div>
      );
};

export default NotificationsPage;
