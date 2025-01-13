//import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";

export default function InboxDetailPage() {
    //const { id, name, topic, message, date } = useParams();
    const { t } = useTranslation();
    const { state } = useLocation();
    console.log(state);

    const [loading, setLoading] = useState(true);
        
    useEffect(() => {
        // Simulate loading for skeleton demo
        const timer = setTimeout(() => {
        setLoading(false);
        }, 1500); // Adjust the timeout as needed
        return () => clearTimeout(timer);
    }, []);

    if (!state || !state.contactForm) {
        return <div className="italic text-center text-red-600 text-xl">Erreur: Message non trouvé!</div>;
    }

    const { name, topic, message, date } = state.contactForm;

    // Render the component content
    return (
        <>
            {loading ? (
                // Skeleton Loader
                <div className="flex justify-center items-center mt-30 mb-24">
                    <div className="max-w-sm bg-gray-50 shadow-lg p-4">
                        <Skeleton height={70} width={350} className="mb-4" />
                        <Skeleton count={3} />
                    </div>
                </div>
            ) : (

                <>
                    <div className="flex justify-center items-center mb-4">
                        <Card className="w-96 mt-0 shadow-lg border-2 border-r-violet-900">
                            <div>
                                <h3 className="text-xl font-h3 text-slate-900">{t("inbox.from")} <strong className="text-violet-900 border-b-4 border-violet-900">{name}</strong></h3>
                                <br />
                                <p className='text-slate-900'>{t("inbox.subject")} {topic}</p>
                                <p className='text-slate-900'>{t("inbox.message")} {message}</p>
                                <br />
                                <p className='text-slate-900'><i>{t("inbox.sent")} {date}</i></p>
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </>
    );
}