//import { Link } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import { ContactFormInterface } from '../../services/interfaces/ContactForm';
import { useNavigate } from 'react-router-dom';
import { TbSquareRoundedPlus } from "react-icons/tb";

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
                <h1 className="text-2xl text-center mb-5 font-h1">Boîte de réception des messages</h1>             
                    {
                        reversedContactForms.map((contactForm: ContactFormInterface) => (
                            <div className="flex justify-center items-center mb-4">
                                <Card
                                    className="w-96 bg-gray-50 shadow-lg"
                                    horizontal
                                >
                                    <div key={contactForm.id} className="flex space-x-8">
                                        <div>
                                            <h3 className="mb-3"><strong className="font-h3 text-violet-900">{contactForm.name}</strong>  - {contactForm.topic} <span className='text-black'>{contactForm.message}</span></h3>
                                            <p>{contactForm.date}</p>
                                        </div>
                                        <div>
                                            <Button
                                                className="bg-violet-900 text-white"
                                                outline
                                                color="violet-900"
                                                onClick={() => handleViewDetail(contactForm)}>
                                                Voir <TbSquareRoundedPlus className="mt-1 ml-2 scale-150" />
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