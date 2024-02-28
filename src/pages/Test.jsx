import React from 'react'
import { useParams } from 'react-router-dom'

function Test() {
    let {slug}=useParams()
  return (
    <div>Test: {slug}</div>
  )
}

export default Test