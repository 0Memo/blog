"use client";
import './Article.css';
import { ArticleInterface } from '../../services/interfaces/Article';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ArticleProp {
    handleSubmitArticle: (article:ArticleInterface) => void;
}

export default function ArticlePage(props:ArticleProp){
    
    const handleSubmitArticle = props.handleSubmitArticle;

    const formik = useFormik({
        initialValues: {
            authorName: "",
            title: "",
            description: "",
            date: ""
        },
        validationSchema: Yup.object({
            authorName: Yup.string()
                            .min(3, "minimum 3 caractères")
                            .max(25, "maximum 25 caractères")
                            .required("Le nom de l'auteur est obligatoire"),
            title: Yup.string()
                            .min(3, "minimum 3 caractères")
                            .max(25, "maximum 25 caractères")
                            .required("Le titre est obligatoire"),
            description: Yup.string()
                            .min(3, "minimum 3 caractères")
                            .required("La description est obligatoire")
            //createdOn: Yup.date().default(() => new Date()),
        }),
        onSubmit: (values) => {
            handleSubmitArticle(
                {
                    ...values, date: getDate()
                });
            formik.resetForm();
            alert('Votre article a bien été envoyé');
        },
    });

    const getDate = (): string => {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear();
        const date = today.getDate();
        const hour = today.getHours();
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        const min = today.getMinutes();
        const formattedMin = min < 10 ? `0${min}` : min;
        return `le ${date}/${month}/${year} à ${formattedHour}h${formattedMin}`;
    };

    return(
        <>
            <h1>Ajouter un article</h1>            

            <div>
                <form id="articleForm" onSubmit={formik.handleSubmit}>
                    <input
                        onChange={formik.handleChange}
                        type="text"
                        id="authorName"
                        name="authorName"
                        placeholder="Nom de l'auteur..."
                        value={ formik.values.authorName }
                    />
                    <small>{formik.errors.authorName}</small>

                    <br />
                    <br />
                    <input
                        onChange={formik.handleChange}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Titre de l'article..."
                        value={ formik.values.title }
                    />
                    <small>{formik.errors.title}</small>

                    <br />
                    <br />
                    <textarea
                        onChange={formik.handleChange}
                        name="description"
                        id="descriprion"
                        placeholder="Description.."
                        value={ formik.values.description }
                    >                        
                    </textarea>
                    <small>{formik.errors.description}</small>

                    <br />
                    <input 
                        type="hidden"
                        className=""
                        name="date"
                        id="date"
                        value={ formik.values.date }
                    />

                    <br />
                    <input
                        type="submit"
                        value="Ajouter"
                        className="btn btn-secondary"
                    />
                    
                </form>
            </div>
        </>
    )
}