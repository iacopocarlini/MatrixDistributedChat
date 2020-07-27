import React from 'react';
import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import './MessageListItem.css';

const MessageListItem: React.FC<any> = ({ message }) =>
{
  return (
    <IonItem>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
         {message.sender.name}
          <span className="date">
            <IonNote>{message.event.type}</IonNote>
          </span>
        </h2>
          <h3>{message.event.content.body}</h3>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
