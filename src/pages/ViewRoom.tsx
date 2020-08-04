import React, { useState, useEffect } from 'react';
import {IonBackButton, IonButtons, IonButton, IonContent, IonSelect, IonSelectOption, IonHeader, IonTitle, IonList, IonPage, IonToolbar, IonItem, IonInput, IonFab, IonFabButton, IonIcon, useIonViewDidEnter, useIonViewWillEnter} from '@ionic/react';
import MessageListItem from '../components/MessageListItem';
import './ViewRoom.css';
import *  as re from '../script.js';
import { chevronForwardOutline } from 'ionicons/icons';
import { getFriends, Friend } from '../data/friend';

const ViewRoom: React.FC<any> = ({ match }) => 
{
  const roomID = match.params.id;

  // Hooks
  const [messages, setMessages] = useState<any[]>([]); // array di events
  const [text, setText] = useState<string>();
  const [inviteList, setInviteList] = useState<Friend[]>([]);
  const [userToInvite, setUserToInvite] = useState("");
  const [loadingFriends, setLoadingFriends] = useState(true);
  

  // Room event listener
  re.matrixClient.on("Room.timeline", function(event, room, toStartOfTimeline)
  {
    if (event.getType() === "m.room.message" && event.getRoomId() === roomID) // condizioni messaggio
      setMessages([...messages, event]);

  });


  // View in...
  useIonViewWillEnter(() =>
  {
    // Chat is read...
    if (re.matrixClient.getRoom(roomID) !== null)
    {
      re.matrixClient.getRoom(roomID).setUnreadNotificationCount("total", 0);
      re.matrixClient.getRoom(roomID).setUnreadNotificationCount("highlight", 0);
    }

    // Retrieve messages...
    Object.keys(re.matrixClient.store.rooms).forEach((roomId) =>
    {
      if (roomId === roomID)
        setMessages(re.matrixClient.getRoom(roomId).timeline);
    });
  });

  
  // Update friends list
  useEffect(() =>
  {
    if (loadingFriends)
    {
      // Retrieve friends list
      var members = re.matrixClient.getRoom(roomID).getJoinedMembers();
      var friends = getFriends();
    
      friends.forEach(f => {
        var alreadyIN = false;
        members.forEach(m => {
          if (f.id === m.name)
            alreadyIN = true;
        });
        if (!alreadyIN)
          inviteList.push(f);
      });

      setInviteList(inviteList);
      setLoadingFriends(false);
    }
  });
  

  const sendMessageAction = () => 
  {
    re.sendMessage(text, match.params.id);
    setText('');
  }

  const inviteUserAction = () => 
  {
    if (userToInvite !== null && userToInvite !== "")
    {
      re.inviteUser(userToInvite, roomID);
      setUserToInvite('');
    }
    else
      return;
  }

  return (
    <IonPage id="view-room-page">
      <IonHeader translucent>
        <IonToolbar>

          <IonButtons slot="start">
            <IonBackButton text="Rooms" defaultHref="/home"></IonBackButton>
          </IonButtons>

          <IonButton slot="end" onClick = {inviteUserAction}>Invite</IonButton>
            <IonSelect slot="end" value={userToInvite} okText="Okay" cancelText="Cancel" onIonChange={e => setUserToInvite(e.detail.value)}>
            {
              inviteList.map(friend => <IonSelectOption key = {friend.id} value = {friend.id}> {friend.id} </IonSelectOption>)
            }
          </IonSelect>

          <IonButtons slot="end">
            <IonButton color="primary" onClick = {() => re.leaveRoom(roomID)} href = "/home">Leave room</IonButton>
          </IonButtons>

        <IonTitle>{ match.params.name }</IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
         {messages ?
        (
        <>
        <IonList>
        {
          messages.map(m => <MessageListItem key = {m.event.event_id} message = {m}/>)          
        }
        </IonList>
            
        <IonItem>
          <IonInput value={text} placeholder="Type message" onIonChange = {e => setText(e.detail.value!)}></IonInput>
            <IonFab vertical = "center" horizontal = "end" onClick = {sendMessageAction}>
              <IonFabButton size="small" color="light" >
                <IonIcon icon={ chevronForwardOutline } />
              </IonFabButton>
            </IonFab>
        </IonItem>
        
        </>
        ) : <div>Couldn't retrieve chat</div>}
      </IonContent>
    </IonPage>
  );
};

export default ViewRoom;