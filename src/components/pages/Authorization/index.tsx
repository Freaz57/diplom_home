import Header from "../../Header";
import styles from './Authorization.module.css'

import Footer from "../../Footer";
import PageTitle from "../../PageTitle";
import SignIn from "../../SignIn";


const Authorization = () => {
    return (

        <div className={styles.signIn}>
            <PageTitle title="Sign in | Goods4you" />
            <Header/>
            <main className={styles.main}>
                <SignIn/>
            </main>
            <Footer/>
        </div>
    )
}

export default Authorization;