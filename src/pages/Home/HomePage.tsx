/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ContactForm from "../../components/Contact/ContactForm";
import Inbox from "../../components/Inbox/Inbox";
import { ContactFormInterface } from "../../services/interfaces/ContactForm";
import { Card } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import { auth, db } from "../../firebase-config";
import { BsFillTrash2Fill } from "react-icons/bs";
import { collection, deleteDoc, doc, /* getDocs, */ onSnapshot } from "firebase/firestore";
import { ArticleInterface } from "../../services/interfaces/Article";

export default function HomePage({ isAuth } : any){
    const { t } = useTranslation();
    /* const m= moment().locale('fr').format('Do MMMM YYYY, h:mm:ss');
    console.log(m); */

    const [loadingArticles, setLoadingArticles] = useState(true);

    useEffect(() => {
        // Simulate async data fetching for articles
        const timer = setTimeout(() => {
            setLoadingArticles(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const [contactForms, setContactForms] = useState<ContactFormInterface[]>(() => {
        const storedValues = localStorage.getItem("contactFormItem"); 
        return storedValues ? JSON.parse(storedValues) : [];
    });

    useEffect(() => {
        // Simulate loading for skeleton demo
        const timer = setTimeout(() => {
        setLoadingArticles(false);
        }, 1500); // Adjust the timeout as needed
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Check for hash in the URL
        const hash = window.location.hash;
        if (hash === "#articleTitle") {
            const element = document.getElementById("articleTitle");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);
    
    function handleSubmitContactForm(contactForm:ContactFormInterface):void{
        setContactForms([ ...contactForms,  contactForm]);
    }

    const [ articleList, setArticleList ] = useState<ArticleInterface[]>([]);
    console.log('articleList', articleList)
    const articlesCollectionRef = collection(db, 'articles');

    useEffect(() => {
        const unsubscribe = onSnapshot(articlesCollectionRef, (snapshot) => {
            const fetchedArticles = snapshot.docs.map((doc) => ({
                ...doc.data() as ArticleInterface,
                id: doc.id,
            }));
    
            // Debugging: Check the raw article dates
            console.log("Fetched Articles (Raw):", fetchedArticles);
    
            // Sort articles by date in descending order
            const sortedArticles = fetchedArticles.sort((a, b) => {
                const dateA = parseDate(a.date); // Parse a.date
                const dateB = parseDate(b.date); // Parse b.date
    
                // Debugging: Check parsed dates
                console.log("Parsed Date A:", dateA, "Parsed Date B:", dateB);
    
                return dateB.getTime() - dateA.getTime(); // Compare timestamps
            });
    
            setArticleList(sortedArticles);
        });
    
        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, []);
    
    // Helper function to parse date
    const parseDate = (dateString: string): Date => {
        try {
            // Replace non-standard "h" with ":" for time parsing, if present
            const normalizedDate = dateString.replace("h", ":");
    
            // Convert to a JavaScript Date object
            return new Date(normalizedDate);
        } catch (error) {
            console.error("Error parsing date:", dateString, error);
            return new Date(); // Fallback to current date if parsing fails
        }
    };

    const newestArticle = articleList[0];

    const deleteArticle = async (id: any) => {
        const articleDoc = doc(db, 'articles', id);
        await deleteDoc(articleDoc);
    }

    return(
        <>
            <h1 className="text-4xl text-center mb-24 sm:mb-8 font-h1">{t("main.title")}</h1>

            {/* <p>{m}</p> */}

            <div className="flex flex-col sm:flex-row justify-evenly m-0">
                    <Inbox />
                    <ContactForm handleSubmitContactForm={handleSubmitContactForm} />
            </div>
            
            {loadingArticles ? (
                // Skeleton Loader
                <div className="flex justify-center items-center mt-20 mb-24">
                    <div className="max-w-sm bg-gray-50 shadow-lg p-4">
                        <Skeleton height={150} width={300} className="mb-4" />
                        <Skeleton count={3} />
                    </div>
                </div>
            ) : newestArticle ? (
                    <div>
                        <div>
                            <h3 className="text-2xl text-center mt-10 mb-5 font-h3">{t("main.lastArticle.title")}</h3>
                        </div>
                        <div className="flex justify-center items-center mb-24">
                            <Card
                                className="max-w-sm mb-5 ojbect-none object-center bg-gray-50 shadow-lg"
                                imgAlt="Placeholder"
                                imgSrc="https://craftypixels.com/placeholder-image/150x150/2e1065/fff&text=Placeholder"
                                horizontal
                            >                                
                                <div className="articleText text-slate-900" id="articleTitle">
                                    <h3 className="text-lg">{t("main.lastArticle.authorName")}  <strong  className="font-h3 text-violet-900 "> {auth.currentUser?.displayName} </strong></h3>
                                    <h3><span>{t("main.lastArticle.articleTitle")}</span> {newestArticle.title}</h3>
                                    <h3><span>{t("main.lastArticle.articleDescription")}</span> {newestArticle.description}</h3>
                                    <p className="mt-2"><i>{newestArticle.date}</i></p>
                                </div>
                                {
                                    isAuth && newestArticle.author.id === auth.currentUser?.uid && (
                                        <div className="text-violet-900 self-end text-2xl hover:text-white hover:transition hover:delay-100 hover:duration-300 hover:ease-in-out hover:bg-violet-900 hover:rounded-full hover:cursor-pointer">
                                            <BsFillTrash2Fill onClick={() => { deleteArticle(newestArticle.id )} } />
                                        </div>
                                    )
                                }
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-48">
                        <p className="text-gray-200 text-lg italic font-light underline decoration-2 decoration-violet-500 underline-offset-4">{t("main.noArticles")}</p>
                    </div>
                )
            }
        </>
    )
}