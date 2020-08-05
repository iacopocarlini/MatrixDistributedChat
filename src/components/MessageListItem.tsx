import React from 'react';
import {IonItem, IonLabel, IonNote} from '@ionic/react';
import './MessageListItem.css';

// #########################################################################################

// FUNCTIONS

/* Formats the message creation time in order to be displayed into the MessageListItem view
   IN: the message object
   OUT: the message time as hh:mm (dd/MM)
*/
function getMessageTime(message)
{
  var d = new Date(message.event.origin_server_ts);
  return d.getHours().toString() + ':' + d.getMinutes().toString() + ' (' + d.getDate().toString() + '/' + (d.getMonth()+1).toString() + ')'; 
}


// #########################################################################################

/* VIEW 
   IN: the message object to populate the view with proper data (message body, date etc...) 
   OUT: the single message list item */
const MessageListItem: React.FC<any> = ({ message }) =>
{

  return (
    <IonItem> 
    { message.getType() === "m.room.message" ? // if the message exists create the item
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
        : // else... (leave blank - display nothing, <p> is used...)
        <p></p>}
      </IonItem>
  );
};
export default MessageListItem;
