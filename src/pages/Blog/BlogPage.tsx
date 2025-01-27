/* eslint-disable @typescript-eslint/no-explicit-any */
import Blog from '../../components/Blog/Blog';
// import { ArticleInterface } from '../../services/interfaces/Article';
import { useTranslation } from "react-i18next";


export default function BlogPage(){
    const { t } = useTranslation();

    return(
        <>
            <h1 className="text-4xl text-center mb-8 font-h1">{t("blog.list")}</h1>
            
            <div className='flex flex-wrap justify-center'>
                <Blog  />
            </div>
        </>
    )
}