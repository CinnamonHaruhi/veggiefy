import React, { useEffect, useRef, useState } from 'react'
import './dialog.css'
import axios from 'axios'
import { toast, Slide } from 'react-toastify'
import { useForm } from 'react-hook-form'

const ProductDialog = ({ action, setData, openDialog, prefillData, setPrefillData, setOpenDialog }) => {
  const dialog = useRef(null);

  useEffect(() => {
    if (dialog.current) {
      if (openDialog) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
        setPrefillData({});
      }
    }
  }, [openDialog]);

  const { 
    register, 
    handleSubmit, 
    setError,
    formState: { errors, isSubmitting } } = 
  useForm({
    values: {
      product_name: prefillData.product_name,
      unit: prefillData.unit,
      price: prefillData.price,
      quantity: prefillData.quantity
    }
  });


  const onSubmit = async (data) => {
    if (action == "edit") {
      onSubmitEdit(data);
    } else if (action == "add") {
      onSubmitAdd(data);
    }
  } 

  const onSubmitEdit = async (data) => {
    try {
      const res = await axios.put(`http://localhost:5000/admin/products/${prefillData.product_id}`, data);
      toast.success("Product updated successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      setData(res.data);
      console.log(res.data);
      setOpenDialog(false);
    } catch (err) {
      const subjectOfError = err.response.data.subject;
      const errorMessage = err.response.data.message;
      setError(subjectOfError, {
        message: errorMessage
      });
    }
  }

  const onSubmitAdd = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/admin/products/", data);
      toast.success("Product addedd successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      setData(res.data);
      console.log(res);
      setOpenDialog(false);
    } catch (err) {
      const subjectOfError = err.response.data.subject;
      const errorMessage = err.response.data.message;
      setError(subjectOfError, {
        message: errorMessage
      });
    }
  }

  return (
    <dialog ref={dialog} className="dialog" id="productDialog" aria-labelledby="dialogTitle">
      <form id="dialogForm" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 id="dialogTitle">Product</h2>

        <div id="dialogFields">
          <label>Product Name
            <input {...register("product_name", {
              required: "Product name is required",
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Product name cannot contain numbers"
              },
              minLength: {
                value: 2, 
                message: "Product name must have at least 2 characters"
              },
              maxLength: {
                value: 50,
                message: "Product name cannot exceed 50 characters"
              }
            })}
            type="text" id="fName" 
            />
            {errors.product_name && <div className='error-msg'>{errors.product_name.message}</div>}
          </label>
          <label>Unit
            <input 
            {...register("unit", {
              required: "Unit is required",
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Unit cannot contain numbers"
              },
              maxLength: {
                value: 3,
                message: "Unit cannot exceed 3 characters"
              }
            })}
            type="text" id="fUnit"
            />
            {errors.unit && <div className='error-msg'>{errors.unit.message}</div>}
          </label>
          <label>Price (₱)
            <input 
            {...register("price", {
              required: "Price is required",
              pattern: {
                value:  /^\d+\.\d{2}$/,
                message: "Price must be in a two decimal format"
              },
              min: {
                value: 0.10,
                message: "Price cannot be zero" 
              },
              max: {
                value: 9999.99,
                message: "Price cannot exceed 9999.99"
              }
            })}
            type="number" id="fPrice"
            />
            {errors.price && <div className='error-msg'>{errors.price.message}</div>}
          </label>
          <label>Quantity
            <input
            {...register("quantity", {
              required: "Quantity is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Quantity cannot contain letters or symbols"
              },
              min: {
                value: 0,
                message: "Quantity cannot be less than 0"
              },
              max: {
                value: 9999999,
                message: "Quantity cannot exceed 9999999"
              }
            })}
            type="number" id="fQuantity"
            />
            {errors.quantity && <div className='error-msg'>{errors.quantity.message}</div>}
          </label>
        </div>

        <p id="dialogMessage" className="dialog-message" hidden></p>
        <p id="dialogError" className="dialog-error" role="alert"></p>

        <div className="dialog-actions">
          <button type="button" className="dialog-btn dialog-btn-light" id="dialogCancel" onClick={() => {setOpenDialog(false)}}>Cancel</button>
          <button disabled={isSubmitting} type="submit" className="dialog-btn dialog-btn-dark" id="dialogSubmit">
            {isSubmitting ? "Loading..." : action == "add" ? "Add" : "Save"}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default ProductDialog