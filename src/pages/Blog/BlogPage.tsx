/* eslint-disable @typescript-eslint/no-explicit-any */
import Blog from '../../components/Blog/Blog';
import { ArticleInterface } from '../../services/interfaces/Article';
import { useTranslation } from "react-i18next";

interface BlogPageProp {
    articles: ArticleInterface[];
}

export default function BlogPage(props:BlogPageProp){
    const { t } = useTranslation();
    const articles = props.articles;

    return(
        <>
            <h1 className="text-4xl text-center mb-8 font-h1">{t("blog.list")}</h1>
            <br />
            <div className='flex flex-wrap justify-center'>
                <Blog articles={articles} />
            </div>
        </>
    )
}