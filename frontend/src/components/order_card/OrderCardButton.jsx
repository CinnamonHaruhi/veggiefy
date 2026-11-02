import { React, useEffect, useState } from 'react'

const OrderCardButton = (props) => {

  if (props.allItemsReady) {
    return (
      <button type="button" className="btn-pick" id='btn-pick'>Picked Up</button>
    )
  }

  return (
    <button type="button" className="btn-pick" id='btn-pick' disabled>Picked Up</button>
  )
}

export default OrderCardButton