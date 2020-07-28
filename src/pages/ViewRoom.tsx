import React, { useState } from 'react';
import {IonBackButton,IonButtons,IonContent,IonHeader,IonList,IonPage,IonToolbar,IonItem,IonInput,IonFab,IonFabButton,IonIcon,useIonViewWillEnter} from '@ionic/react';
import MessageListItem from '../components/MessageListItem';
import './ViewRoom.css';
import *  as re from '../script.js';
import { chevronForwardOutline } from 'ionicons/icons';

const ViewMessage: React.FC<any> = ({ match }) => 
{
  const [messages, setMessages] = useState<any[]>([]); // array di events
  const [text, setText] = useState<string>();
  const roomID = match.params.id;
  
  re.matrixClient.on("Room.timeline", function(event, room, toStartOfTimeline)
  {
    if (event.getType() === "m.room.message" && event.getRoomId() === roomID) // condizioni messaggio
    {
      setMessages([...messages, event]);
    }
  });

  // View in...
  useIonViewWillEnter(() => 
  {
    Object.keys(re.matrixClient.store.rooms).forEach((roomId) =>
    {
      if (roomId === roomID)
      {
        setMessages(re.matrixClient.getRoom(roomId).timeline);
      }
    });
  });

  const sendMessageAction = () => 
  {
    // event.preventDefault(); // evita refresh?
    re.sendMessage(text, match.params.id);
    setText('');
  }

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Rooms" defaultHref="/home"></IonBackButton>
          </IonButtons>
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
        ) : <div>Message not found</div>}
      </IonContent>
    </IonPage>
  );
};

export default ViewMessage; 
