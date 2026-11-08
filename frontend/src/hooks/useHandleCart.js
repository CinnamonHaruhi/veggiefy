import React, { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

export default function useHandleCart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("useHandleCart requires a CartContext provider");
  }

  return cartContext;
}