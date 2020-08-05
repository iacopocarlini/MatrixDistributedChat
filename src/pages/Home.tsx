import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, useIonViewWillEnter} from '@ionic/react';
import { add } from 'ionicons/icons';
import{IonList, IonRefresher, IonRefresherContent} from '@ionic/react';
import './Home.css';
import *  as re from '../client.js';
import RoomListItem from '../components/RoomListItem';


// #########################################################################################


// VIEW
const Home: React.FC = () =>
{
  // STATE VARIBALES / HOOKS
  const [rooms, setRooms] = useState<any[]>([]);
  const [notifications, setNotifications] = useState({});


  // VIEW INTERNAL FUNCTIONS AND LISTENERS

  // Client sync with server
  re.matrixClient.once('sync', function(state, prevState, res)
  {
    /* Manage state if needed
    if(state === 'PREPARED')
      // add prepare state code here
    else
        console.log(state);
    */
    
    setRooms(re.matrixClient.getRooms());
  });
  const userID = re.matrixClient.getUserId();


  // Arriving in the view from another page...
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

    // refresh room list
    setRooms(re.matrixClient.getRooms());
  });

  // Client functions for the view

  // MEMBERSHIP LOGIC : Automatically join rooms when invited
  re.matrixClient.on("RoomMember.membership", function(event, member) 
  {
    if (member.membership === "invite" && member.userId === userID)
      re.matrixClient.joinRoom(member.roomId);
  });


  // Room event listener - the client is listening for new messages and controls notifications
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
  

  // view refresh
  const refresh = (e: CustomEvent) => 
  {
    setTimeout(() => {
      e.detail.complete();
    }, 1000);
  };

  // View rendering
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
        
        <IonFab id= "add-button" vertical="bottom" horizontal="end" slot="fixed" onClick={re.createRoom}>
          <IonFabButton>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>

  );
};
export default Home;