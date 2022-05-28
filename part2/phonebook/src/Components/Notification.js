
import React from 'react'

const Notification = ({ message, error }) => {
    if (message === null && error === null) {
      return null
    }
    else if (message !== null) {
        return (
      <div className="message">
        {message}
      </div>
    )
  }
    else if(error !== null) {
        return(
            <div className="error">
            {error}
          </div>   
        )
  }
}

export default Notification
