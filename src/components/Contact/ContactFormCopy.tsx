/* eslint-disable react-hooks/exhaustive-deps */
import { ContactFormInterface } from "../../services/interfaces/ContactForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Card, TextInput, Textarea } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";
import { IoIosSend } from "react-icons/io";
import { ImUser, ImQuestion, ImPencil } from "react-icons/im";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface ContactFormProp {
    handleSubmitContactForm: (contactForm: ContactFormInterface) => void;
}

export default function ContactForm(props: ContactFormProp) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const handleSubmitContactForm = props.handleSubmitContactForm;

    // Create a dynamic validation schema based on the language
    const getValidationSchema = () => {
        return Yup.object({
        name: Yup.string()
            .min(3, t("contactForm.errors.minimum"))
            .max(25, t("contactForm.errors.maximum"))
            .required(t("contactForm.errors.name")),
        topic: Yup.string()
            .min(3, t("contactForm.errors.minimum"))
            .max(25, t("contactForm.errors.maximum"))
            .required(t("contactForm.errors.topic")),
        message: Yup.string()
            .min(3, t("contactForm.errors.minimum"))
            .required(t("contactForm.errors.message")),
        });
    };

    // Formik initialization with dynamic validation schema
    const formik = useFormik({
        initialValues: {
            name: "",
            topic: "",
            message: "",
            date: "",
        },
        validationSchema: getValidationSchema(),
        onSubmit: (values) => {
        handleSubmitContactForm({
            ...values,
            id: uuidv4(),
            date: getDate(),
        });
        formik.resetForm();
        navigate("/");
        },
    });

    // Function to handle the date formatting
    const getDate = (): string => {
        const today = new Date();
        const month = (today.getMonth() + 1).toString().padStart(2, "0");
        const year = today.getFullYear();
        const date = today.getDate().toString().padStart(2, "0");
        const hour = today.getHours();
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        const min = today.getMinutes();
        const formattedMin = min < 10 ? `0${min}` : min;
        return `${year}/${month}/${date} — ${formattedHour}h${formattedMin}`;
    };

    // Handle language change: reset form on language switch
    useEffect(() => {
        formik.resetForm();
    }, [i18n.language]);

    return (
        <>
        <div className="mt-8 sm:mt-0">
            <h1 className="text-2xl text-center mb-5 font-h1">
            {t("contactForm.ContactUs")}
            </h1>
            <div className="flex justify-center items-center">
            <Card className="w-96 bg-gray-50 shadow-lg">
                <form id="contactForm" onSubmit={formik.handleSubmit}>
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    sizing="sm"
                    className="font-input"
                    placeholder={t("contactForm.name")}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    icon={ImUser}
                    helperText={
                    <>
                        <span className="font-medium text-red-500">{formik.errors.name}</span>
                    </>
                    }
                />
                <TextInput
                    id="topic"
                    type="text"
                    name="topic"
                    sizing="sm"
                    className="font-input"
                    placeholder={t("contactForm.topic")}
                    onChange={formik.handleChange}
                    value={formik.values.topic}
                    icon={ImQuestion}
                    helperText={
                    <>
                        <span className="font-medium text-red-500">{formik.errors.topic}</span>
                    </>
                    }
                />
                <div className="relative">
                    <Textarea
                    id="message"
                    name="message"
                    className="font-input pl-10"
                    placeholder={t("contactForm.message")}
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    rows={4}
                    helperText={
                        <>
                        <span className="font-medium text-red-500">{formik.errors.message}</span>
                        </>
                    }
                    />
                    <div className="absolute left-2 top-2 text-gray-500">
                    <ImPencil className="text-2xl" />
                    </div>
                </div>
                <TextInput
                    type="hidden"
                    id="date"
                    name="date"
                    value={formik.values.date}
                />
                <Button className="button" type="submit">
                    <div className="hover:before:bg-transparent hover:before:border-2 hover:before:border-violet-900 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-violet-900 relative flex gap-2 p-1 mt-2">
                    <span className="relative text-white m-1 send">
                        {t("contactForm.send")}
                    </span>
                    <span className="relative text-white m-1 envelop">
                        <IoIosSend className="ml-2 scale-150" />
                    </span>
                    </div>
                </Button>
                </form>
            </Card>
            </div>
        </div>
        </>
    );
}