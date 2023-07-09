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
        <form onSubmit={handleAuthorSubmit}>
            <input 
                value = {newAuthor} 
                onChange = {handleAuthorChange}
            />
          <button type='submit'>Name Change</button>
        </form>
        <h1>username: {author}</h1>
      </div>
    )
  }
export default AuthorSettings