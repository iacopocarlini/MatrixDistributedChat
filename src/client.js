// ###############################################
// CLIENT DATA AND INITIALIZATION

// READ USER DATA FROM JSON FILE - (alternative with client-server API: https://matrix.org/docs/spec/client_server/latest#login)
var loginInfo = require('./data/login.json');
var myUserId = loginInfo.user;
var myAccessToken = loginInfo.accessToken;

// requirements
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

// FUNCTIONS (Using MATRIX.org Client / Server API: https://matrix.org/docs/spec/client_server/latest) 
// NOTE: Each request to the server is done by the user using his/her own access token to be authenticated by the server

/* Rooms are private and accessible only on invitation from another user!
   IN: none 
   OUT: the request to create the room */
function createRoom()
{
    // Room name
    var baseName = "Soccorso";
    var dom = ":matrix.org";

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


/* Message delivery function
   IN: the message text, the room
   OUT: the message request to the server */
function sendMessage(text, room)
{
  // Check for empty/null text...
  if(text === undefined)
    return;

  // INVITE A NEW USER from chat textbox 
  else if(text.startsWith('/invite')) 
  {
    var userToInvite = text.substr(8); // 8 = "/invite" string size that can be used in chat message box to invite someone
    inviteUser(userToInvite, room);
  }

  // Get room members..
  else if(text.startsWith('/members'))
    return; //eventually implement this to see room members list from command "/members" in chat textbox


  // no special tag (like /...) is used at the beginning of the message
  // TEXT MESSAGE
  else
  {
    const content =
    {
      "body": text,
      "msgtype": "m.text",
    };

    // Sends a message as an event into the room timeline
    matrixClient.sendEvent(room, "m.room.message", content, "", (err, res) => {
      console.log(err);
    });
  }
}


/* invite someone  
   IN: the user id of the user to invite, the room in which to invite the user 
   OUT: the invite request to the server
   redirected to the interested user (as an invite notification) */
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


/* Leave a room 
   IN: the room to be left id 
   OUT: the leave room request to the server */
function leaveRoom(roomId)
{
  var request = "https://matrix.org/_matrix/client/r0/rooms/" + roomId + "/leave?access_token=" + myAccessToken;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "POST", request, false );   
  xmlHttp.send();
}


// ###############################################

// EXPORTED ELEMENTS TO THE VIEW

// exported client
exports.matrixClient = matrixClient;

// exported functions
exports.createRoom =  createRoom;
exports.sendMessage = sendMessage;
exports.leaveRoom = leaveRoom;
exports.inviteUser = inviteUser;

