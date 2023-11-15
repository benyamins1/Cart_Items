import React, { useState } from 'react'
import {Alert, Offcanvas, Stack} from "react-bootstrap";
import {formatCurrency} from "../utilities/formatCurrency";
import ProductService from "../services/product-services";
import Button from "react-bootstrap/Button";
import { CartItem } from './CartItem';

export function ShoppingCart({isOpen, closeCart,cartItems,setCartItems,token}) {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    async function removeFromCart(id) {
        const existingProductIndex = cartItems.findIndex(item => item.product.id === id)
        await ProductService.deleteCartItem(cartItems[existingProductIndex].id, token)
        setCartItems(prevCartItems => prevCartItems.filter(item => item.product.id !== id))
    }
    async function payCart() {
        await ProductService.payCart({"is_paid": true}, token)
        setPaymentSuccess(true);
    }

    return <>
        <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                {cartItems.map(item => (item.quantity > 0 &&
                        <CartItem key={item.product.id} item={item}
                                  removeFromCart={() => removeFromCart(item.product.id)}/>
                    ))}
<div
                        className='ms-auto fw-bold fs-5'>Total {' '} {formatCurrency(cartItems.reduce((total, cartItem) => {
                        return total + (cartItem?.product.price || 0) * cartItem.quantity
                    }, 0))}</div>
                    {cartItems.length > 0 && <Button variant="warning" onClick={payCart}>Pay order</Button>}
                    {paymentSuccess && (
            <Alert variant="success" className="mt-3">
              Payment was successful!
            </Alert>
          )}
                </Stack>
            </Offcanvas.Body>

        </Offcanvas>
    </>
}