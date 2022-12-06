// Rendering Lists
// http://localhost:3000/isolated/exercise/07.js

import * as React from 'react'

const allItems = [
  {id: 'apple', value: '🍎 apple'},
  {id: 'orange', value: '🍊 orange'},
  {id: 'grape', value: '🍇 grape'},
  {id: 'pear', value: '🍐 pear'},
]

function shuffleArray(array) {
  const newArray = [...array];
  for(let i = newArray.length-1,r;i;i--){
    r = Math.floor((Math.random()*i));
    [newArray[i],newArray[r]] = [newArray[r],newArray[i]];
  }
  return newArray
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

function useInterval(callback = () => null, delay) {
  const savedCallback = React.useRef(callback)
  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  React.useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

function App() {
  const [staticItems, setStaticItems] = React.useState(allItems)
  const [items, setItems] = React.useState(allItems)
  const [shuffle, setShuffle] = React.useState(false)

  const handleShuffle = React.useCallback(() => {
    setItems(shuffleArray(items))
    setShuffle(false)
  }, [items])

  React.useEffect(() => {
    shuffle && handleShuffle()
  }, [handleShuffle, shuffle])

  const getChangeHandler = item => {
    return event => {
      const newValue = event.target.value
      setItems(allItems => 
        allItems.map(i => ({
          ...i,
          value: i.id === item.id ? newValue : i.value
        }))
        )
    }
  }

  useInterval(
    () => {
      setShuffle(true)
    },
    items.length > 1 ? 1000 : null,
  )

  function addItem() {
    const itemIds = staticItems.map(i => i.id)
    setStaticItems([
      ...staticItems,
      allItems.find(i => !itemIds.includes(i.id)),
    ])
  }

  function removeItem(id) {
    setStaticItems(staticItems.filter(i => i.id !== id))
  }

  return (
    <>
      <div className="keys">
        <button
          disabled={staticItems.length >= allItems.length}
          onClick={addItem}
        >
          add item
        </button>
        <ul style={{listStyle: 'none', paddingLeft: 0}}>
          {staticItems.map(item => (
            // 🐨 add a key prop to the <li> below. Set it to item.id
            <ListItem key={item.id} item={item} removeItem={removeItem} />
          ))}
        </ul>
      </div>
      <div className="keys" style={{padding: '0 50px'}}>
        <h1>Without a key</h1>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex'}}>
          {items.map(item => (
            // 🐨 add a key prop to the <li> below. Set it to item.id
            <ListItemNoButton item={item} onChange={getChangeHandler(item)} />
          ))}
        </ul>
      </div>
      <div className="keys" style={{padding: '0 50px'}}>
        <h1>With array index as key</h1>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex'}}>
          {items.map((item, index) => (
            // 🐨 add a key prop to the <li> below. Set it to item.id
            <ListItemNoButton key={index} item={item} onChange={getChangeHandler(item)} />
          ))}
        </ul>
      </div>
      <div className="keys" style={{padding: '0 50px'}}>
        <h1>With a Proper Key</h1>
        <ul style={{listStyle: 'none', paddingLeft: 0, display: 'flex'}}>
          {items.map(item => (
            // 🐨 add a key prop to the <li> below. Set it to item.id
            <ListItemNoButton key={item.id} item={item} onChange={getChangeHandler(item)} />
          ))}
        </ul>
      </div>
    </>
  )
}

const ListItem = ({item, removeItem = () => null}) => {
  const {value, id} = item
  return (
    <li>
      <button onClick={() => removeItem(id)}>remove</button>{' '}
      <label htmlFor={`${id}-input`}>{value}</label>{' '}
      <input id={`${id}-input`} defaultValue={value} />
    </li>
  )
}

const ListItemNoButton = ({item, onChange = () => null}) => {
  const {value, id} = item
  return (
    <li>
      <label htmlFor={`${id}-input`} />
      <input value={value} id={`${id}-input`} onChange={onChange} />
    </li>
  )
}

export default App
