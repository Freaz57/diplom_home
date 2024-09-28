import styles from "./Header.module.css";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import Menu from "../Menu";
import BurgerMenu from "../BurgerMenu";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.ts";
import { fetchUserCart, selectIsCartLoaded, selectTotalQuantity } from "../../store/cartSliceApi/cartSlice.ts";

interface HeaderProps {
  nav?: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const user = useAppSelector(state => state.user);
  const isCartLoaded = useAppSelector(selectIsCartLoaded);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user && user.id && !isCartLoaded) {
      dispatch(fetchUserCart(user.id));
    }
  }, [user, isCartLoaded, dispatch]);



  return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="white logo Goods4you" />
            </Link>
          </div>
          {token && (isMobile ? <BurgerMenu totalQuantity={totalQuantity} /> : <Menu totalQuantity={totalQuantity} />)}
        </div>
      </header>
  );
};

export default Header;
