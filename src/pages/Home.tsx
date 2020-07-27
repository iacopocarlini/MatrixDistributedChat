import React, { useState } from 'react';
import { IonContent, IonHeader, IonFooter, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonFabList, IonItem, IonText , useIonViewWillEnter} from '@ionic/react';
import { add, settings, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, key } from 'ionicons/icons';

import {
  IonList,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import './Home.css';

import *  as re from '../script.js';
import RoomListItem from '../components/RoomListItem';

const Home: React.FC = () =>
{

  const [rooms, refreshRooms] = useState<any[]>([]);

  re.matrixClient.once('sync', function(state, prevState, res) // client sync
  {
    refreshRooms(re.matrixClient.getRooms());
  });

  useIonViewWillEnter(() => {
    refreshRooms(re.matrixClient.getRooms());
  });

  const userID = re.matrixClient.credentials.userId;

  // Automatically join rooms when invited
  re.matrixClient.on("RoomMember.membership", function(event, member) 
  {
    if (member.membership === "invite" && member.userId === userID)
    {
      re.matrixClient.joinRoom(member.roomId).then(function(){
        });
    }
  });


  const refresh = (e: CustomEvent) => 
  {
    setTimeout(() => {
      e.detail.complete();
    }, 1000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rooms</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
        {
          rooms.map(roomElement => <RoomListItem key = {roomElement.roomId} room = {roomElement}/>)          
        }
        </IonList>
        
        <IonFab id= "add-button" vertical="bottom" horizontal="end" slot="fixed" onClick={re.RoomCreate}>
          <IonFabButton>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

  
export default Home;
