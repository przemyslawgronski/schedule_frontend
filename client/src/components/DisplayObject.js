// Component for displaying a single object

import React from 'react'

const DisplayObject = ({object, spanTag}) => {
  return (
    <>
    {Object.keys(object).map((key)=>(
        spanTag ? <span key={key}>&nbsp;{object[key]}&nbsp;</span> : <p key={key}>{key}: {object[key]}</p>
    ))}
    </>
  )
}

export default DisplayObject