//import { Link } from 'react-router-dom';
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
            <div className="inbox">
                <h1>Boîte de réception des messages</h1>
                {reversedContactForms.map((contactForm: ContactFormInterface) => (
                    <div key={contactForm.id} className="inboxStyle">
                        <div>
                            <h3>{contactForm.name} - {contactForm.topic} - <span className="truncate-overflow">{contactForm.message}</span></h3>
                            <p>{contactForm.date}</p>
                        </div>
                        <div>
                            <button className="inboxMessage" onClick={() => handleViewDetail(contactForm)}>Voir</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}