// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  const [username, setUsername] = React.useState()
  const usernameInputId = 'usernameInput'
  const usernameInputRef = React.useRef(null)
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  const handleSubmit = e => {
    e.preventDefault()
    const inputEl = e.target.elements[usernameInputId]
    console.dir(inputEl)
    // const value = inputEl.value
    // const value = usernameInputRef.current.value
    onSubmitUsername(username)
  }
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input

  const handleInputChange = ({ target }) => {
    const { value } = target
    const isValid = value === value.toLowerCase()
    // setError(isValid ? null : 'Username must be lower case')
    setUsername(isValid ? value : value.toLowerCase())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={usernameInputId}>Username:</label>
        <input
          value={username ?? ''}
          id={usernameInputId}
          type="text"
          ref={usernameInputRef}
          onChange={handleInputChange}
        />
      </div>
      <button disabled={!username} type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
