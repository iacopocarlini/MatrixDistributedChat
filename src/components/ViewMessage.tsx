import React, { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonLabel,
  IonItem,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import MessageListItem from '../components/MessageListItem';
import './ViewMessage.css';

import * as re from 'C:/Users/Salvo/ho-chat/src/script.js';

const ViewMessage: React.FC<any> = ({ match }) => 
{

  const [messages, setMessages] = useState<any[]>([]);


  useIonViewWillEnter(() => {
    // prendere i messaggi della stanza con id pari a roomId
    const msg = ['a', 'b']; // getmessage
    // room.timeline
    setMessages(msg);
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
      <IonList>
        <IonItem>
          <IonLabel>
          </IonLabel>
        </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ViewMessage;
