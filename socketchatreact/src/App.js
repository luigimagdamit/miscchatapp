import logo from './logo.svg';
import './App.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3000')

const SubmitBar = ({author}) => {
  const [newMessage, setNewMessage] = useState("")
  const handleMessageChange = (event) => {
    setNewMessage(event.target.value)
    // socket.emit('typing', author)
  }
  const addMessage = (event) => {
    const messageObj = {
      author: author,
      content: newMessage
    }
    event.preventDefault()
    socket.emit('chat message object', messageObj)

    setNewMessage("")
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
const Message = ({metadata}) => {
  const author = metadata.author
  const content = metadata.content
  return (
    <div>
      <h1>{author + ": " + content}</h1>
    </div>
  )
}
const Messages = ({messages}) => {
  return (
    <div>
      {messages.map(message => {
        const metadata = {author: message.author, content: message.content}
        return <Message metadata = {metadata}/>
      })}
    </div>
  )
}

const AuthorSettings = ({author, setAuthor}) => {
  const [newAuthor, setNewAuthor] = useState("")
  const handleAuthorChange = (event) => {
    
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }
  const handleAuthorSubmit = (event) => {
    event.preventDefault()
    setAuthor(newAuthor)
    setNewAuthor("")
  }
  return (
    <div>
      <form onSubmit={handleAuthorSubmit}>
        <input value = {newAuthor} onChange = {handleAuthorChange}/>
        <button type='submit'>Name Change</button>
      </form>
      <h1>username: {author}</h1>
    </div>
  )
}
const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [messages, setMessages] = useState([])
  const [author, setAuthor] = useState("")
  
  const [isTyping, setIsTyping] = useState("")
  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
    }
    
    socket.on('connect', onConnect)

    socket.on('chat message object', (msg) => {
      console.log(msg)
      const newMessages = [...messages, msg]
      setMessages(newMessages)
    })
    socket.on('typing', (msg) => {
      console.log(msg)
      setIsTyping(msg)
      setTimeout(() => setIsTyping(""), 2000)
    })
  }, [messages])
  
  return (
    <div className="App">
      <AuthorSettings author = {author} setAuthor={setAuthor}/>
      <SubmitBar author = {author}/>
      <h2>{isTyping}</h2>
      <Messages messages = {messages}/>
    </div>
  );
}

export default App;
