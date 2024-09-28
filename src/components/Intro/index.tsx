import styles from './Intro.module.css'

const Intro = () => {

    const handleScroll = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <section className={styles.intro}>

            <div className={styles.container}>
                <div className={styles.introInner}>
                    <h1 className={styles.title}>Any products from famous brands <br/> with worldwide delivery</h1>
                    <p className={styles.text}>We sell smartphones, laptops, clothes, shoes <br/> and many other
                        products at low prices</p>
                    <button role="button"  rel="noopener noreferrer" className={styles.button} onClick={() => handleScroll("catalog")}
                    >Go to
                        shopping</button>
                </div>


            </div>
        </section>
    )
}

export default Intro