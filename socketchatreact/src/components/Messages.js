import Message from "./Message"

const Messages = ({messages}) => {
    return (
      <div className="messages">
        {messages.map(message => {
          const metadata = {author: message.author, content: message.content, id: message.id}
          return <Message metadata = {metadata}/>
        })}
      </div>
    )
  }
export default Messages