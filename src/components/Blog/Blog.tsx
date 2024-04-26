"use client";
import { ArticleInterface } from "../../services/interfaces/Article";
import { Card } from "flowbite-react";

interface BlogProp {
    articles: ArticleInterface[];
}

export default function Blog(props:BlogProp){

    const articles = props.articles.slice().reverse();

    return(
        <>
                {
                    articles?.map((article: ArticleInterface, index:number) => (
                        <div className="float-left justify-center items-center ml-36 mb-32">
                            <Card
                                className="max-w-sm ojbect-none object-center bg-gray-50"
                                imgAlt="Placeholder"
                                imgSrc="https://craftypixels.com/placeholder-image/150x150/2e1065/fff&text=Placeholder"
                                horizontal
                            >
                                <div key={index} className="mt-4 text-lg font-bold tracking-tight text-gray-700 w-48">
                                        <h3>Titre : {article.title} - Créé {article.date}</h3>
                                        <h3>Description : {article.description}</h3>
                                    <br />
                                </div>
                            </Card>
                        </div>
                    ))
                
                }
        </>
    )
}