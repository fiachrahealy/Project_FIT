var express = require('express');
var app = express();
var logger = require('morgan');
var dotenv = require('dotenv').config();
var routes = require('./routes/routes');
var bodyParser = require('body-parser');
var fs = require('fs');
const cors = require('cors');
var cloudinary = require('cloudinary');
const path = require("path");
const Configuration = require("openai");
var firebase = require("firebase-admin/app");

// Logging

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));

// Cors

var corsOptions = {
  origin: [process.env.WHITELISTED_CORS_URLS.split(", ")],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// Routes

app.use('/', routes);

// Create Empty Directory for Cloudinary Uploads

try {
  if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
    console.log('Cloudinary Upload Directory created');
  }
  else {

    // Empty Uploads Directory

    fs.readdir('uploads', (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join('uploads', file), (err) => {
          if (err) throw err;
        });
      }
    });
  }
}
catch (err) {
  console.error(err);
}

// Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Open AI

new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

// Firebase

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

// Module Exports

module.exports = app;