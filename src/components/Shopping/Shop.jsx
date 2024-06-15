import { useEffect, useState } from "react";
import styles from './Shop.module.css';
import { Link } from "react-router-dom";

function updateCart(cart) {

    const cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);
}

export default function Shop() {
    const [ items, setItems ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ categories, setCategories ] = useState([]);
    const [ category, setCategory ] = useState('electronics');
    const [ cart, setCart ] = useState( localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [] );

    updateCart(cart);
    function updateQuantity(id, updater) {
        const quantityInput = document.querySelector(`[data-id = "${id}"] input`);
        const inputValue = quantityInput.value;
        if ( updater == '+' ) {
            quantityInput.value = +inputValue + 1;
        } 
        if ( updater == '-' ) {
            if ( inputValue > 1)
                quantityInput.value = +inputValue - 1;
        }
    }

    function addToCart(item) {
        const newCart = [...cart];
        const elementIndex = newCart.findIndex((value, index, array) => value.id === item.id);
        const quantityInput = document.querySelector(`[data-id = "${item.id}"] input`);
        const quantity = quantityInput.value;
        if(elementIndex == -1) {
            newCart.push({id: item.id, name: item.title, quantity: +quantity, image: item.image, price: item.price, });
        } else {
            newCart[elementIndex].quantity += +quantity;
        }
        quantityInput.value = 1;
        setCart(newCart);

        const popUpDiv = document.querySelector('.PopUp');
        popUpDiv.classList.remove(`${styles.on}`);
        void popUpDiv.offsetWidth;
        popUpDiv.classList.add(`${styles.on}`);
    }

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => setItems(data))
        .finally(() => setLoading(false));

        return () => {
            setLoading(true);
        }
    }, [category]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(data => setCategories(data));
        }, []);
    return (
        <div className={styles.container}>
            <div className="PopUp">Item Added to cart!</div>
            <header className={styles.navBar}>
                <Link to='/' className={styles.Links}> <img src="/Logo.png" alt="" height="100%" /> </Link>
                <Link to='./cart' className={styles.Links}> Cart </Link>
            </header>
            <section className={styles.categorySection}>
                <ul className={styles.categoryList}>
                {
                    categories.map(category => {
                        return <li key={category}>
                            <button onClick={() => setCategory(category)}>{category.charAt(0).toUpperCase() + category.slice(1)}</button>
                        </li>
                    })
                }
                </ul>

            </section>
            { loading  ? <div className={styles.loading}><img src="/Loading.gif" alt="" /></div> : 
                <ul className={styles.itemGrid}> 
                    {
                        items.map(item => {
                            return (
                                <li key = {item.id}>
                                    <div>
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <p>{item.title}</p>
                                        <p>${item.price}</p>
                                        <p data-id = {item.id}>
                                            <button onClick={() => updateQuantity(item.id, '-')}>-</button>
                                            <input type="number" defaultValue={1}/>
                                            <button onClick={() => updateQuantity(item.id, '+')}>+</button>
                                        </p>
                                        <p>
                                            <button onClick={() => addToCart(item)}>Add to Cart</button>
                                        </p>
                                    </div>
                                </li>
                            );
                        })
                    }   
                </ul>
            }
        </div>
    );
}