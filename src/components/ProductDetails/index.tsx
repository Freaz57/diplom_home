import { useParams } from "react-router";
import star from "../../assets/images/star.svg";
import styles from "./ProductDetails.module.css";
import {selectCart, selectCartProducts, updateCart} from "../../store/cartSliceApi/cartSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks.ts";
import ButtonPlusMinus from "../ButtonPlusMinus";
import {useState} from "react";
import {IProduct} from "../../store/interface/interface.ts";

interface IProductDetailsProps {
    data?: IProduct;
}

const ProductDetails = ({data}: IProductDetailsProps) => {


    const cart = useAppSelector(selectCart);

    const dispatch = useAppDispatch()

    const { id } = useParams<{ id: string }>();
    const numberId = Number(id);

    const [currentImage, setCurrentImage] = useState(0);
    const countProducts = useAppSelector(selectCartProducts);

    const handleButtonAddCart = async (numberId:number) => {

        if (!cart || !cart.products) {
            console.error('Cart is not loaded');
            return;
        }

        if (!data) {
            console.error('Product data is not loaded');
            return;
        }

        const updatedProducts = cart.products.map(product =>
            product.id === numberId ? { ...product, quantity: product.quantity + 1 } : product
        );

        if (!updatedProducts.find(product => product.id === numberId)) {

            updatedProducts.push({
                id: data.id,
                title: data.title,
                price: data.price,
                quantity: 1,
                total: data.price,
                discountPercentage: data.discountPercentage,
                discountedTotal: data.price - (data.price * (data.discountPercentage / 100)),
                thumbnail: data.thumbnail,
            });
        }

        await dispatch(updateCart({
            userId: cart.id,
            products: updatedProducts
        })).unwrap();
    };



    const actualPrice = data
        ? (
            data.price - ((data.price / 100) * data.discountPercentage || 0)
        ).toFixed(2)
        : null;

    const handleGalleryClick = (index: number) => {
        setCurrentImage(index);
    };

    const ratingsGenerate = (rating: number) => {
        const stars = []
        for (let index = 0; index < 5; index++) {
            stars.push(index < Math.round(rating) ? (<img src={star} alt="star" />) : (<img src={star} alt="star" className={styles.grayStar}/>));
        }
        return stars;
    };



    return (
        <section className={styles.productContainer}>
            <div className={styles.imageGallery}>
                <img
                    src={data?.images[currentImage]}
                    alt="Essence Mascara Lash Princess"
                    className={styles.mainImage}
                />
                <div className={styles.thumbnailContainer}>
                    {data?.images.map((_, index) => (
                        <img
                            onClick={() => handleGalleryClick(index)}
                            key={index}
                            src={data.images[index]}
                            alt="Thumbnail"
                            className={`${styles.thumbnail} ${
                                index === currentImage ? styles.thumbnailActive : ""
                            }`}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.productDetails}>
                <h2 className={styles.productTitle}>{data?.title}</h2>
                <div className={styles.ratingAndStock}>
                    <div className={styles.ratingInfo}>
                        <div className={styles.rating}>
                            {data && ratingsGenerate(data.rating).map((star, index) => (
                                <span key={index}>{star}</span>
                            ))}
                        </div>
                        <p className={styles.productCategory}>{data?.category}</p>
                    </div>

                    <p className={styles.stockStatus}>
                        In Stock - Only {data?.stock} left!
                    </p>
                </div>
                <p className={styles.productDescription}>{data?.description}</p>
                <div className={styles.warrantyAndShipping}>
                    <p>{data?.warrantyInformation}</p>
                    <p>{data?.shippingInformation}</p>
                </div>
                <div className={styles.priceAndDiscount}>
                    <div className={styles.fullPrice}>
                        <p className={styles.price}>${actualPrice}</p>
                        <p className={styles.oldPrice}>${data?.price}</p>
                    </div>
                    <p className={styles.discount}>
                        Your discount:{" "}
                        <span className={styles.procent}> {data?.discountPercentage}%</span>
                    </p>
                    {(countProducts[numberId] || 0) === 0 ? (
                        <button
                            className={styles.addToCartButton}
                            aria-label="Add product to cart"
                            onClick={() => handleButtonAddCart(numberId)}
                        >
                            Add to cart
                        </button>
                    ) : (
                        <ButtonPlusMinus
                            id={numberId}
                            counts={countProducts[numberId]}
                            top={''}
                            cart={cart}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
