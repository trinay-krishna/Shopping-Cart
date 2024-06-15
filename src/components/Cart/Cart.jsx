import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './Cart.module.css';

function updatelocalStorage(cart) {
    const cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);
}

export default function Cart() {
    const [ cart, setCart ] = useState( localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [] );

    updatelocalStorage(cart);

    function deleteItem(item) {
        const itemIndex = cart.findIndex((element) => item.id === element.id);

        if ( itemIndex == -1 )
            return;

        const newCart = cart.slice(0, itemIndex).concat(cart.slice(itemIndex + 1));
        setCart(newCart);

    }

    function quantityUpdate(event, item) {
        const inputElement = event.target.parentNode.firstElementChild;
        
        const newQuantity = +(inputElement.value);
        
        const itemIndex = cart.findIndex((element) => element.id === item.id);

        if( itemIndex === -1 )
            return;
        
        if( cart[itemIndex].quantity !== newQuantity ) {
            const newCart = [...cart];

            newCart[itemIndex].quantity = newQuantity;
            setCart(newCart);
        }
        
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                <Link to='/' className={styles.Links} ><img src="/Logo.png" alt="" height="100%"/></Link>
                <Link to='/shopping' className={styles.Links}>Shopping</Link>
            </div>
            <div className={styles.cartContainer}>
                <h1>Your Shopping Cart</h1>
                {
                    (cart.length === 0) 
                    ? <p>Your Cart is empty!</p>
                    : 
                    <ul>
                        {
                            cart.map((item) => {
                                return (
                                    <li key={item.id} className={styles.cartItem}>
                                        <img src={item.image} height="100%" alt="" />
                                        <div className={styles.itemInfo}>
                                            <p>{item.name}</p>
                                            <p>${item.price}</p>
                                            <p><input type="number" defaultValue={item.quantity} /> <button onClick={(e) => quantityUpdate(e, item)}>Update</button></p>
                                            <p><button onClick={() => deleteItem(item)}>Delete</button></p>
                                        </div>
                                        <div className={styles.totalPrice}>
                                            <p>Price: <br /> ${item.price * item.quantity}</p>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }

                
                {
                    (cart.length !== 0) &&
                    <div className={styles.cartTotal}>
                        <p>
                            Cart Total: $
                            {
                                cart.reduce(( accumulator, currentValue ) => accumulator + (currentValue.price * currentValue.quantity), 0)
                            }
                        </p>
                        <button>Checkout</button>
                    </div>
                }
            </div>
        </div>
    )
}