
//client stuff  
var myUserId = "@YOUR USERNAME:";
var myAccessToken = "YOUR MATRIX ACCOUNT TOKEN HERE";
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

/*
matrixClient.once('sync', function(state, prevState, res) // client sync
{
  // refreshRooms(matrixClient.getRooms());
  // console.log("ok");
});
*/

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

    //matrixClient.sendEvent(testRoomId, "m.room.message", content, "");

    var s = "https://matrix.org/_matrix/client/r0/createRoom?access_token=";
    var body = s.concat(myAccessToken);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", body, false ); // false for synchronous request

    xmlHttp.send(JSON.stringify(
      {
        "room_alias_name" : room_name,
        "room_id" : room_id 
      }));

    console.log( xmlHttp.responseText );
  }


exports.RoomCreate =  RoomCreate;
exports.matrixClient = matrixClient;
exports.getRoomList = getRoomList;

