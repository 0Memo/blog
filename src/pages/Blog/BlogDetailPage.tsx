// import { useParams} from 'react-router-dom';
import { Card } from "flowbite-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BlogDetailPage(){
    const { t } = useTranslation();
    const { state } = useLocation();
    console.log(state);

    if (!state || !state.article) {
        return <div className='italic text-center text-red-600 text-xl'>Erreur: article non trouvé!</div>;
    }

    const { authorName, title, description, date } = state.article;


    return(
        <>
            <h1 className="text-2xl text-center">{t('blog.details')}</h1>

            <div className="flex justify-center items-center mb-4">
                <Card className="w-96 mt-8 shadow-lg border-2 border-r-violet-900">
                    <div>
                        <h3 className="text-xl font-h3 text-slate-900">
                            {t("blog.from")}
                            <strong className="ml-2 text-violet-900 border-b-4 border-violet-900"
                            >
                                {authorName}
                            </strong>
                        </h3>
                        <br />
                        <p className='text-slate-900'>{t("blog.title")} {title}</p>
                        <p className='text-slate-900'>{t("blog.description")} {description}</p>
                        <br />
                        <p className='text-slate-900'><i>{t("inbox.sent")} {date}</i></p>
                    </div>
                </Card>
            </div>
        </>
    )
}