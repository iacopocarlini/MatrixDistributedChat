import React, { useState, useEffect } from 'react';
import {IonBackButton, IonButtons, IonButton, IonContent, IonSelect, IonSelectOption, IonHeader, IonTitle, IonList, IonPage, IonToolbar, IonItem, IonInput, IonFab, IonFabButton, IonIcon, useIonViewDidEnter, useIonViewWillEnter} from '@ionic/react';
import MessageListItem from '../components/MessageListItem';
import './ViewRoom.css';
import *  as re from '../client.js';
import { chevronForwardOutline } from 'ionicons/icons';
import { getFriends, Friend } from '../data/friend'; // ts file hosting the friends list


// #########################################################################################

/* VIEW 
   IN: the room ID coming from the item clicked in the room list 
   OUT: the room view with utilities and live chat */
const ViewRoom: React.FC<any> = ({ match }) => 
{
  // CONSTANT
  const roomID = match.params.id;


  // HOOKS
  const [messages, setMessages] = useState<any[]>([]); // array di events
  const [text, setText] = useState<string>();
  const [inviteList, setInviteList] = useState<Friend[]>([]);
  const [userToInvite, setUserToInvite] = useState("");
  const [loadingFriends, setLoadingFriends] = useState(true);
  

  // VIEW INTERNAL FUNCTIONS AND LISTENERS

  // Room event listener - the client is listening for new messages
  re.matrixClient.on("Room.timeline", function(event, room, toStartOfTimeline)
  {
    if (event.getType() === "m.room.message" && event.getRoomId() === roomID) // there is a new message for this room
      setMessages([...messages, event]); // update the message list
  });


  // Arriving in the view from another page...
  useIonViewWillEnter(() =>
  {
    // Chat is read -> remove notifications...
    if (re.matrixClient.getRoom(roomID) !== null)
    {
      re.matrixClient.getRoom(roomID).setUnreadNotificationCount("total", 0);
      re.matrixClient.getRoom(roomID).setUnreadNotificationCount("highlight", 0);
    }

    // Retrieve old messages...
    Object.keys(re.matrixClient.store.rooms).forEach((roomId) =>
    {
      if (roomId === roomID)
        setMessages(re.matrixClient.getRoom(roomId).timeline);
    });
  });

  
  // Update friends list when coming into the room
  // Friends list is hosted into /data/friend.ts file
  useEffect(() =>
  {
    if (loadingFriends && re.matrixClient.getRoom(roomID) !== null)
    {
      // Retrieve friends list
      var members = re.matrixClient.getRoom(roomID).getJoinedMembers();
      var friends = getFriends();
    
      friends.forEach(f => {
        var alreadyIN = false;
        members.forEach(m => {
          if (f.id === m.userId)
            alreadyIN = true;
        });
        if (!alreadyIN)
          inviteList.push(f);
      });

      setInviteList(inviteList);
      setLoadingFriends(false);
    }
  });
  

  // BUTTON ACTIONS 

  // Action linked to the send button (>)
  const sendMessageAction = () => 
  {
    re.sendMessage(text, match.params.id);
    setText('');
  }


  // Action linked to the invite button (INVITE)
  const inviteUserAction = () => 
  {
    if (userToInvite !== null && userToInvite !== "") // username check
    {
      re.inviteUser(userToInvite, roomID);
      setUserToInvite('');
    }
    else
      return;
  }

  // View rendering
  return (
    <IonPage id="view-room-page">
      <IonHeader translucent>
        <IonToolbar>

          <IonButtons slot="start">
            <IonBackButton text="Rooms" defaultHref="/home"></IonBackButton>
          </IonButtons>

          <IonButton slot="end" onClick = {inviteUserAction}> Invite </IonButton>
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
        ) : <div> Couldn't retrieve chat </div>}
      </IonContent>
    </IonPage>
  );
};
export default ViewRoom;