
// import React, {useState, useEffect} from 'react';

import {Row,Col} from "react-bootstrap";
import {Product} from "./Product";
function Products({products,cartItems,token,setCartItems,cartId}) {
  return (
    <>
      <Row md={2} xs={1} lg={4} className='g-3'>

                {products.map((product) => {
                        return (<Col key={product.id} className='mb-2'>
                        <Product
                          product={product}
                          cartItems={cartItems}
                          setCartItems={setCartItems}
                          token={token}
                          cartId={cartId}
                        />
                      </Col>
                        )
                    }
                )}
            </Row>
    </>)
}

export default Products