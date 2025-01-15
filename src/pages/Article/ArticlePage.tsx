/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ArticleInterface } from '../../services/interfaces/Article';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, Button, TextInput, Textarea } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";
import { MdAddToPhotos } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { PiArticleNyTimesDuotone } from "react-icons/pi";
// import { CiPen } from "react-icons/ci";
import './Article.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase-config';

interface ArticleProp {
    handleSubmitArticle: (article:ArticleInterface) => void;
}

export default function ArticlePage(props:ArticleProp){
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const handleSubmitArticle = props.handleSubmitArticle;

    // Create a dynamic validation schema based on the language
    const getValidationSchema = () => {
        return Yup.object({
            authorName: Yup.string()
                .min(3, `${t('article.errors.minimum')}`)
                .max(25, `${t('article.errors.maximum')}`)
                .required(`${t('article.errors.authorName')}`),
            title: Yup.string()
                .min(3, `${t('article.errors.minimum')}`)
                .max(25, `${t('article.errors.maximum')}`)
                .required(`${t('article.errors.title')}`),
            description: Yup.string()
                .min(3, `${t('article.errors.minimum')}`)
                .required(`${t('article.errors.description')}`)
        });
    };

    const formik = useFormik({
        initialValues: {
            // authorName: "",
            title: "",
            description: "",
            date: "",
            author: {
                name: '',
                id: ''
            }
        },
        validationSchema: getValidationSchema(),
        onSubmit: (values) => {
            handleSubmitArticle(
                {
                    ...values,
                    id: uuidv4(),
                    date: getDate(),
                    title: '',
                    description: '',
                    author: {
                        name: undefined,
                        id: undefined
                    }
                });
            formik.resetForm();
            navigate('/#articleTitle');
        },
    });

    const getDate = (): string => {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear();
        const date = today.getDate().toString().padStart(2, '0');
        const hour = today.getHours();
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        const min = today.getMinutes();
        const formattedMin = min < 10 ? `0${min}` : min;
        return `${year}/${month}/${date} — ${formattedHour}h${formattedMin}`;
    };

    // Handle language change: reset form on language switch
    useEffect(() => {
        formik.resetForm();
    }, [i18n.language]);

    const articlesCollectionRef = collection(db, 'articles');

    const createArticle = async () => {
        const newArticle: ArticleInterface = {
            id: uuidv4(),
            title: formik.values.title,
            description: formik.values.description,
            date: getDate(),
            author: {
                name: auth.currentUser?.displayName,
                id: auth.currentUser?.uid
            }
        };
    
        await addDoc(articlesCollectionRef, {
            ...newArticle,
            author: {
                name: auth.currentUser?.displayName || 'Anonymous',
                id: auth.currentUser?.uid || 'unknown',
            }
        });
    
        handleSubmitArticle(newArticle);
        navigate('/#articleTitle');
    };

    return(
        <>

            <div className="flex justify-center items-center">
                <Card className="w-96 bg-gray-50">
                    <form id="articleForm" onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                        <h1 className="text-4xl text-center mb-8 font-h1 text-purple-900">{t("article.add")}</h1>            
                        {/* <TextInput
                            id="authorName"
                            type="text"
                            name="authorName"
                            className="font-input"
                            placeholder={t("article.authorName")}
                            onChange={formik.handleChange}
                            value={ formik.values.authorName }
                            icon={CiPen}
                            helperText={
                                <>
                                <span className="font-medium text-red-500">{formik.errors.authorName}</span>
                                </>
                            }
                        /> */}
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            className="font-input"
                            placeholder={t("article.title")}
                            onChange={formik.handleChange}
                            value={ formik.values.title }
                            icon={PiArticleNyTimesDuotone}
                            helperText={
                                <>
                                <span className="font-medium text-red-500">{formik.errors.title}</span>
                                </>
                            }
                        />
                        <div className='relative'>
                            <Textarea
                                id="description"
                                name="description"
                                className="font-input pl-10"
                                placeholder={t("article.description")}
                                onChange={formik.handleChange}
                                value={ formik.values.description }
                                rows={4}
                                helperText={
                                    <>
                                    <span className="font-medium text-red-500">{formik.errors.description}</span>
                                    </>
                                }
                            />
                            <div className='absolute left-2 top-2 text-gray-500'>
                                <TbFileDescription />
                            </div>
                        </div>
                        <TextInput
                            type="hidden"
                            id="date"
                            name="date"
                            value={ formik.values.date }
                        />
                        <Button
                            className="button"
                            type="submit"
                            onClick={ createArticle }
                        >
                            <div className='hover:before:bg-transparent hover:before:border-2 hover:before:border-violet-900 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-violet-900 relative flex gap-2 p-1 mt-2'>
                                <span className="relative text-white m-1 send transition duration-500 ease-in-out">
                                    {t("article.button")}
                                </span>
                                <span className="relative text-white m-1 envelop">
                                    <MdAddToPhotos className="ml-2 scale-150" />
                                </span>
                            </div>
                        </Button>
                        
                    </form>
                </Card>
            </div>
        </>
    )
}