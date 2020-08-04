// Client data

// API: https://matrix.org/docs/spec/client_server/latest#login

// READ USER DATA FROM JSON FILE
var loginInfo = require('./data/login.json');
var myUserId = loginInfo.user;
var myAccessToken = loginInfo.accessToken;

var sdk = require("matrix-js-sdk");
const { domain } = require("process");

var matrixClient = sdk.createClient(
{
  baseUrl: "https://matrix.org",
  accessToken: myAccessToken,
  userId: myUserId
});

matrixClient.startClient();

// ###############################################

// FUNCTIONS

// Rooms are private and accessible only on invite!
function RoomCreate()
{
    // Room name
    var baseName = "Soccorso";
    var dom = ":matrix.org"

    var roomName = baseName + Date.now().toString();
    var room_id = Date.now().toString() + dom;

    var body = "https://matrix.org/_matrix/client/r0/createRoom?access_token=" + myAccessToken;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", body, false );
    xmlHttp.send(JSON.stringify(
      {
        "room_alias_name" : roomName,
        "name" : roomName,
        "room_id" : room_id,
        "visibility" : "private"
      }));
  }


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
  else if(text.startsWith('/members'))
  {
    // TODO:
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


// invite someone
function inviteUser(userId, room)
{ 
  var request = "https://matrix.org/_matrix/client/r0/rooms/" + room + "/invite?access_token=" + myAccessToken;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "POST", request, false );   
  xmlHttp.send(JSON.stringify(
  {
    "user_id" : userId,
  }));

}


// lasciare una stanza
function leaveRoom(roomId)
{
  var request = "https://matrix.org/_matrix/client/r0/rooms/" + roomId + "/leave?access_token=" + myAccessToken;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "POST", request, false );   
  xmlHttp.send();
}

exports.RoomCreate =  RoomCreate;
exports.matrixClient = matrixClient;
exports.sendMessage = sendMessage;
exports.leaveRoom = leaveRoom;
exports.inviteUser = inviteUser;

