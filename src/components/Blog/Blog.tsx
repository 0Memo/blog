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

interface BlogProp {
    articles: ArticleInterface[];
}

export default function Blog(props: BlogProp) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const articles = props.articles.slice().reverse();

    const [loading, setLoading] = useState(true);
        
    useEffect(() => {
        // Simulate loading for skeleton demo
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1500); // Adjust the timeout as needed
        return () => clearTimeout(timer);
    }, []);

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
            ) : articles.length > 0 ? (
                    <div className="blogs-container">
                        {articles?.map((article: ArticleInterface, index: number) => (
                            <div
                            key={index}
                            className="flex flex-col sm:w-auto w-full sm:h-50 justify-center items-center mb-20 sm:mb-20 mx-4"
                            >
                                <Card
                                    className="w-full h-full bg-gray-50 shadow-lg flex flex-col justify-between ojbect-none object-center"
                                    imgAlt="Placeholder"
                                    imgSrc="https://craftypixels.com/placeholder-image/150x150/2e1065/fff&text=Placeholder"
                                    horizontal
                                >
                                    <div className="text-md sm:text-lg tracking-tight text-gray-700 flex flex-col justify-between h-full">
                                        <h3 className="font-h3 text-lg font-semibold mb-2">
                                            <p>
                                                {article.title} {/*:  {article.authorName} */} — 
                                                {article.date}
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