import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import ChatRoom from './components/ChatRoom'
const socket = io('http://localhost:3000')




const App = () => {
  return(
    <div>
      <ChatRoom socket = {socket}/>
    </div>
  )
}
export default App;
