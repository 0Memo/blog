/* eslint-disable @typescript-eslint/no-explicit-any */
import './Blog.css';
import Blog from '../../components/Blog/Blog';
import { ArticleInterface } from '../../services/interfaces/Article';

interface BlogPageProp {
    articles: ArticleInterface[];
}

export default function BlogPage(props:BlogPageProp){

    const articles = props.articles;

    return(
        <>
            <h1 className="text-2xl text-center mb-8">Tous les articles du plus récent au plus ancien</h1>
            <br />
            <Blog articles={articles} />
        </>
    )
}