import styles from "./BascketShop.module.css";
import ButtonShop from "../ButtonShop";
import ButtonPlusMinus from "../ButtonPlusMinus";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks.ts";
import { updateCart } from "../../store/cartSliceApi/cartSlice.ts";
import { Cart } from "../../store/interface/interface.ts";
import React, {useEffect, useState} from "react";

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    discountPercentage: number;
};

type DeletedProduct = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;

};

interface IBascketShopItemsProps {
    items: CartItem[];
    cart: Cart | null;

}

const BascketShopItems: React.FC<IBascketShopItemsProps> = React.memo(({ items, cart }: IBascketShopItemsProps) => {
    const dispatch = useAppDispatch();
    const [deletedProduct, setDeletedProduct] = useState<DeletedProduct[] | null>(null);

    useEffect(() => {
        const deleteItem = localStorage.getItem('deletedProduct');

        if(deleteItem) {
            setDeletedProduct(JSON.parse(deleteItem));
        }
    }, []);

    const handleDelete = async (id: number) => {

        if (!cart) {
            console.log('error');
            return;
        }

       const productFind = cart.products.find(product => product.id === id);

        if (productFind) {

            const deletedProducts = JSON.parse(localStorage.getItem('deletedProduct') || '[]');
            const isProductJson = deletedProducts.some((product: DeletedProduct) => product.id === id);

            if (!isProductJson) {
                deletedProducts.unshift(productFind);
                localStorage.setItem('deletedProduct', JSON.stringify(deletedProducts));
            }
        }

        const updatedProducts = cart.products.filter(product => product.id !== id);

            await dispatch(updateCart({
                userId: cart.id,
                products: updatedProducts
            })).unwrap();
    };

    const totalItems = items.length;
    const totalPriceWithoutDiscount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => {
        const discountAmount = item.price * (item.discountPercentage / 100);
        const discountedPrice = item.price - discountAmount;
        return sum + discountedPrice * item.quantity;
    }, 0).toFixed(2);

    return (
        <section className={styles.cartContainer}>
            <h2 className={styles.title}>My cart</h2>
            <div className={styles.cartInner}>
                {items.length > 0 || (deletedProduct && deletedProduct.length > 0) ? (
                    <>
                        <div className={styles.itemsCart}>
                            {items.map(item => (
                                <div key={item.id}
                                     className={`${styles.cartItem} ${item.quantity === 0 ? styles.inactive : ''}`}>
                                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                                    <div className={styles.itemDetails}>
                                        <Link to={`/Product/${item.id}`} className={styles.itemInfo}>
                                            <div className={styles.itemFullInfo}>
                                                <span className={styles.itemName}>{item.name}</span>
                                            </div>
                                            <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                                        </Link>
                                        <div className={styles.quantityControl}>
                                            {item.quantity === 0 ? (
                                                <div className={styles.shopContent}>
                                                    <ButtonShop
                                                        id={item.id}
                                                        top={styles.marginTop}
                                                        cart={cart}
                                                    />
                                                </div>
                                            ) : (
                                                <div className={styles.controlGroup}>
                                                    <ButtonPlusMinus
                                                        cart={cart}
                                                        id={item.id}
                                                        counts={item.quantity}
                                                        top={styles.marginTop}
                                                    />
                                                    <button onClick={() => handleDelete(item.id)}
                                                            className={styles.deleteButton}>
                                                        <span className={styles.deleteText}>Delete</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {deletedProduct && deletedProduct.length > 0 && deletedProduct.map((item) => (
                                <div key={item.id} className={`${styles.cartItem} ${styles.inactive}`}>
                                    <img src={item.thumbnail} alt={item.title} className={styles.itemImage} />
                                    <div className={styles.itemDetails}>
                                        <Link to={`/Product/${item.id}`} className={styles.itemInfo}>
                                            <div className={styles.itemFullInfo}>
                                                <span className={styles.itemName}>{item.title}</span>
                                            </div>
                                            <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                                        </Link>
                                        <div className={styles.quantityControl}>
                                            <div className={styles.shopContent}>
                                                <ButtonShop
                                                    id={item.id}
                                                    top={styles.marginTop}
                                                    cart={cart}
                                                    productId={item.id}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}



                        </div>
                        <div className={styles.summary}>
                            <div className={styles.summaryInner}>
                                <div className={styles.summaryItem}>
                                    <p className={styles.summaryCount}>Total count</p>
                                    <span className={styles.summaryTotalItems}>
                                        {totalItems} {totalItems > 1 ? 'items' : 'item'}
                                    </span>
                                </div>
                                <div className={styles.summaryItem}>
                                    <p className={styles.summaryPrice}>Price without discount</p>
                                    <span className={styles.summaryDiscount}>
                                        ${totalPriceWithoutDiscount.toFixed(2)}
                                    </span>
                                </div>
                                <div className={styles.summaryItem}>
                                    <p className={styles.summaryTotal}>Total price</p>
                                    <span className={styles.summaryTotalPrice}>
                                        ${totalPrice}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyCart}>No items</div>
                )}
            </div>
        </section>
    );
});

export default BascketShopItems;
