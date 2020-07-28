import React from 'react';
import {IonItem, IonLabel, IonNote, IonBadge, IonButton, IonIcon} from '@ionic/react';
import './RoomListItem.css';
import { closeOutline } from 'ionicons/icons';
import *  as re from '../script.js';

const RoomListItem: React.FC<any> = ({ room, newMessages }) =>
{
  return (
    <IonItem routerLink = {`/room/${room.roomId}`} detail={false}>
      <div slot="start" className = "dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          { room.name }
          <span className="date">
            <IonNote> <IonBadge color="primary"> { newMessages }</IonBadge> </IonNote>
            <IonNote>
              <IonButton size="small" color="light" onClick = {() => re.deleteRoom(room)} >
                <IonIcon icon={closeOutline} />
              </IonButton>
          </IonNote>
          </span>
        </h2>
          <h3>Members: {room.getJoinedMembers().length}</h3>
      </IonLabel>
      </IonItem>
  );
};

export default RoomListItem;
// rendering condizionale per il badge (solo se è +1 o superiore)
