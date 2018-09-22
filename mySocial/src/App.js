import React, { Component } from 'react'
import FileUpload from './FileUpload'
import './App.css'

// import firebase

import firebase from 'firebase'
class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null
    }

    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user})
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
  renderLoginButton () {
    // Sí el usuario ya esta logeado
    if (this.state.user) {
      return (
        <div>
          <img width='250' src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p> Hola {this.state.user.displayName} </p>
          <button onClick={this.handleLogout}> Salir </button>
          <FileUpload />
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
