import { useState, useEffect } from "react"
import SubmitBar from './SubmitBar'
import Messages from './Messages';
import AuthorSettings from './AuthorSettings';
const ChatRoom = ({socket}) => {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [messages, setMessages] = useState([])
    const [author, setAuthor] = useState("Anonymous")
    
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
        <h2>{isTyping}</h2>
        <Messages messages = {messages}/>
        <SubmitBar author = {author} socket={socket}/>
      </div>
    );
  }
  export default ChatRoom