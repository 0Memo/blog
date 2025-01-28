/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ArticleInterface } from "../../services/interfaces/Article";
import { Button, Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import '../../pages/Blog/Blog.css'
import { TbSquareRoundedPlus } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { BsFillTrash2Fill } from "react-icons/bs";

export default function Blog() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    // const articles = props.articles.slice().reverse();

    const [loading, setLoading] = useState(true);
        
    useEffect(() => {
        // Simulate loading for skeleton demo
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1500); // Adjust the timeout as needed
        return () => clearTimeout(timer);
    }, []);

    const [ articleList, setArticleList ] = useState<ArticleInterface[]>([]);
    console.log('articleList', articleList)
    const articlesCollectionRef = collection(db, 'articles');

    useEffect(() => {
        const unsubscribe = onSnapshot(articlesCollectionRef, (snapshot) => {
            const fetchedArticles = snapshot.docs.map((doc) => ({
                ...doc.data() as ArticleInterface,
                id: doc.id,
            }));
    
            // Debugging: Check the raw article dates
            console.log("Fetched Articles (Raw):", fetchedArticles);
    
            // Sort articles by date in descending order
            const sortedArticles = fetchedArticles.sort((a, b) => {
                const dateA = parseDate(a.date); // Parse a.date
                const dateB = parseDate(b.date); // Parse b.date
    
                // Debugging: Check parsed dates
                console.log("Parsed Date A:", dateA, "Parsed Date B:", dateB);
    
                return dateB.getTime() - dateA.getTime(); // Compare timestamps
            });
    
            setArticleList(sortedArticles);
        });
    
        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, []);
    
    // Helper function to parse date
    const parseDate = (dateString: string): Date => {
        try {
            // Replace non-standard "h" with ":" for time parsing, if present
            const normalizedDate = dateString.replace("h", ":");
    
            // Convert to a JavaScript Date object
            return new Date(normalizedDate);
        } catch (error) {
            console.error("Error parsing date:", dateString, error);
            return new Date(); // Fallback to current date if parsing fails
        }
    };

    const deleteArticle = async (id: any) => {
        const articleDoc = doc(db, 'articles', id);
        await deleteDoc(articleDoc);
    }

    const handleViewDetail = (article: ArticleInterface) => {
        navigate(`/blog/${article.id}`, { state: { article } });
    };

    return (
        <>
            {loading ? (
                // Skeleton Loader
                <div className="flex justify-center items-center mt-22 mb-24">
                    <div className="max-w-sm bg-gray-50 shadow-lg p-4">
                        <Skeleton height={300} width={350} className="mb-4" />
                        <Skeleton count={3} />
                    </div>
                </div>
            ) : articleList.length > 0 ? (
                    <div className="blogs-container">
                        {articleList?.map((article: ArticleInterface, index: number) => (
                            <div
                                key={index}
                                className="flex flex-col sm:w-auto w-full sm:h-50 justify-center items-center mb-20 sm:mb-20 mx-0 sm:mx-4"
                            >
                                <Card
                                    className="w-full h-full bg-gray-50 shadow-lg flex flex-col ojbect-none object-center"
                                    imgAlt="Placeholder"
                                    imgSrc="https://craftypixels.com/placeholder-image/150x150/2e1065/fff&text=Placeholder"
                                    horizontal
                                >
                                    <div className="text-md sm:text-lg tracking-tight text-gray-700 flex flex-col justify-between h-full">
                                        <h3 className="font-h3 text-lg font-semibold mb-2">
                                            <p>
                                                {article.title} — {article.date}
                                            </p>
                                        </h3>
                                        <p className="font-h3 text-base text-gray-600 mb-4">
                                            {t("blog.description")} {article.description}
                                        </p>
                                    </div>
                                    <div>
                                        <Button
                                            className="button"
                                            onClick={() => handleViewDetail(article)}>
                                                <div className='hover:before:bg-transparent hover:before:border-2 hover:before:border-violet-900 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-violet-900 relative flex gap-2 p-1 mt-2'>
                                                    <span className="relative text-white m-1 send transition duration-500 ease-in-out">
                                                        {t("inbox.more")}
                                                    </span>
                                                    <span className="relative text-white m-1 envelop">
                                                        <TbSquareRoundedPlus className="ml-2 scale-150" />
                                                    </span>
                                                </div>
                                        </Button>
                                    </div>
                                    <div className="text-violet-900 self-end text-2xl hover:text-white hover:transition hover:delay-100 hover:duration-300 hover:ease-in-out hover:bg-violet-900 hover:rounded-full hover:cursor-pointer">
                                        <BsFillTrash2Fill onClick={() => { deleteArticle(article.id )} } />
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-48">
                        <p className="text-gray-200 text-lg italic font-light underline decoration-2 decoration-violet-500 underline-offset-4">{t("blog.noArticles")}</p>
                    </div>
                )
            }
        </>
    );
}