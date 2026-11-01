import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useSetButtonState(orderId) {
  const pickUpButton = document.getElementById("btn-pick");
  const [checklistModified, setChecklistModified] = useState(false);

  useEffect(() => {
    const setButtonState = async () => {
      const allItemsReady = await axios.get(`http://localhost:5000/admin/orders/${orderId}/items/ready`);

      if (allItemsReady.data === true) {
        pickUpButton.disabled = false;
      } else {
        pickUpButton.disabled = true;
      }
    }
    setButtonState();
    setChecklistModified(false);
  }, [checklistModified]);

  return { setChecklistModified };
}