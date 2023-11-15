import {Button, Stack} from "react-bootstrap";
import {formatCurrency} from "../utilities/formatCurrency";


export function CartItem({item,removeFromCart}) {
    return (
        <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
            <img src={item.product.image} style={{width: '125px', height: "75px", objectFit: 'cover'}} alt='text'></img>
            <div className='me-auto'>
                <div>{item.product.name} {item.quantity > 1 &&
                <span className='text' style={{fontSize: '.65rem',color:'green'}}> X{item.quantity}</span>}</div>
                <div className='text-muted' style={{fontSize: '.75rem'}}>
                    {formatCurrency(item.product.price)}
                </div>
            </div>
            <div>
                {formatCurrency(item.product.price*item.quantity)}
                
            </div>
            <Button variant='outline-danger' size='sm' onClick={()=>removeFromCart(item.product.id)}>
                &times;
            </Button>
        </Stack>
    )
 }