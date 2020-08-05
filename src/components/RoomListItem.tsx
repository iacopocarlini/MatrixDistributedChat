import React from 'react';
import {IonItem, IonLabel} from '@ionic/react';
import './RoomListItem.css';


// #########################################################################################

/* VIEW 
   IN: the room object to populate the view with proper data (room name, member list etc...), the notifications flag (true if present)
   OUT: the single message list item */
const RoomListItem: React.FC<any> = ({ room, newMessages }) =>
{
  // View rendering
  return (
    <IonItem routerLink = {`/room/${room.roomId}/${room.name}`} detail={false}>

      {newMessages ? // if there are unread messages...
        (
        <>
        <div slot="start" className = "dot dot-unread"></div>
        </>
        ) 
        : // else (no unread messages) 
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