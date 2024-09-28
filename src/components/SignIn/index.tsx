import styles from './SignIn.module.css';
import {useState} from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setUser } from "../../store/userSlice/userSlice";
import { useUserAuthMutation } from "../../store/apiSlice/apiSlice";
import {useNavigate} from "react-router";
import LoadingComponent from "../LoadingComponent";
import {Navigate, useLocation} from "react-router-dom";


const SignIn = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const token = localStorage.getItem('token');

    const [userAuth, { isLoading, isError }] = useUserAuthMutation();
    const navigate = useNavigate();


    if (token && location.pathname === "/login") {
        return <Navigate to="/" />;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await userAuth({ username, password }).unwrap();
            console.log(response)
            localStorage.setItem('token', response.accessToken);
            dispatch(setUser(response));
            navigate('/');

        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    if (isLoading) {
        return <LoadingComponent loading={isLoading}/>;
    }


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Sign In</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Login"
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className={styles.button} disabled={isLoading}>
                    Sign In
                </button>
                {isError && <p className={styles.error}>Failed to sign in</p>}
            </form>
        </div>
    );
};

export default SignIn;
