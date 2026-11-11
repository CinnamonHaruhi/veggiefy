const generateOrderNumber = () => {
  const randomString = Math.random().toString(36).slice(2, 10).toUpperCase();

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; 
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const date = `${year}${month}${day}`;

  const orderNum = "ORD" + "-" + date + "-" + randomString;
  return orderNum;
}

export default generateOrderNumber