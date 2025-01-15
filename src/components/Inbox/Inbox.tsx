/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from 'flowbite-react';
import { ContactFormInterface } from '../../services/interfaces/ContactForm';
import { useNavigate } from 'react-router-dom';
import { TbSquareRoundedPlus } from "react-icons/tb";
import './Inbox.css';
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { BsFillTrash2Fill } from 'react-icons/bs';

export default function Inbox(){
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [contactForms, setContactForms] = useState<ContactFormInterface[]>([]);
    const reversedContactForms = contactForms.slice().reverse();

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Simulate loading for skeleton demo
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1500); // Adjust the timeout as needed
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Set up Firestore real-time listener
        const messagesCollection = collection(db, "messages");
        const q = query(messagesCollection, orderBy("date", "desc"));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as ContactFormInterface[];
            
            setContactForms(messagesData);
            setLoading(false);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    const deleteMessage = async (id: any) => {
            const articleDoc = doc(db, 'messages', id);
            await deleteDoc(articleDoc);
        }

    const handleViewDetail = (contactForm: ContactFormInterface) => {
        navigate(`/message/${contactForm.id}`, { state: { contactForm } });
    };

    return(
        <>
            {loading ? (
                // Skeleton Loader
                <div className="flex justify-center items-center mt-14 mb-24">
                    <div className="max-w-sm bg-gray-50 shadow-lg p-4">
                        <Skeleton height={100} width={350} className="mb-4" />
                        <Skeleton count={3} />
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <h1 className="text-2xl text-center mb-5 font-h1">{t("inbox.main")}</h1>
                        {
                            contactForms.length > 0 ? (
                                <div className="cards-container">
                                    {
                                        reversedContactForms.map((contactForm: ContactFormInterface, index: number) => (
                                            <div
                                                key={index}
                                                className="flex justify-center items-center mb-4"
                                            >
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
                                                    <div className="text-violet-900 self-end text-2xl hover:text-white hover:transition hover:delay-100 hover:duration-300 hover:ease-in-out hover:bg-violet-900 hover:rounded-full hover:cursor-pointer">
                                                        <BsFillTrash2Fill onClick={() => { deleteMessage(contactForm.id )} } />
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
            )}
        </>
    )
}