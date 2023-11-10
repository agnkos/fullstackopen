import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'
import Button from 'react-bootstrap/Button'

const Toggle = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant='info' className='text-white'>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <div className='d-flex align-items-center gap-3'> 
          <h3>Add new blog</h3>
          <Button onClick={toggleVisibility} variant='warning' className='text-white'>cancel</Button>
        </div>
        {props.children}
      </div>
    </div>
  )
})

Toggle.displayName = 'Toggle'

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggle
