import Header from "../../Header";
import styles from "./BasketShopPages.module.css";
import Footer from "../../Footer";
import BascketShopItems from "../../BascketShop";
import PageTitle from "../../PageTitle";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks.ts";
import {
    fetchUserCart,
    selectCart,
    selectCartLoading,
    selectIsCartLoaded
} from "../../../store/cartSliceApi/cartSlice.ts";
import LoadingComponent from "../../LoadingComponent";
import {useEffect} from "react";


type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    discountPercentage: number;
};

const BasketShop = () => {
    const dispatch = useAppDispatch();
    const allCart = useAppSelector(selectCart);
    const loading = useAppSelector(selectCartLoading);
    const userId = useAppSelector(state => state.user.id);
    const isCartLoaded = useAppSelector(selectIsCartLoaded);


    useEffect(() => {

        if (!isCartLoaded && userId !== null) {
            dispatch(fetchUserCart(userId));
        }
    }, [dispatch, isCartLoaded, userId]);

    const products: CartItem[] = allCart?.products
        .map((product) => ({
            id: product.id,
            name: product.title,
            price: product.price,
            quantity: product.quantity,
            image: product.thumbnail,
            discountPercentage: product.discountPercentage,
        })) || [];

    return (
        <div className={styles.basketShop}>
            <PageTitle title="My cart | Goods4you" />
            <Header />
            {loading ? (
                <LoadingComponent loading={loading} />
            ) : (
                <main className={styles.main}>
                    <BascketShopItems items={products} cart={allCart} />
                </main>
            )}
            <Footer />
        </div>
    );
}

export default BasketShop;
