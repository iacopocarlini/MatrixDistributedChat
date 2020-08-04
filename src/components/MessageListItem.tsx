import React from 'react';
import {IonItem, IonLabel, IonNote} from '@ionic/react';
import './MessageListItem.css';

function getMessageTime(message)
{
  var d = new Date(message.event.origin_server_ts);
  return d.getHours().toString() + ':' + d.getMinutes().toString() + ' (' + d.getDate().toString() + '/' + (d.getMonth()+1).toString() + ')'; 
}

const MessageListItem: React.FC<any> = ({ message }) =>
{

  return (
    <IonItem> 
    { message.getType() === "m.room.message" ? // if ...
        (
        <> 
          <div slot="start" className="dot"></div>
            <IonLabel className="ion-text-wrap">
              <h2>
              { message.sender.name }
                <span className="date">
                  <IonNote>{ getMessageTime(message)  }</IonNote>
                </span>
              </h2>
                <h3>{ message.event.content.body }</h3>
            </IonLabel>
          </>
        ) 
        : // else... (leave blank)
        <p></p>}
      </IonItem>
  );
};

export default MessageListItem;
