import { React, useEffect } from 'react'
import axios from 'axios';

const OrderCardButton = (props) => {
  return (
    <button type="button" className="btn-pick" id='btn-pick' disabled>Picked Up</button>
  )
}

export default OrderCardButton