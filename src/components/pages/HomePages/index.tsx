import Header from "../../Header";
import styles from './HomePages.module.css'
import Intro from "../../Intro";
import Catalog from "../../Catalog";
import Faq from "../../Faq";
import Footer from "../../Footer";
import PageTitle from "../../PageTitle";

const HomePage = () => {
    return (

        <>
            <PageTitle title="Catalog | Goods4you" />
            <Header/>
            <main className={styles.main}>
                <Intro/>
                <Catalog/>
                <Faq/>
            </main>
            <Footer/>
        </>
    )
}

export default HomePage;