import { useState, useEffect } from "react"

import SubmitBar from './SubmitBar'
import Messages from './Messages';
import AuthorSettings from './AuthorSettings';

const ChannelButton = ({channelName, setChannel}) => {
  const handleChannelPress = () => {
    setChannel(channelName)
  }
  return (
    <button onClick={handleChannelPress}>{channelName}</button>
  )
}
const ChannelMenu = ({channelList, setChannel}) => {
  return (
    channelList.map(channelEntry => {return <ChannelButton channelName={channelEntry} setChannel={setChannel}/>})
  )
}
const ChatRoom = ({socket, room}) => {
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [messages, setMessages] = useState([])
    const [author, setAuthor] = useState("Anonymous")
    const [roomID, setRoomID] = useState(room) // return type string
    const [channel, setChannel] = useState("#main")
    const [channelList, setChannelList] = useState(["#main", "#misc", "#nsfw"])
    const [isTyping, setIsTyping] = useState("")
    useEffect(() => {
      const onConnect = () => {
        setIsConnected(true)
      }
      
      socket.on('connect', onConnect)
      socket.emit('join room', roomID)
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
        
        <h1>Room: {room}</h1>
        <h2>Current Channel: {channel}</h2>
        <ChannelMenu channelList={channelList} setChannel={setChannel}/>
        <h2>{isTyping}</h2>
        <Messages messages = {messages} currentChannel={channel}/>
        <SubmitBar author = {author} socket={socket} currentChannel={channel}/>
      </div>
    );
  }
  export default ChatRoom