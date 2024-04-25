import { ArticleInterface } from "../../services/interfaces/Article";

interface BlogProp {
    articles: ArticleInterface[];
}

export default function Blog(props:BlogProp){

    const articles = props.articles.slice().reverse();

    return(
        <>
            {
                articles?.map((article: ArticleInterface, index:number) => (
                    <div key={index} className="articleStyle">
                        <div className="articleImage">
                            <img src="https://craftypixels.com/placeholder-image/150x150/c0bcc2/fff&text=Placeholder" alt="placeholder" />
                        </div>
                        <div className="articleText">
                            <h3><span>Titre :</span> {article.title} - <span>Créé </span> {article.date}</h3>
                            <h3><span>Description :</span> {article.description}</h3>
                        </div>
                        <br />
                    </div>
                ))
            }
        </>
    )
}