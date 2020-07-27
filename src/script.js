//client stuff  
var myUserId = "@save_afk:matrix.org";
var myAccessToken = "MDAxOGxvY2F0aW9uIG1hdHJpeC5vcmcKMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDI3Y2lkIHVzZXJfaWQgPSBAc2F2ZV9hZms6bWF0cml4Lm9yZwowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9IElqU2NZUn5fTUR1K0hIZDAKMDAyZnNpZ25hdHVyZSD2nCs8gU1UjVlIRiHHvHimXpPHE9QUG3q-KvR3JcRp9wo";
var sdk = require("matrix-js-sdk");
const { domain } = require("process");

var matrixClient = sdk.createClient(
{
  baseUrl: "https://matrix.org",
  accessToken: myAccessToken,
  userId: myUserId
});

// *************

matrixClient.startClient();

function getRoomList()
{
  return matrixClient.getRooms();
}

//funzione per creare una stanza da app
function RoomCreate() {

    //nome della stanza
    var str = "Soccorso";
    var dom = ":matrix.org"

    var timestamp = Date.now().toString();
    var room_name = str.concat(timestamp);
    var room_id = Date.now().toString().concat(dom);

    var s = "https://matrix.org/_matrix/client/r0/createRoom?access_token=";
    var body = s.concat(myAccessToken);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", body, false ); // false for synchronous request

    xmlHttp.send(JSON.stringify(
      {
        "room_alias_name" : room_name,
        "room_id" : room_id 
      }));

    //console.log( xmlHttp.responseText );
  }

  function sendMessage(text,room)
  {
    //controllo testo vuoto
    if(text === undefined)
    {
      return;
    }
    else if(text.startsWith('/invite')){
      //invitare qualcuno
      var userToInvite = text.substr(8);

      var request = "https://matrix.org/_matrix/client/r0/rooms/" + room + "/invite?access_token=" + myAccessToken;
  
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "POST", request, false ); // false for synchronous request
  
      xmlHttp.send(JSON.stringify(
        {
          "user_id" : userToInvite,
        }));
  
      //console.log( xmlHttp.responseText );
      
    }
    else if(text.startsWith('/members')){
      return
    }
    else{

      const content = {
        "body": text,
        "msgtype": "m.text",
      };

      matrixClient.sendEvent(room, "m.room.message", content, "", (err, res) => {
        console.log(err);
      });
    }
  }

 
//curl -XPOST -d '{"user_id":"@myfriend:localhost"}' "https://localhost:8448/_matrix/client/r0/rooms/%21asfLdzLnOdGRkdPZWu:localhost/invite?access_token=YOUR_ACCESS_TOKEN"
exports.RoomCreate =  RoomCreate;
exports.matrixClient = matrixClient;
exports.getRoomList = getRoomList;
exports.sendMessage = sendMessage;

