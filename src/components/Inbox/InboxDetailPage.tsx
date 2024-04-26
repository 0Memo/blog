//import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";
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
            <div className="flex justify-center items-center mb-4">
                <Card className="w-96 mt-8">
                    <div>
                        <h3 className="text-xl font-h1">Message de <strong>{name}</strong></h3>
                        <br />
                        <p>Sujet: {topic}</p>
                        <p>Message: {message}</p>
                        <br />
                        <p><i>Envoyé {date}</i></p>
                    </div>
                </Card>
            </div>
        </>
    );
}