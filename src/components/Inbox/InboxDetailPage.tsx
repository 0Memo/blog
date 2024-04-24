//import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function InboxDetailPage() {
    //const { id, name, topic, message, date } = useParams();

    const { state } = useLocation();
    console.log(state);

    // console.log(id);

    /*  if (!id) {
        return <div>Error: Message ID not found!</div>;
    } */

    

    if (!state || !state.contactForm) {
        return <div>Error: Message not found!</div>;
    }

    const { name, topic, message, date } = state.contactForm;

    // Render the component content
    return (
        <>
            <h3>Message de <span>{name}</span></h3>
            <p>Sujet: {topic}</p>
            <p>Message: {message}</p>
            <p>Envoyé {date}</p>
        </>
    );
}