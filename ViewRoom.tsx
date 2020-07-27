import React, { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonToolbar,
  IonItem,
  IonInput,
  IonFab,
  IonFabList,
  IonFabButton,
  IonIcon,
  useIonViewWillEnter,
  useIonViewDidEnter,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import MessageListItem from '../components/MessageListItem';
import './ViewRoom.css';

import { add, settings, share, person, arrowForwardCircle, arrowBackCircle, caretForwardOutline} from 'ionicons/icons';

import *  as re from '../script.js';

const ViewMessage: React.FC<any> = ({ match }) => 
{
  const [messages, setMessages] = useState<any[]>([]); // array di events
  const [text, setText] = useState<string>();
  const roomID = match.params.id;
  
  re.matrixClient.on("Room.timeline", function(event, room, toStartOfTimeline)
  {
    // we know we only want to respond to messages
    if (event.getType() !== "m.room.message")
    {
        return;
    }

    // we are only intested in messages from the test room, which start with "a"
    if (event.getRoomId() === roomID)// condizioni messaggio
    {
      setMessages(messages.concat([event]));
    }
  });

  useIonViewWillEnter(() => {
    Object.keys(re.matrixClient.store.rooms).forEach((roomId) => {
      if (roomId === roomID)
      {
        setMessages(re.matrixClient.getRoom(roomId).timeline);
      } 
    });
  });


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
              messages.map(m => <MessageListItem message = {m}/>)          
            }
        </IonList>
            
        <IonItem>
          <IonInput value={text} placeholder="Type message" onIonChange = {e => setText(e.detail.value!)}></IonInput>
            <IonFab vertical="center" horizontal="end" onClick={() => re.sendMessage(text,match.params.id)}>
              <IonFabButton size="small" color="light" >
                <IonIcon icon={caretForwardOutline} />
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