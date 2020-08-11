# Matrix Distributed Chat
Distributed chat prototype using Ionic-React based on [Matrix.org](https://matrix.org) protocol

# Requirements
+ [Node.js](https://nodejs.org/it/download/)
+ [Ionic](https://ionicframework.com/docs/intro/cli)
+ [Matrix.org JS SDK](https://github.com/matrix-org/matrix-js-sdk) - ([documentation](http://matrix-org.github.io/matrix-js-sdk/8.0.0/index.html))

# Setup
Ensure you have the latest LTS version of Node.js and yarn installed (for yarn run in terminal: `npm install -g yarn`).
To install Matrix.org JS SDK for the project, **using yarn instead of npm is recommended:** `yarn add matrix-js-sdk`. 

For the missing directories in this Ionic project (like resources, node_modules, public) just generate an [Ionic basic project](https://ionicframework.com/docs/react/your-first-app) using `ionic start appName --template=list --type=react` (this command could take a while to get executed). Then replace the **src** folder with the one provided in this repository.

# Authentication
In order to have the chat working, you must be logged to the Matrix server and put your user ID and token into the login file (/src/data/login.json). Register [here](https://element.io/get-started). Token can be retrieved into the General Settings page of your account.

# Run
Open a terminal inside the project folder and then run `ionic serve`. Open localhost:YOUR_SERVING_PORT/home in browser after that (e.g.: localhost:8100/home).
The serving port is displayed in terminal after running `ionic serve`.

# Features
&#x2611; create private rooms to chat with other people in privacy  
&#x2611; send messages into private rooms  
&#x2611; invite friends from the friends list contained into the friend.ts file (/src/data/friend.ts) that you can edit for your own whitelist, or send a message "/invite userToInvite"  
&#x2611; automatically join rooms when you are invited

# Deployment
If you are up to apply your personal changes to the app and then deploy it  (Web, Android, iOS), check this [Capacitor guide](https://capacitorjs.com/docs/getting-started/with-ionic)
