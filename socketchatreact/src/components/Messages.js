import Message from "./Message"

const Messages = ({messages, currentChannel, currentRoom}) => {
    return (
      <div className="messages">
        {messages.map(message => {
          const metadata = {
            author: message.author, 
            content: message.content, 
            id: message.id,
            channel: message.channel,
            room: message.room
          }
          return message.channel === currentChannel ? <Message metadata = {metadata}/> : null
        })}
      </div>
    )
  }
export default Messages