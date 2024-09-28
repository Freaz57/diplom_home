import Header from "../../Header";
import styles from "./ProductItemPages.module.css";
import Footer from "../../Footer";
import ProductDetails from "../../ProductDetails";
import PageTitle from "../../PageTitle";
import {useGetProductByIdQuery} from "../../../store/apiSlice/apiSlice.ts";
import {useParams} from "react-router";
import LoadingComponent from "../../LoadingComponent";
import Page404 from "../404";



const ProductItemPages = () => {

    const { id } = useParams<{ id: string }>();
    const numberId = Number(id);
    const { data, isLoading, isError } = useGetProductByIdQuery(numberId);

    const title = data?.title || "Default Page Title";

    if (isLoading ) return <div><LoadingComponent loading={isLoading} /></div>;
    if (isError) return <div><Page404/></div>;

    return (
        <div className={styles.productItemPages}>
            <PageTitle title={title} />
            <Header />
            <main className={styles.main}>
                <ProductDetails data={data}/>
            </main>
            <Footer />
        </div>
    );
}

export default ProductItemPages;
