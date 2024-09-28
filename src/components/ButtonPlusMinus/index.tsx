import React from "react";
import styles from "./ButtonPlusMinus.module.css";
import minus from "../../assets/images/minus.svg";
import plus from "../../assets/images/plus.svg";
import {useAppDispatch} from "../../hooks/redux-hooks.ts";
import {updateCart} from "../../store/cartSliceApi/cartSlice.ts";
import {useGetProductByIdQuery} from "../../store/apiSlice/apiSlice.ts";
import {Cart} from "../../store/interface/interface.ts";

export interface IProps {
    handleAddCount?: (e: React.MouseEvent, id: number) => void;
    handleRemoveCount?: (e: React.MouseEvent, id: number) => void;
    id: number;
    counts: number;
    top?: string;
    cart?: Cart | null;
}

const ButtonPlusMinus = ({ id, counts, top = '', cart}: IProps) => {

    const dispatch = useAppDispatch();
    const { data: productData, isLoading, isError } = useGetProductByIdQuery(id);


    const handleAdd = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();


        if (!cart || !productData) {
            console.error('Cart or product data is not loaded');
            return;
        }

        if (counts < productData.stock) {
            try {

                const updatedProducts = cart.products.map(product =>
                    product.id === id ? { ...product, quantity: counts + 1, total: product.price * (counts + 1),
                        discountedTotal: (product.price * (counts + 1)) * (1 - product.discountPercentage / 100) } : product
                );



                if (!updatedProducts.find(product => product.id === id)) {

                    updatedProducts.push({
                        id,
                        title: productData.title,
                        price: productData.price,
                        quantity: counts + 1,
                        total: productData.price * (counts + 1),
                        discountPercentage: productData.discountPercentage,
                        discountedTotal: (productData.price * (counts + 1)) * (1 - productData.discountPercentage / 100),
                        thumbnail: productData.thumbnail,
                        isRemoved: false,
                    });
                }

                await dispatch(updateCart({
                    userId: cart.id,
                    products: updatedProducts
                })).unwrap();
            } catch (error) {
                console.error("Failed to add item to cart", error);
            }
        }
    };

    const handleRemove = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (!cart || !productData) {
            console.error('Cart or product data is not loaded');
            return;
        }

        if (counts > 0) {
            try {

                const removedProduct = cart.products.find(product => product.id === id);

                if (removedProduct && removedProduct.quantity === 1) {
                    const deletedProducts = JSON.parse(localStorage.getItem('deletedProduct') || '[]');
                    deletedProducts.unshift(removedProduct);
                    localStorage.setItem('deletedProduct', JSON.stringify(deletedProducts));
                }

                const updatedProducts = cart.products
                    .map(product =>
                        product.id === id
                            ? { ...product, quantity: counts - 1 }
                            : product
                    )
                    .filter(product => product.quantity > 0);



                await dispatch(updateCart({
                    userId: cart.id,
                    products: updatedProducts
                })).unwrap();


            } catch (error) {
                console.error("Failed to remove item from cart", error);
            }
        }
    };

    return (
        <div className={`${styles.counter__item} ${top}`}>
            {isError ? (
                <p className={styles.errorText}>Failed to load product data</p>
            ) : (
                <>
                    <button
                        className={`${styles.shop_plus__minus} ${isLoading  ? styles.disabled : ''}`}
                        onClick={handleRemove}
                        disabled={isLoading || counts === 0}
                    >
                        <img src={minus} alt="minus" />
                    </button>
                    <p className={styles.shop_item__count}>
                        {counts} {counts > 1 ? 'items' : 'item'}
                    </p>
                    <button
                        className={`${styles.shop_plus__minus} ${isLoading || counts >= (productData?.stock ?? 0) ? styles.disabled : ''}`}
                        onClick={handleAdd}
                        disabled={isLoading || counts >= (productData?.stock ?? 0)}
                    >
                        <img src={plus} alt="plus" />
                    </button>
                </>
            )}
        </div>
    );
};

export default ButtonPlusMinus;
