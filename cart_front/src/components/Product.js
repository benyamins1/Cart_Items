import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {formatCurrency} from "../utilities/formatCurrency";
import ProductService from '../services/product-services';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export function Product({product,cartItems,token,setCartItems,cartId}) {
        function getItemQuantity(id) {
        return cartItems.find(item => item.product.id === id)?.quantity || 0
    }

  
    let quantity = getItemQuantity(product.id)
console.log(cartItems)
async function increaseCartQuantity() {
    const existingProductIndex = cartItems.findIndex((item) => item.product.id === product.id);
    if (existingProductIndex !== -1) {
        const updatedCartItems = [...cartItems];
        const updatedCartItem = {
            ...updatedCartItems[existingProductIndex],
            quantity: updatedCartItems[existingProductIndex].quantity + 1,
        };

        await ProductService.updateCartItem(updatedCartItem.id, updatedCartItem, token);

        updatedCartItems[existingProductIndex] = updatedCartItem;

        setCartItems(updatedCartItems);
    } else {
        const response = await ProductService.createCartItem({
            product: {...product},
            quantity: 1,
            cart: cartId,
        }, token);

        setCartItems([...cartItems, response.data]);
    }
}

async function decreaseCartQuantity() {
    const existingProductIndex = cartItems.findIndex((item) => item.product.id === product.id);

    if (existingProductIndex !== -1) {
        // Update existing cart item
        let updatedCartItems = [...cartItems];
        const updatedCartItem = {
            ...updatedCartItems[existingProductIndex],
            quantity: Math.max(updatedCartItems[existingProductIndex].quantity - 1, 0),
        };

        if (updatedCartItem.quantity === 0) {
            await ProductService.deleteCartItem(updatedCartItem.id, token);
            updatedCartItems = updatedCartItems.filter(item => item.product.id !== product.id);
        } else {
            await ProductService.updateCartItem(updatedCartItem.id, updatedCartItem, token);
            updatedCartItems[existingProductIndex] = updatedCartItem;
        }

        setCartItems(updatedCartItems);
    }
}

  async function removeFromCart() {
    const existingProductIndex = cartItems.findIndex(item => item.product.id === product.id)
    await ProductService.deleteCartItem(cartItems[existingProductIndex].id, token)
    setCartItems(prevCartItems => prevCartItems.filter(item => item.product.id !== product.id));
}
    return (
<Card className='h-100 mb-3'>
            <Card.Img
                variant='top'
                src={product.image}
                height='200px'
                style={{objectFit: 'contain'}}/>
                
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className='fs-2'>{product.name}</span>
                    <span className='ms-2 text-muted'>{formatCurrency(product.price)}</span>
                </Card.Title>
                <div className='mt-auto'>
                    {quantity === 0 ? (
                        <Button className='w-100' onClick={() => {
                            if (token) {
                                increaseCartQuantity();
                            } else {
                                toast.warn(
                                    <div>
                                        Please <Link to="/login">log in</Link> to add items to the cart.
                                    </div>,
                                    {
                                        position: "top-center",
                                        style: {
                                            width: "120%",                                        }
                                    }

                                );
                            }
                        }}>+ Add to cart</Button>
                    ) : (<div className='d-flex align-items-center flex-column'
                              style={{gap: '.5rem'}}>
                        <div className='d-flex align-items-center justify-content-center'
                             style={{gap: '.5rem'}}>
                            <Button onClick={decreaseCartQuantity}>-</Button>
                            <div>
                                <span className='fs-3'>{quantity}</span> in cart
                            </div>
                            <Button onClick={increaseCartQuantity}>+</Button>
                        </div>
                        <Button  variant='danger' size='sm' onClick={removeFromCart}>Remove</Button>
                    </div>)
                    }
                </div>
            </Card.Body>
        </Card>)
}

// export default Product