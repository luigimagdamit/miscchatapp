import { useEffect, useState } from 'react';

const SubmitBar = ({author, socket, currentChannel, currentRoom}) => {
    const [newMessage, setNewMessage] = useState("")
    const handleMessageChange = (event) => {
      setNewMessage(event.target.value)
      // socket.emit('typing', author)
    }
    const addMessage = (event) => {
      const messageObj = {
        author: author,
        id: socket.id,
        content: newMessage,
        channel: currentChannel,
        room: currentRoom
      }
      event.preventDefault()
      socket.emit('chat message object', messageObj)
  
      setNewMessage("")
    }
    return (
    <form onSubmit={addMessage} className='submitbar'>
      <input 
        value = {newMessage} 
        onChange={handleMessageChange}
      />
      <button type = "submit">send</button>
    </form>
    )
  }

  export default SubmitBar;