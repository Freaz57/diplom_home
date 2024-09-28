import styles from './Cart.module.css';
import shop from '../../assets/images/shop-blank.svg'

interface IProps {
    cartView: boolean;
    totalQuantity: number;
}

const Cart = ({cartView, totalQuantity}:IProps) => {


    return (

        <div  className={styles.content}>
            {cartView && (<img src={shop} alt="shop" className={styles.cart__image } />)}
            {totalQuantity > 0 && (<p className={styles.count}>{totalQuantity}</p>)}
        </div>
    )
}

export default Cart;