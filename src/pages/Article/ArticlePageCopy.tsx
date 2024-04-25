"use client";
import './Article.css';
import { ArticleInterface } from '../../services/interfaces/Article';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, Button, TextInput, Textarea } from "flowbite-react";

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
            <h1 className="text-2xl text-center mb-8">Ajouter un article</h1>            

            <div className="flex justify-center items-center">
                <Card className="w-96 bg-gray-50">
                    <form id="articleForm" onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <TextInput
                            id="authorName"
                            type="text"
                            name="authorName"
                            placeholder="Nom de l'auteur..."
                            onChange={formik.handleChange}
                            value={ formik.values.authorName }
                            helperText={
                                <>
                                <span className="font-medium">{formik.errors.authorName}</span>
                                </>
                            }
                        />
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Titre de l'article..."
                            onChange={formik.handleChange}
                            value={ formik.values.title }
                            helperText={
                                <>
                                <span className="font-medium">{formik.errors.title}</span>
                                </>
                            }
                        />
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Description..."
                            onChange={formik.handleChange}
                            value={ formik.values.description }
                            rows={4}
                            helperText={
                                <>
                                <span className="font-medium">{formik.errors.description}</span>
                                </>
                            }
                        />
                        <TextInput
                            type="hidden"
                            id="date"
                            name="date"
                            value={ formik.values.date }
                        />
                        <Button
                            className="bg-violet-900"
                            type="submit"
                        >
                            Ajouter
                        </Button>
                        
                    </form>
                </Card>
            </div>
        </>
    )
}