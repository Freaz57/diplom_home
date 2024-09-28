import styles from './ButtonShop.module.css';
import shop_image from '../../assets/images/cart.svg';
import React from "react";
import { useAppDispatch } from "../../hooks/redux-hooks.ts";
import { updateCart } from "../../store/cartSliceApi/cartSlice.ts";
import { useGetProductByIdQuery } from "../../store/apiSlice/apiSlice.ts";
import { Cart } from "../../store/interface/interface.ts";

export interface IProps {
    handleAddCount?: (e: React.MouseEvent, id: number) => void;
    id: number;
    top: string;
    cart: Cart | null;
    productId?: number;
}

const ButtonShop = ({ id, top = '', cart, productId }: IProps) => {

    const dispatch = useAppDispatch();

    const { data: productData, isLoading, isError } = useGetProductByIdQuery(id);

    const handleAdd = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const deletedProducts = JSON.parse(localStorage.getItem('deletedProduct') || '[]');
        const updatedDeletedProducts = deletedProducts.filter((product: { id: number }) => product.id !== productId);
        localStorage.setItem('deletedProduct', JSON.stringify(updatedDeletedProducts));

        if (!cart || !productData) {
            console.error('Cart or product data is not loaded');
            return;
        }

        try {
            let updatedProducts = cart.products.map(product =>
                product.id === id ? { ...product, quantity: product.quantity + 1 } : product
            );

            if (!updatedProducts.find(product => product.id === id)) {
                updatedProducts = [
                    ...updatedProducts,
                    {
                        id: productData.id,
                        title: productData.title,
                        price: productData.price,
                        quantity: 1,
                        total: productData.price,
                        discountPercentage: productData.discountPercentage,
                        discountedTotal: productData.price - (productData.price * (productData.discountPercentage / 100)),
                        thumbnail: productData.thumbnail,
                    },
                ];
            }

            await dispatch(updateCart({
                userId: cart.id,
                products: updatedProducts
            })).unwrap();

        } catch (error) {
            console.error("Failed to add item to cart", error);
        }
    };


    if (isError) {
        return (
            <button
                className={`${styles.shop__btn} ${top}`}
                disabled
                onClick={(e) => e.preventDefault()}
            >
                <img src={shop_image} alt="shop" />
                <span className={styles.errorMessage}>Error loading product</span>
            </button>
        );
    }

    return (
        <button
            className={`${styles.shop__btn} ${top} ${isLoading || productData?.stock === 0 ? styles.disabled : ''}`}
            onClick={handleAdd}
            disabled={isLoading || !productData}
        >
            <img src={shop_image} alt="shop" />
            {isLoading && <span className={styles.loadingMessage}>Loading...</span>}
        </button>
    );
}

export default ButtonShop;
