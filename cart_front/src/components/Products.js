
import React, {useState, useEffect} from 'react';
import ProductService from '../services/product-services';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {formatCurrency} from "../utilities/formatCurrency";
import {Row} from "react-bootstrap";
import {Product} from "./Product";
function Products({products,cartItems,token,setCartItems,cartId}) {
  return (
    <>
      <Row md={2} xs={1} lg={3} className='g-3'>

                {products.map((product) => {
                        return (<Product key={product.id} product={product}  cartItems={cartItems} 
                          token={token} setCartItems={setCartItems} cartId={cartId}/>
                        )
                    }
                )}
            </Row>
    </>)
}

export default Products