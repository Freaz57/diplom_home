import styles from './Catalog.module.css';
import CatalogList from "../CatalogList";
import ShowMore from "../ShowMore";
import SearchCatalog from "../SearchCatalog";
import { useSearchProductsQuery } from "../../store/apiSlice/apiSlice";
import { IProduct } from '../../store/interface/interface';
import LoadingComponent from "../LoadingComponent";
import {useEffect, useState} from "react";
import Page404 from "../pages/404";

const Catalog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [skip, setSkip] = useState(0);
    const limit = 12;
    const [products, setProducts] = useState<IProduct[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const { data, isLoading, isError } = useSearchProductsQuery({
        q: searchQuery,
        limit,
        skip
    });

    useEffect(() => {
        if(searchQuery === '') {
            setProducts([]);
            setSkip(0);
            setHasMore(true)

        } else {
            setProducts([]);
            setSkip(0);
        }
    }, [searchQuery]);

    useEffect(() => {
        if (data) {
            setProducts(prevState => [...prevState, ...data.products]);
            setHasMore(data.products.length === limit && (skip + limit) < data.total);
        }

    }, [data]);

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setSkip(prevSkip => prevSkip + limit);
        }
    };



    if (isLoading && skip === 0) return <div><LoadingComponent loading={isLoading}/></div>;
    if (isError) return <div><Page404/></div>;

    return (
        <section id='catalog'>
            <div className={styles.container}>
                <h2 className={styles.title}>Catalog</h2>
                <SearchCatalog onSearchChange={handleSearchChange} />
                <div className={styles.content}>
                    <CatalogList products={products} />
                    <ShowMore onClick={handleLoadMore} hasMore={hasMore} />
                </div>
            </div>
        </section>
    );
};

export default Catalog;
