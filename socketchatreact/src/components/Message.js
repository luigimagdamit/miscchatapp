import "./App.css"
const Message = ({metadata}) => {
    const author = metadata.author
    const content = metadata.content
    const id = metadata.id
    return (
      <div className="message">
        <h4>{author}</h4>
        <h5>{id}</h5>
        <h3>{content}</h3>
      </div>
    )
}
export default Message;