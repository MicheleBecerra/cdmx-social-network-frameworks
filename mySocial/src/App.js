import React, { Component } from 'react'
import firebase from 'firebase'
import FileUpload from './FileUpload'
import './App.css'
import logo from './logo.png'
// const  db = firebase.firestore();

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      pictures: []
    }

    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user})
    })
    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      })
    })
  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}:${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido de la sesión`))
      .catch(error => console.log(`Error ${error.code}:${error.message}`))
  }

  handleUpload (event) {
    const file = event.target.files[0]
    // console.log(file)
    const storageRef = firebase.storage().ref(`./FOTOS/${file.name}`)
    // console.log(`${file.name}`)
    const task = storageRef.put(file)
    console.log(task)
    task.on('state_changed', snapshot => {
    //  console.lg(tsnapshot);

      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(percentage)
      // console.log(snapshot)
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      console.log(error.message)
    }, () => {
      console.log(task)

      let Record = {
        photURL: this.state.user.photoURL,
        displayName: this.state.user.displayName
        // image: task.snapshot.downloadURL
      }
      // console.log(record)
      const dbRef = firebase.database().ref(`pictures`)
      const newPicture = dbRef.push()
      // console.log("1 " + newPicture)
      console.log('2', Record)
      newPicture.set(Record)
      // pictures.push(newPicture)
    })
  }

  renderLoginButton () {
    // Sí el usuario ya esta logeado
    if (this.state.user) {
      return (
        <div>
          <img width='250' src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p> Hola {this.state.user.displayName}</p>

          <FileUpload onUpload={this.handleUpload} />

          {
            this.state.pictures.map(picture => (
              <div>
                <img src={picture.image} />
                <br />
                <img width='30' src={picture.photoURL} alt={picture.displayName} />
                <br />
                <span>{picture.displayName}</span>
              </div>
            )).reverse()
          }
          <button onClick={this.handleLogout}> Salir </button>
        </div>
      )
    } else {
    // Sí no lo está
      return (<button onClick={this.handleAuth}> Login con Google</button>
      )
    }
  }
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>My Social Network </h2>

        </div>
        <p className='App-intro'>
          { this.renderLoginButton() }
        </p>
      </div>
    )
  }
}

export default App
