import React, {  useState } from "react";
import styles from "./BurgerMenu.module.css";
import burger from "../../assets/images/burger-menu.svg";
import Cart from "../Cart";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { MenuProps } from "../Menu";
import { useAppSelector } from "../../hooks/redux-hooks.ts";


const BurgerMenu: React.FC<MenuProps> = React.memo(({ totalQuantity }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(state => state.user);


  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true });

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
      <div>
        {isOpen && <div className={styles.background} />}
        <button className={styles.button} onClick={toggleMenu}>
          <img src={burger} alt="burger menu" />
        </button>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <ul className={`${styles.links} ${isOpen ? styles.linksOpen : ''}`}>
            <li>
              <button
                  className={styles.link}
                  onClick={() => { handleScroll("catalog"); toggleMenu(); }}
              >
                Catalog
              </button>
            </li>
            <li>
              <button
                  className={styles.link}
                  onClick={() => { handleScroll("faq"); toggleMenu(); }}
              >
                FAQ
              </button>
            </li>

            <li>
              <button className={styles.link} onClick={() => toggleMenu()}>
                <Link to={'/cart'} className={styles.cart__shop}>
                  Cart
                  <Cart totalQuantity={totalQuantity} cartView={true} />
                </Link>
              </button>
            </li>
            <li>
              <button className={styles.link} onClick={() => toggleMenu()}>
                {user.firstName} {user.lastName}
              </button>
            </li>
          </ul>
        </nav>
      </div>
  );
});

export default BurgerMenu;
