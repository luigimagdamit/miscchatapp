import "./App.css"
const Message = ({metadata}) => {
    //const author = metadata.author
    const 
        { author,
          content,
          id,
          channel
        } = metadata
    return (
      <div className="message">
        <h4>{author}</h4>
        <h5>{id} {channel}</h5>
        <h3>{content}</h3>
      </div>
    )
}
export default Message;