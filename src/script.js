//client stuff  
var myUserId = "@YOUR USERNAME:YOUR USERNAME DOMAIN (ex. matrix.org)";
var myAccessToken = "YOUR ACCESS TOKEN";
var sdk = require("matrix-js-sdk");
const { domain } = require("process");

var matrixClient = sdk.createClient(
{
  baseUrl: "https://matrix.org",
  accessToken: myAccessToken,
  userId: myUserId
});

// **************************

matrixClient.startClient();

// creare una stanza da app
function RoomCreate()
{

    //nome della stanza
    var str = "Soccorso";
    var dom = ":matrix.org"

    var timestamp = Date.now().toString();
    var room_name = str.concat(timestamp);
    var room_id = Date.now().toString().concat(dom);

    var body = "https://matrix.org/_matrix/client/r0/createRoom?access_token=" + myAccessToken;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", body, false );
    xmlHttp.send(JSON.stringify(
      {
        "room_alias_name" : room_name,
        "room_id" : room_id 
      }));
  }

// mandare un messaggio
function sendMessage(text,room)
{
  //controllo testo vuoto
  if(text === undefined)
  {
    return;
  }

  else if(text.startsWith('/invite'))
  {
    // invitare qualcuno
    var userToInvite = text.substr(8);

    var request = "https://matrix.org/_matrix/client/r0/rooms/" + room + "/invite?access_token=" + myAccessToken;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", request, false );   
    xmlHttp.send(JSON.stringify(
      {
        "user_id" : userToInvite,
      }));
  }

  // Room members..
  else if(text.startsWith('/members')){
    return
  }

  // Text message
  else
  {
    const content =
    {
      "body": text,
      "msgtype": "m.text",
    };

    matrixClient.sendEvent(room, "m.room.message", content, "", (err, res) => {
      console.log(err);
    });
  }
}

// eliminare una stanza
function deleteRoom(room)
{
  var request = "https://matrix.org/_matrix/client/r0/rooms/" + room.roomId + "/leave";

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "POST", request, false );   
  xmlHttp.send();
}

exports.RoomCreate =  RoomCreate;
exports.matrixClient = matrixClient;
exports.sendMessage = sendMessage;
exports.deleteRoom = deleteRoom;

