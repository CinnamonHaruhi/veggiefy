import { React, useEffect, useState } from 'react'

const OrderCardButton = (props) => {
  return (
    <button type="button" className="btn-pick" id='btn-pick'
    disabled={!props.allItemsReady}>
      Picked Up
    </button>
  )
}

export default OrderCardButton