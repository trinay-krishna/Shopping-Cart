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
                            <button onClick={() => setCategory(category)}>{category}</button>
                        </li>
                    })
                }
                </ul>

            </section>
            { loading  ? <div>Loading</div> : 
                <ul className={styles.itemGrid}> 
                    {
                        items.map(item => {
                            return (
                                <li key = {item.id}>
                                    <div>
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div>
                                        <p>{item.title}</p>
                                        <p>${item.price}</p>
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