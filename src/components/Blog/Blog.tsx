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
                        <div className="flex flex-row sm:float-left justify-center items-center mb-24 sm:mb-20 sm:ml-40">
                            <Card
                                className="max-w-sm mb-5 object-none object-center bg-gray-50 shadow-lg"
                                imgAlt="Placeholder"
                                imgSrc="https://craftypixels.com/placeholder-image/150x150/2e1065/fff&text=Placeholder"
                                horizontal
                            >
                                <div key={index} className="text-md sm:text-lg tracking-tight text-gray-700 w-30 sm:w-44">
                                        <h3 className="font-h3">Titre : {article.title} - Créé {article.date}</h3>
                                        <h3 className="font-h3">Description : {article.description}</h3>
                                    <br />
                                </div>
                            </Card>
                        </div>
                    ))
                
                }
        </>
    )
}