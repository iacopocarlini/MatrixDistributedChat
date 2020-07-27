import React from 'react';
import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import './MessageListItem.css';

const MessageListItem: React.FC<any> = ({ room }) =>
{
  return (
    <IonItem routerLink={`/room/${room.roomId}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {room.name}
          <span className="date">
            <IonNote>DATA</IonNote>
          </span>
        </h2>
          <h3>Members: {room.getJoinedMembers().length}</h3>
        <p>
          PREVIEW
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
