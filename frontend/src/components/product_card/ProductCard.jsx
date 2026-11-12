import './product-card.css';

const ProductCard = ({ onClick, ...props }) => {

  return (
    <>
      <div className="po-card">
        <div className="po-img-ph" role="img">Image</div>
        <h2 className="po-card-name">{props.product_name}</h2>
        <p className="po-card-price">₱{props.price}</p>
        <p className="po-card-stock"> 
          {props.quantity != 0 ? 
          <>Available Stock: <strong>{props.quantity} {props.unit}</strong></> : 
          <strong>Out of stock</strong>}
        </p>
        <button disabled={props.quantity == 0} type="button" className="po-card-add" onClick={onClick}>+</button>
      </div>
    </>
  )
}
export default ProductCard