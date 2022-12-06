// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import PropTypes from 'prop-types'
import '../box-styles.css'

// 🐨 add a className prop to each div and apply the correct class names
// based on the text content
// 💰 Here are the available class names: box, box--large, box--medium, box--small
// 💰 each of the elements should have the "box" className applied

// 🐨 add a style prop to each div so their background color
// matches what the text says it should be
// 🐨 also use the style prop to make the font italic
// 💰 Here are available style attributes: backgroundColor, fontStyle

const boxTypes = ['small', 'medium', 'large']
const colorTypes = ['lightblue', 'pink', 'orange']

const Box = props => {
  const {size, color, italic = false} = props
  const sizeClassName = size ? `box--${size}` : ''
  const styles = {
    backgroundColor: color ?? 'white',
    fontStyle: italic ? 'italic' : 'none',
  }
  const string = `${size ?? 'sizeless'} ${color ?? 'colorless'} box`

  return (
    <div className={`box ${sizeClassName}`.trim()} style={styles}>
      {string}
    </div>
  )
}

const renderBox = (type, key) => {
  switch (type) {
    case 'small':
      return <Box key={key} size={type} color="lightblue" italic />
    case 'medium':
      return <Box key={key} size={type} color="pink" italic />
    case 'large':
      return <Box key={key} size={type} color="orange" italic />

    default:
      return null
  }
}

function App() {
  return (
    <div>
      {boxTypes.map((boxType, i) => {
        const key = boxType + i
        return renderBox(boxType, key)
      })}
      <Box />
      <Box color='green' />
      <Box size='medium' />
    </div>
  )
}

Box.propTypes = {
  size: PropTypes.oneOf(boxTypes),
  color: PropTypes.oneOf(colorTypes),
  italic: PropTypes.bool
}

export default App
