import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, useIonViewWillEnter} from '@ionic/react';
import { add } from 'ionicons/icons';
import{IonList, IonRefresher, IonRefresherContent} from '@ionic/react';
import './Home.css';
import *  as re from '../script.js';
import RoomListItem from '../components/RoomListItem';

const Home: React.FC = () =>
{
  // State variables / Hooks
  const [rooms, refreshRooms] = useState<any[]>([]);
  const [notifications, setNotifications] = useState({});

  // Client sync with server
  re.matrixClient.once('sync', function(state, prevState, res)
  {
    /* Managing state
    if(state === 'PREPARED')
    {
      console.log("prepared");
      refreshRooms(re.matrixClient.getRooms());
    } 
    else {
        console.log(state);
        //process.exit(1);
    }
    */
    
    refreshRooms(re.matrixClient.getRooms());
  });
  
  const userID = re.matrixClient.getUserId();

  // View in...
  useIonViewWillEnter(() =>
  {
    
    // Notifications check
    re.matrixClient.getRooms().forEach((room) =>
    {
      if (room.getUnreadNotificationCount("total") > 0)
        notifications[room.roomId] = true;
      else
        notifications[room.roomId] = false;
    });
    setNotifications(notifications);


    // Rooms
    refreshRooms(re.matrixClient.getRooms()); // restoring rooms state
  });

  // # CLIENT LOGIC

  // ## MEMBERSHIP LOGIC : Automatically join rooms when invited
  re.matrixClient.on("RoomMember.membership", function(event, member) 
  {
    if (member.membership === "invite" && member.userId === userID)
      re.matrixClient.joinRoom(member.roomId);
  });

  // ## Room events listener
  re.matrixClient.on("Room.timeline", function(event, room, toStartOfTimeline)
  {
    if (event.getType() === "m.room.message") // triggered for any message from any room...
    {
      if (room.getUnreadNotificationCount("total") > 0)
        notifications[room.roomId] = true;
      else
        notifications[room.roomId] = false;

      setNotifications(notifications);
    }

    else // not a message
      return;
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
          <IonTitle> Rooms </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
        {
          rooms.map(roomElement => <RoomListItem key = {roomElement.roomId} room = {roomElement} newMessages = {notifications[roomElement.roomId]}/>)          
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