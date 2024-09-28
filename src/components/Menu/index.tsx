import React from 'react';
import Cart from "../Cart";
import styles from "./Menu.module.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../hooks/redux-hooks.ts";


export type MenuProps = {
  totalQuantity: number;
  cartView?: boolean;
};

const Menu: React.FC<MenuProps> = React.memo(({ totalQuantity }: MenuProps) => {
  const user = useAppSelector(state => state.user);
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
        <nav className={styles.nav}>
          <ul className={styles.links}>
            <li>
              <button
                  className={styles.link}
                  onClick={() => handleScroll("catalog")}
              >
                Catalog
              </button>
            </li>
            <li>
              <button
                  className={styles.link}
                  onClick={() => handleScroll("faq")}
              >
                FAQ
              </button>
            </li>
            <li>
              <button className={styles.link}>
                <Link to={'/cart'} className={styles.cart__shop}>
                  Cart
                  <Cart totalQuantity={totalQuantity} cartView={true} />
                </Link>
              </button>
            </li>
            <li>
              <button className={styles.link}>{user.firstName} {user.lastName}</button>
            </li>
          </ul>
        </nav>
      </div>
  );
});

export default Menu;
