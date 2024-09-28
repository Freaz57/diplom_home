
import { useNavigate } from "react-router";
import { IProduct } from "../../store/interface/interface";
import ButtonShop from "../ButtonShop";
import ButtonPlusMinus from "../ButtonPlusMinus";
import styles from './CatalogList.module.css';
import {selectCart, selectCartProducts} from "../../store/cartSliceApi/cartSlice.ts";
import { useAppSelector} from "../../hooks/redux-hooks.ts";



interface CatalogListProps {
    products: IProduct[];
}

const CatalogList = ({ products }:CatalogListProps) => {

    const navigate = useNavigate();
    const countProducts = useAppSelector(selectCartProducts);
    const cart = useAppSelector(selectCart);


    const handleCardClick = (id: number): void => {
        navigate(`/product/${id}`);
    };

    return (
        <ul className={styles.list}>
            {products.length === 0 ? <li>No products found</li> : products.map((item) => (
                <li className={styles.card} key={item.id} onClick={() => handleCardClick(item.id)}>
                    <div className={styles.cardInner}>
                        <img src={item.thumbnail} alt={item.title} className={styles.image} />
                        <div className={styles.overlay}>
                            <span className={styles.detailsText}>Show details</span>
                        </div>
                    </div>
                    <div className={styles.inner}>
                        <div className={styles.infoCard}>
                            <p className={styles.title}>{item.title}</p>
                            <p className={styles.price}>${item.price}</p>
                        </div>
                        {(countProducts[item.id] || 0) === 0 ? (
                            <ButtonShop
                                id={item.id}
                                top={''}
                                cart={cart}
                            />
                        ) : (
                            <ButtonPlusMinus
                                id={item.id}
                                counts={countProducts[item.id]}
                                top={''}
                                cart={cart}
                            />
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CatalogList;
