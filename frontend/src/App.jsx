import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import './App.css'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import home from './pages/home'
import Chat from './pages/chat'

function App() {
  return (
    <>
    <div className='App'>
      <Route path="/" component={home} exact/>
      <Route path="/chats" component={Chat} exact/>
    </div>
    </>
  )
}

export default App;
