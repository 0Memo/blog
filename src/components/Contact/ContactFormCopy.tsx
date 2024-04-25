import './ContactForm.css';
import { ContactFormInterface } from "../../services/interfaces/ContactForm";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

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
                <h1 className="contactFormTitle">Nous contacter</h1>
                <form id="contactForm" onSubmit={formik.handleSubmit}>

                    <input 
                        onChange={formik.handleChange}
                        type="text"
                        className=""
                        name="name"
                        id="name"
                        placeholder="Votre nom..."
                        value={ formik.values.name }
                    />
                    <small>{formik.errors.name}</small>
                    <br />
                    <br />

                    <input
                        onChange={formik.handleChange}
                        type="text"
                        className=""
                        name="topic"
                        id="topic"
                        placeholder="Sujet..."
                        value={ formik.values.topic }
                    />
                    <small>{formik.errors.topic}</small>
                    <br />
                    <br />

                    <textarea
                        onChange={formik.handleChange}
                        name="message"
                        id="message"
                        placeholder="Votre message..."
                        value={ formik.values.message }
                    >
                    </textarea>
                    <small>{formik.errors.message}</small>
                    <br />
                    <input
                        type="hidden"
                        className=""
                        name="date"
                        id="date"
                        value={ formik.values.date }
                    />
                    <input
                        type="submit"
                        value="Envoyer"
                        className="btn btn-secondary"
                    />
                </form>
            </div>
            
        </>
    )
}