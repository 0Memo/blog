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
        return <div>Erruerr: Message non trouvé!</div>;
    }

    const { name, topic, message, date } = state.contactForm;

    // Render the component content
    return (
        <>
            <div className="flex justify-center items-center mb-4">
                <Card className="w-96 mt-8 shadow-lg border-2 border-r-violet-900">
                    <div>
                        <h3 className="text-xl font-h3 text-slate-900">Message de <strong className="text-violet-900 border-b-4 border-violet-900">{name}</strong></h3>
                        <br />
                        <p className='text-black'>Sujet: {topic}</p>
                        <p className='text-black'>Message: {message}</p>
                        <br />
                        <p className='text-black'><i>Envoyé {date}</i></p>
                    </div>
                </Card>
            </div>
        </>
    );
}