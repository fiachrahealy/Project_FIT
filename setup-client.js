var fs = require('fs');
var dotenv = require('dotenv').config();

if (!fs.existsSync('src/environments')) {
  fs.mkdirSync('src/environments');
  console.log('Angular Environments Directory created');
}

fs.writeFile('src/environments/environment.ts',
  'export const environment = \{\n\tproduction: false,\n\tserverURL: "' + process.env.DEV_SERVER_URL + '",\n\tfirebaseConfig: {\n\t\tapiKey: "' + process.env.FIREBASE_API_KEY + '",\n\t\tauthDomain: "' + process.env.FIREBASE_AUTH_DOMAIN + '",\n\t\tprojectId: "' + process.env.FIREBASE_PROJECT_ID + '",\n\t\tstorageBucket: "' + process.env.FIREBASE_STORAGE_BUCKET + '",\n\t\tmessagingSenderId: "' + process.env.FIREBASE_MESSAGING_SENDER_ID + '",\n\t\tappId: "' + process.env.FIREBASE_APP_ID + '",\n\t\tmeasurementId: "' + process.env.FIREBASE_MEASUREMENT_ID + '"\n\t} \n\};',
  function (err) {
    if (err) throw err;
    console.log('Angular Dev Environment File created');
  });

fs.writeFile('src/environments/environment.prod.ts',
  'export const environment = \{\n\tproduction: true,\n\tserverURL: "' + process.env.PROD_SERVER_URL + '",\n\tfirebaseConfig: {\n\t\tapiKey: "' + process.env.FIREBASE_API_KEY + '",\n\t\tauthDomain: "' + process.env.FIREBASE_AUTH_DOMAIN + '",\n\t\tprojectId: "' + process.env.FIREBASE_PROJECT_ID + '",\n\t\tstorageBucket: "' + process.env.FIREBASE_STORAGE_BUCKET + '",\n\t\tmessagingSenderId: "' + process.env.FIREBASE_MESSAGING_SENDER_ID + '",\n\t\tappId: "' + process.env.FIREBASE_APP_ID + '",\n\t\tmeasurementId: "' + process.env.FIREBASE_MEASUREMENT_ID + '"\n\t} \n\};',
  function (err) {
    if (err) throw err;
    console.log('Angular Prod Environment File created');
  });