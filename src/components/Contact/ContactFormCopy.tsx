import { ContactFormInterface } from "../../services/interfaces/ContactForm";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Button, Card, TextInput, Textarea } from "flowbite-react";

interface ContactFormProp {
    handleSubmitContactForm: (contactForm: ContactFormInterface) => void;
}

export default function ContactForm(props:ContactFormProp){

    const [currentId, setCurrentId] = useState(0);
    
    const handleSubmitContactForm = props.handleSubmitContactForm;

    const formik = useFormik({
        initialValues: {
            name: "",
            topic: "",
            message: "",
            date: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                            .min(3, "minimum 3 caractères")
                            .max(25, "maximum 25 caractères")
                            .required("Le nom est obligatoire"),
            topic: Yup.string()
                            .min(3, "minimum 3 caractères")
                            .max(25, "maximum 25 caractères")
                            .required("Le sujet est obligatoire"),
            message: Yup.string()
                            .min(3, "minimum 3 caractères")
                            /* .max(25, "maximum 25 caractères") */
                            .required("Le message est obligatoire"),
            //createdOn: Yup.date().default(() => new Date()),
        }),
        onSubmit: (values) => {
            handleSubmitContactForm(
                {
                    ...values, id: idIncrement(currentId), date: getDate()
                }
            );
            setCurrentId(idIncrement(currentId));
            formik.resetForm();
            alert('Votre message a bien été envoyé!');
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

    const idIncrement = (id:number) => {
        return id + 1;
    }
    
    return(
        <>
            <div>
                <h1 className="text-2xl text-center mb-5 font-h1">Nous contacter</h1>


                <div className="flex justify-center items-center">
                    <Card className="w-96 bg-gray-50 shadow-lg">
                        <form id="contactForm" onSubmit={formik.handleSubmit}>
                        
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                className="font-input"
                                placeholder="Votre nom..."
                                onChange={formik.handleChange}
                                value={ formik.values.name }
                                helperText={
                                    <>
                                    <span className="font-medium">{formik.errors.name}</span>
                                    </>
                                }
                            />
                            <TextInput
                                id="topic"
                                type="text"
                                name="topic"
                                className="font-input"
                                placeholder="Sujet..."
                                onChange={formik.handleChange}
                                value={ formik.values.topic }
                                helperText={
                                    <>
                                    <span className="font-medium">{formik.errors.topic}</span>
                                    </>
                                }
                            />
                            <Textarea
                                id="message"
                                name="message"
                                className="font-input"
                                placeholder="Votre message..."
                                onChange={formik.handleChange}
                                value={ formik.values.message }
                                rows={4}
                                helperText={
                                    <>
                                    <span className="font-medium">{formik.errors.message}</span>
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
                                className="bg-violet-900 font-button"
                                type="submit"
                            >
                                Envoyer
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
            
        </>
    )
}