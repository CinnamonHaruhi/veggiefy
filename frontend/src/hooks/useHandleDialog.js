import { useState, useEffect } from 'react';

export default function useHandleDialog(dialogRef) {
  const [ dialogOpen, setDialogOpen ] = useState(false);
  useEffect(() => {
    if (!dialogRef) {
      return;
    }

    dialogRef.addEventListener("close", () => setDialogOpen(false));
    console.log(dialogRef);

    return () => {
      dialogRef.removeEventListener("close", () => setDialogOpen(false));
    }
  }, [dialogRef]);

  if (dialogRef) {
    if (dialogOpen) {
      dialogRef.showModal();
    } else {
      dialogRef.close();
    }
  }

  return  { setDialogOpen, dialogOpen };
}