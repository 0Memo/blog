/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './LoginPage.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth, provider } from '../../firebase-config';
import { Card } from "flowbite-react";
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoginPage = ({ setIsAuth }: { setIsAuth: (value: boolean) => void }) => {
    const { t } = useTranslation();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check authentication state on component mount
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is authenticated:', user);
                setIsAuth(true);
                localStorage.setItem('isAuth', 'true'); // Persist auth state
                navigate(state?.from || '/'); // Redirect to the previous page or home
            } else {
                console.log('No user is authenticated.');
                setIsAuth(false);
                localStorage.removeItem('isAuth');
            }
            setLoading(false); // Hide the skeleton loader
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [setIsAuth, navigate, state]);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Sign-in result:', result);
            setIsAuth(true);
            localStorage.setItem('isAuth', 'true');
            navigate('/'); // Navigate to the home page after successful login
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-72 sm:mt-64 mb-24">
                <div className="max-w-sm bg-gray-50 shadow-lg p-4">
                    <Skeleton height={250} width={300} className="mb-4" />
                    <Skeleton count={0} />
                </div>
            </div>
        );
    }

    return (
        <div className="loginPage h-screen flex items-center justify-center">
            <Card className="w-96 bg-gray-50 shadow-lg border border-2 border-beige-700">
                <p className="mb-32 text-3xl text-purple-900 text-center font-h1">{t('login.signIn')}</p>
                <button className="login-with-google-btn" onClick={signInWithGoogle}>
                    {t('login.button')}
                </button>
            </Card>
        </div>
    );
};

export default LoginPage;