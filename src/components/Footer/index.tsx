import Logo from '../../assets/images/logo.svg';

import styles from './Footer.module.css';
import {Link, useLocation} from "react-router-dom";
import {useNavigate} from "react-router";

const Footer = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const hadleScroll = (id:string) => {

        if (location.pathname !== '/') {
            navigate('/', {replace: true});
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }, 500)
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <footer className={styles.footer}>

            <div className={styles.container}>
                <div className={styles.footer_inner}>
                    <Link to="/" className={styles.logo}>
                        <img src={Logo}/>
                    </Link>
                </div>


                <ul className={styles.links}>
                    <li>
                    <button
                            className={styles.link}
                            onClick={() => hadleScroll('catalog')}>
                            Catalog
                        </button>
                    </li>
                    <li>
                        <button
                            className={styles.link}
                            onClick={() => hadleScroll('faq')}>
                            FAQ
                        </button>
                    </li>
                </ul>

            </div>
        </footer>
    )
}

export default Footer;