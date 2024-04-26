/* eslint-disable @typescript-eslint/no-explicit-any */
import Blog from '../../components/Blog/Blog';
import { ArticleInterface } from '../../services/interfaces/Article';

interface BlogPageProp {
    articles: ArticleInterface[];
}

export default function BlogPage(props:BlogPageProp){

    const articles = props.articles;

    return(
        <>
            <h1 className="text-4xl text-center mb-8 font-h1">Tous les articles du plus récent au plus ancien</h1>
            <br />
            <Blog articles={articles} />
        </>
    )
}