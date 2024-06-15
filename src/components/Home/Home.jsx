import styles from './Home.module.css';

function shopNow() {
    window.location.href += 'shopping';
}

export default function Home() {
    return (
        <div className= {styles.container}>
            <header className={styles.header}>
                <h1>Shopping Cart</h1>
            </header>
            <main className={styles.mainContainer}>
                <section className={styles.wrap}>
                    <img src="./Sectionbackground.jpg" alt="" />
                    <div className={styles.content}>
                        <h2>Make Shopping Exciting</h2>
                        <p>Discover the joy of shopping with endless surprises! <br /> Shop, smile, and save – fun awaits you at every click. <br /> Your happy place for the most delightful finds!</p>
                        <button onClick={() => shopNow()}>SHOP NOW!</button>
                    </div>
                </section>
                <section className={styles.categorySection}>
                    <div>
                        <h1>Categories</h1>
                        <ul className={styles.categoryList}>
                            <li className={styles.listItem} onClick={() => shopNow()}>
                                <img src="/joystick.jpg" alt="" className={styles.cardImage} />
                                <div className={styles.cardContent}>Electronics</div>
                            </li>
                            <li className={styles.listItem} onClick={() => shopNow()}>
                                <img src="/clothing.jpg" alt="" className={styles.cardImage} />
                                <div className={styles.cardContent}>Clothing</div>
                            </li>
                            <li className={styles.listItem} onClick={() => shopNow()}>
                                <img src="/jewellery.jpg" alt="" className={styles.cardImage} />
                                <div className={styles.cardContent}>Jewellery</div>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}