//import { Link } from 'react-router-dom';
import { Button, Card } from 'flowbite-react';
import { ContactFormInterface } from '../../services/interfaces/ContactForm';
import { useNavigate } from 'react-router-dom';
import { TbSquareRoundedPlus } from "react-icons/tb";
import './Inbox.css';
import { useTranslation } from "react-i18next";

interface InboxProp {
    contactForms: ContactFormInterface[];
}

export default function Inbox(props:InboxProp){
    const { t } = useTranslation();

    const navigate = useNavigate();

    const contactForms = props.contactForms;

    const reversedContactForms = contactForms.slice().reverse();

    const handleViewDetail = (contactForm: ContactFormInterface) => {
        navigate(`/message/${contactForm.id}`, { state: { contactForm } });
    };

    return(
        <>
            <div>
                <h1 className="text-2xl text-center mb-5 font-h1">{t("inbox.main")}</h1>
                {
                    contactForms.length > 0 ? (
                        <div className="cards-container">
                            {
                                reversedContactForms.map((contactForm: ContactFormInterface) => (
                                    <div className="flex justify-center items-center mb-4">
                                        <Card
                                            className="w-96 bg-gray-50 shadow-lg"
                                            horizontal
                                        >
                                            <div key={contactForm.id} className="flex space-x-8">
                                                <div>
                                                    <h3 className="mb-3"><strong className="font-h3 text-violet-900">{contactForm.name}</strong>  - {contactForm.topic} <span className='text-slate-900 block'>{contactForm.message}</span></h3>
                                                    <p className='text-slate-900'>{contactForm.date}</p>
                                                </div>
                                                <div>
                                                    <Button
                                                        className="button"
                                                        onClick={() => handleViewDetail(contactForm)}>
                                                            <div className='hover:before:bg-transparent hover:before:border-2 hover:before:border-violet-900 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-violet-900 relative flex gap-2 p-1 mt-2'>
                                                                <span className="relative text-white m-1 send transition duration-500 ease-in-out">
                                                                    {t("inbox.more")}
                                                                </span>
                                                                <span className="relative text-white m-1 envelop">
                                                                    <TbSquareRoundedPlus className="ml-2 scale-150" />
                                                                </span>
                                                            </div>
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-48">
                            <p className="text-gray-200 text-lg italic font-light underline decoration-2 decoration-violet-500 underline-offset-4">{t("inbox.noMessages")}</p>
                        </div>
                    )
                }
            </div>
        </>
    )
}