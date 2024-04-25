import { ChangeEvent, FormEvent, useState } from 'react';
import './Article.css';
import { ArticleInterface } from '../../services/interfaces/Article';

interface ArticleProp {
    handleSubmitArticle: (article:ArticleInterface) => void;
}

export default function ArticlePage(props:ArticleProp){    

    const [articles, setArticles] = useState<ArticleInterface>({
        authorName: "",
        title: "",
        description: "",
        date: ""
    });
    
    const handleSubmitArticle = props.handleSubmitArticle;

    function handleSubmit(e: FormEvent):void{
        e.preventDefault();

        function getDate() {
            const today = new Date();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const year = today.getFullYear();
            const date = today.getDate();
            const hour = today.getHours();
            const formattedHour = hour < 10 ? `0${hour}` : hour;
            const min = today.getMinutes();
            const formattedMin = min < 10 ? `0${min}` : min;
            return `le ${date}/${month}/${year} à ${formattedHour}h${formattedMin}`;
        }
    
        const newArticle: ArticleInterface = {
            authorName: articles.authorName,
            title: articles.title,
            description: articles.description,
            date: getDate()
        };

        handleSubmitArticle(newArticle);
        setArticles({ 
            authorName: "",
            title: "",
            description: "",
            date: ""
        })
    }

    function handleChange(e: ChangeEvent):void{

        const { value, name } = (e.currentTarget as HTMLInputElement);
        setArticles({ ...articles, [name]: value });
    }

    return(
        <>
            <h1>Ajouter un article</h1>            

            <div>
                <form id="articleForm" onSubmit={handleSubmit}>
                    <input onChange={handleChange} type="text" id="authorName" name="authorName" placeholder="Nom de l'auteur..." value={ articles.authorName } required />
                    <br />
                    <br />
                    <input onChange={handleChange} type="text" id="title" name="title" placeholder="Titre de l'article..." value={ articles.title } required />
                    <br />
                    <br />
                    <textarea onChange={handleChange} name="description" id="descriprion" placeholder="Description.." value={ articles.description }  required></textarea>
                    <br />
                    <input type="hidden" className="" name="date" id="date" value={ articles.date } />
                    <br />
                    <input type="submit" value="Ajouter" className="btn btn-secondary" />
                </form>
            </div>
        </>
    )
}