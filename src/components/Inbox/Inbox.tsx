//import { Link } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import { ContactFormInterface } from '../../services/interfaces/ContactForm';
import './Inbox.css';
import { useNavigate } from 'react-router-dom';

interface InboxProp {
    contactForms: ContactFormInterface[];
}

export default function Inbox(props:InboxProp){

    const navigate = useNavigate();

    const contactForms = props.contactForms;

    const reversedContactForms = contactForms.slice().reverse();

    const handleViewDetail = (contactForm: ContactFormInterface) => {
        navigate(`/message/${contactForm.id}`, { state: { contactForm } });
    };

    return(
        <>
            <div>
                <h1 className="text-center mb-5">Boîte de réception des messages</h1>             
                    {
                        reversedContactForms.map((contactForm: ContactFormInterface) => (
                            <div className="flex justify-center items-center mb-4">
                                <Card
                                    className="w-80 bg-gray-50"      horizontal
                                >
                                    <div key={contactForm.id} className="flex space-x-8">
                                        <div>
                                            <h3 className="mb-3">{contactForm.name} - {contactForm.topic} <span>{contactForm.message}</span></h3>
                                            <p>{contactForm.date}</p>
                                        </div>
                                        <div>
                                            <Button
                                                className="bg-violet-900 text-white"
                                                outline
                                                color="violet-900"
                                                onClick={() => handleViewDetail(contactForm)}>
                                                Voir
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))
                    }
            </div>
        </>
    )
}