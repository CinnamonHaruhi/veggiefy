import React from 'react'

const ConfirmDialog = ({ref, title, text, onClick, setDialogOpen}) => {
  return (
    <dialog ref={ref} className="dialog" id='logoutDialog' aria-labelledby="dialogTitle">
      <form>
        <h2 id="dialogTitle">{title}</h2>
        <div id="dialogFields">
          <p>{text}</p>
        </div>
        <div className="dialog-actions">
          <button type="button" className="dialog-btn dialog-btn-light" onClick={() => {setDialogOpen(false)}}>No</button>
          <button type="button" className="dialog-btn dialog-btn-dark" onClick={onClick}>Yes</button>
        </div>
      </form>
    </dialog>
  )
}

export default ConfirmDialog