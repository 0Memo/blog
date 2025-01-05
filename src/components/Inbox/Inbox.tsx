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
                                            <h3 className="mb-3"><strong className="font-h3 text-violet-900">{contactForm.name}</strong>  - {contactForm.topic} <span className='text-slate-900'>{contactForm.message}</span></h3>
                                            <p className='text-slate-900'>{contactForm.date}</p>
                                        </div>
                                        <div>
                                            <Button
                                                className="!bg-violet-900 border-2 !text-white font-button hover:!bg-white hover:!text-violet-900 focus:!bg-white focus:!text-violet-900 active:!bg-white active:!text-violet-900 hover:border hover:border-2 hover:border-violet-900 focus:outline-0 focus:ring-0"
                                                onClick={() => handleViewDetail(contactForm)}>
                                                <div className="flex items-center justify-center">
                                                    <span className="text-base leading-[0.8rem]">Voir</span>
                                                    <TbSquareRoundedPlus className="ml-2 scale-150" />
                                                </div>
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