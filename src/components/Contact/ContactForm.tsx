import { ChangeEvent, FormEvent, useState } from "react";
import './ContactForm.css';
import { ContactFormInterface } from "../../services/interfaces/ContactForm";

interface ContactFormProp {
    handleSubmitContactForm: (contactForm: ContactFormInterface) => void;
}

export default function ContactForm(props:ContactFormProp){
    
    const [contactForms, setContactForms] = useState<ContactFormInterface>({
        name: "",
        topic: "",
        message: "",
        date: "",
    });
    
    const handleSubmitContactForm = props.handleSubmitContactForm;
    

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
    
        const newContactForm: ContactFormInterface = {
            name: contactForms.name,
            topic: contactForms.topic,
            message: contactForms.message,
            date: getDate()
        };

        handleSubmitContactForm(newContactForm);
        setContactForms({
            name: "",
            topic: "",
            message: "",
            date: ""
        })
    }

    function handleChange(e:ChangeEvent):void{

        const { value, name } = (e.currentTarget as HTMLInputElement);
        setContactForms({ ...contactForms, [name]: value });
    }

    
    return(
        <>
            <div>
                <h1 className="contactFormTitle">Nous contacter</h1>
                <form id="contactForm" onSubmit={handleSubmit}>

                    <input onChange={handleChange} type="text" className="" name="name" id="name" placeholder="Votre nom..." value={ contactForms.name } required />
                    <br />
                    <br />

                    <input onChange={handleChange} type="text" className="" name="topic" id="topic" placeholder="Sujet..." value={ contactForms.topic } required />
                    <br />
                    <br />

                    <textarea onChange={handleChange} name="message" id="message" placeholder="Votre message..." value={ contactForms.message } required>
                    </textarea>
                    <br />
                    <input type="hidden" className="" name="date" id="date" value={ contactForms.date } />
                    <input type="submit" value="Envoyer" className="btn btn-secondary" />
                </form>
            </div>
            
        </>
    )
}