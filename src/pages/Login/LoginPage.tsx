/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './LoginPage.css';
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {  auth, provider } from '../../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from 'react';

interface LoginPageProps {
    setIsAuth: (isAuth: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuth }) => {
    const { t } = useTranslation();
    const { state } = useLocation();
    console.log(state);
    
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('result', result);
            localStorage.setItem('isAuth', JSON.stringify(true)); 
            setIsAuth(true);
            navigate('/');
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Simulate loading for skeleton demo
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1500); // Adjust the timeout as needed
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            { loading ? (
                // Skeleton Loader
                <div className="flex justify-center items-center mt-30 mb-24">
                    <div className="max-w-sm bg-gray-50 shadow-lg p-4">
                        <Skeleton height={250} width={300} className="mb-4" />
                        <Skeleton count={0} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="loginPage">
                        <p className='mb-32'>{t('login.signIn')}</p>
                    
                        <button
                            className="login-with-google-btn"
                            onClick={ signInWithGoogle }
                        >
                            {t('login.button')}
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default LoginPage;