import { useState } from "react"
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
        <h2>Change Nickname</h2>
        <form onSubmit={handleAuthorSubmit}>
            <input 
                value = {newAuthor} 
                onChange = {handleAuthorChange}
            />
          <button type='submit'>Name Change</button>
        </form>
        <h3>Current nickname: {author}</h3>
      </div>
    )
  }
export default AuthorSettings