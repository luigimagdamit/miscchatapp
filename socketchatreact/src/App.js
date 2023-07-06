import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3000')

const SubmitBar = () => {
  const [newMessage, setNewMessage] = useState("")
  const handleMessageChange = (event) => {
    setNewMessage(event.target.value)
  }
  const addMessage = (event) => {
    event.preventDefault()
    socket.emit('chat message', newMessage)
  }
  return (
  <form onSubmit={addMessage}>
    <input 
      value = {newMessage} 
      onChange={handleMessageChange}
    />
    <button type = "submit">send</button>
  </form>
  )
}
const Messages = ({messages}) => {
  return (
    <div>
      {messages.map(message => {
        return <h1>{message}</h1>
      })}
    </div>
  )
}
const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
    }
    socket.on('connect', onConnect)
    
    socket.on('chat message', (msg) => {
      console.log(msg)
      const newMessages = [...messages, msg]
      setMessages(newMessages)
      console.log(newMessages)
    })
  }, [messages])
  
  return (
    <div className="App">
      <SubmitBar />
      <Messages messages = {messages}/>
    </div>
  );
}

export default App;
