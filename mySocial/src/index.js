import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'
import * as firebase from 'firebase'
// import FileUpload from './FileUpload'

var config = {
  apiKey: 'AIzaSyAtSswEBoMSKEmTCLYqtyshjlRbD8Ij5RU',
  authDomain: 'red-social-ux.firebaseapp.com',
  databaseURL: 'https://red-social-ux.firebaseio.com',
  projectId: 'red-social-ux',
  storageBucket: 'red-social-ux.appspot.com',
  messagingSenderId: '517777747889'
}
firebase.initializeApp(config)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
// registerServiceWorker()
