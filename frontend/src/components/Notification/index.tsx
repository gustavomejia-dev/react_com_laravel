import React from 'react'
import { Button, notification, Space } from 'antd';

import { StyledNotification } from './style';
interface INotification {
  message: string;
  visible?: boolean;
  type: string;


}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const Notification = () => {
      const [api, contextHolder] = notification.useNotification();
      const openNotificationWithIcon = (type: NotificationType) => {
        console.log('aquii');
        api[type]({
          message: 'Notification Title',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
      };

  return (
    <div>
      <button onClick={() => openNotificationWithIcon}>CLick</button>
        {contextHolder}
    </div>
  )
}
