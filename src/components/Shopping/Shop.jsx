import { useEffect, useState } from "react";
import styles from './Shop.module.css';
import { Link } from "react-router-dom";

export default function Shop() {
    const [ items, setItems ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ categories, setCategories ] = useState([]);
    const [ category, setCategory ] = useState('electronics');

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
            <header className={styles.navBar}>
                <Link to='/'> Home </Link>
                <a href="#"> Cart </a>
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
                                        <p>
                                            <button>-</button>
                                            <input type="number" defaultValue={1} id="quantityInput"/>
                                            <button>+</button></p>
                                        <p>
                                            <button>Add to Cart</button>
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