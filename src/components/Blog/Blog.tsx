"use client";
import { ArticleInterface } from "../../services/interfaces/Article";
import { Card } from "flowbite-react";
import { useTranslation } from "react-i18next";

interface BlogProp {
    articles: ArticleInterface[];
}

export default function Blog(props: BlogProp) {
    const { t } = useTranslation();

    const articles = props.articles.slice().reverse();

    return (
        <>
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
                            {t("blog.title")} {article.title} - {t("blog.created")} {article.date}
                        </h3>
                        <p className="font-h3 text-base text-gray-600 mb-4">
                            {t("blog.description")} {article.description}
                        </p>
                    </div>
                </Card>
            </div>
        ))}
        </>
    );
}