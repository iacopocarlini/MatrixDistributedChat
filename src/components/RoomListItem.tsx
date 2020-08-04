import React from 'react';
import {IonItem, IonLabel} from '@ionic/react';
import './RoomListItem.css';

const RoomListItem: React.FC<any> = ({ room, newMessages }) =>
{
  return (
    <IonItem routerLink = {`/room/${room.roomId}/${room.name}`} detail={false}>

      {newMessages ?
        (
        <>
        <div slot="start" className = "dot dot-unread"></div>
        </>
        ) 
        : 
        <div slot="start" className = "dot"></div>}
      
      <IonLabel className="ion-text-wrap">
        <h2>
          { room.name }
        </h2>
          <h3>Members: {room.getJoinedMembers().length}</h3>
      </IonLabel>
    </IonItem>
  );
};

export default RoomListItem;