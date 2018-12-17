import React from 'react'
import './backdrop.scss'

const Backdrop = ({ hideBackdrop, show }) => {
  const fHideBackdrop = () => {
    document.querySelector('#backdrop').classList.add('fadeOut')
    setTimeout(() => {
      hideBackdrop()
    }, 500)
  }

  /* eslint-disable */
  if (show) {
    return (<div
      tabIndex={0}
      id="backdrop"
      role="button"
      onClick={fHideBackdrop}
      className="backdrop animated fadeIn"
    />)
  }
  return null
}

export default Backdrop