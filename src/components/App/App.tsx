import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import './App.css'
import {useAppDispatch} from "../../hooks/redux-hooks.ts";
import {useGetCurrentUserQuery} from "../../store/apiSlice/apiSlice.ts";
import {clearUser, setUser} from "../../store/userSlice/userSlice.ts";
import {FC, lazy, Suspense, useEffect} from "react";
import LoadingComponent from "../LoadingComponent";
import SafeComponent from "../SafeComponent";


const HomePage = lazy(() => import('../pages/HomePages'))
const ProductItem = lazy(() => import('../pages/ProductItemPages'))
const BasketShop = lazy(() => import('../pages/BasketShopPages'))
const Authorization = lazy(() => import('../pages/Authorization'));
const Page404 = lazy(() => import('../pages/404'));


const App: FC = () => {

    const dispatch = useAppDispatch();
    const { data: user, isLoading, isError } = useGetCurrentUserQuery();

    useEffect(() => {
        if (isLoading) return;

        if (isError || !user) {
            dispatch(clearUser());
            localStorage.removeItem('token');
        } else {
            dispatch(setUser({ ...user }));
        }
    }, [isLoading, isError, user, dispatch]);

    useEffect(() => {
        localStorage.removeItem('deletedProduct');
    }, []);

    if (isLoading) {
        return <LoadingComponent loading={isLoading} />;
    }


    return (
        <Router>
            <Suspense fallback={<LoadingComponent loading={true} />}>
                <Routes>
                    <Route path="/" element={<SafeComponent><HomePage /></SafeComponent>} />
                    <Route path="/product/:id" element={<SafeComponent><ProductItem /></SafeComponent>} />
                    <Route path="/cart" element={<SafeComponent><BasketShop /></SafeComponent>} />
                    <Route path="/login" element={<Authorization />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;



