import React from 'react'
import './Healthtag.css';

const healthTag = (props) => {
  return (
    <div className='container' >
      <div className="health-cards" style={props.style}>
        <img src={props.image} alt={props.title}/>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      
    </div>
  )
}

export default healthTag
